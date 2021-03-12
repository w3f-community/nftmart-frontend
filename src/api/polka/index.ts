// import { useState } from 'react';
import { globalStore } from 'rekv';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { setSS58Format } from '@polkadot/util-crypto';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { bnToBn } from '@polkadot/util';
import store from '../../stores/account';
import {
  TYPES,
  NODE_URL,
  TOKEN_TRANSFERABLE_BURNABLE,
  CLASS_METADATA,
  NATIVE_CURRENCY_ID,
} from '../../constants';
import { hexToUtf8, txLog } from '../../utils';

const unit = bnToBn('1000000000000');
const WebSocket = require('rpc-websockets').Client;

let api: any = null;

// query gas needed
const nftDeposit = async (metadata: any, quantity: any) => {
  try {
    const [_, depositAll] = await api.ws.call(
      'nftmart_mintTokenDeposit',
      [metadata.length, quantity.toNumber()],
      10000,
    );
    console.log(_);
    return bnToBn(depositAll);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const initPolkadotApi = (cb?: any) => {
  if (api) return;
  // set ss58Format
  api = true;
  setSS58Format(50);
  const wsProvider = new WsProvider(NODE_URL);
  const ws = new WebSocket(NODE_URL);

  ApiPromise.create({ provider: wsProvider, types: TYPES }).then((res: any) => {
    res.ws = ws;
    globalStore.setState({ api: res });
    api = res;
    console.log('api inited ......');
    if (cb) cb();
  });
};

// get timestamp
export const getTimestamp = async () => {
  const res = await api.query.timestamp.now();
  return res;
};

// get address balance
export const getBalance = async (address: string) => {
  const { nonce, data: balance } = await api.query.system.account(address);
  store.setState({ nonce, balance });
  return balance;
};

// get class by class id
export const getClassById = async (id: number) => {
  const res = await api.query.ormlNft.classes(id); // todo metadata parse
  // todo query creator
  const clazz = JSON.parse(res);
  const adminList = await api.query.proxy.proxies(clazz.owner); // query adminList of class
  clazz.adminList = JSON.parse(adminList);
  // console.log(clazz);
  clazz.metadata = hexToUtf8(clazz.metadata);
  console.log(clazz);
  return clazz;
};

// get nfts by class and id
export const getNftsById = async (classId: number, id: string) => {
  const res = await api.query.ormlNft.tokens(classId, id); // todo metadata parse
  const nft = JSON.parse(res.unwrap());
  nft.class = await getClassById(classId);
  // console.log(nft);
  return nft;
};

// query all categories
export const getCategories = async () => {
  let categories = await api.query.nftmart.categories.entries();
  categories = categories.map((category: any) => {
    let key = category[0];
    const data = category[1].unwrap();
    const len = key.length;
    key = key.buffer.slice(len - 4, len);
    const cateId = new Uint32Array(key)[0];
    const cate = data.toHuman();
    cate.id = cateId;
    cate.metadata = JSON.parse(cate.metadata);
    return cate;
  });

  return categories;
};

// get nft by class id
const getAllNftsByClassId = async (classId: number) => {
  console.log(classId);
  const nextTokenId = await api.query.ormlNft.nextTokenId(classId);
  // let tokenCount = 0;
  let classInfo = await api.query.ormlNft.classes(classId);
  if (classInfo.isSome) {
    const arr = [];
    classInfo = classInfo.unwrap();
    // const accountInfo = await api.query.system.account(classInfo.owner);
    // console.log(classInfo.toString());
    // console.log(accountInfo.toString());
    for (let i = 0; i < nextTokenId; i += 1) {
      arr.push(api.query.ormlNft.tokens(classId, i));
    }
    const res = await Promise.all(arr);
    return res.map((n) => {
      if (n.isEmpty) return null;
      const nft = n.unwrap();
      nft.classInfo = classInfo;
      console.log(nft);
      return nft;
    });
  }
  return [];
};

// get all nfts
export const getAllNfts = async (classId?: number) => {
  if (classId === undefined) {
    const allClasses = await api.query.ormlNft.classes.entries();
    const arr: any[] = [];
    allClasses.forEach((c: any) => {
      let key = c[0];
      const len = key.length;
      key = key.buffer.slice(len - 4, len);
      const cid = new Uint32Array(key)[0];
      arr.push(getAllNftsByClassId(cid));
    });
    const res = await Promise.all(arr);
    return res;
  }
  const res = await getAllNftsByClassId(classId);
  return res;
};

// get all orders
export const getAllOrders = async () => {
  const allOrders = await api.query.nftmart.orders.entries();
  const ss58Format = 50;
  const keyring = new Keyring({ type: 'sr25519', ss58Format });

  const arr = allOrders.map(async (order: any) => {
    const key = order[0];
    const keyLen = key.length;
    const orderOwner = keyring.encodeAddress(new Uint8Array(key.buffer.slice(keyLen - 32, keyLen)));

    const classId = new Uint32Array(key.slice(keyLen - 4 - 8 - 32 - 16, keyLen - 8 - 32 - 16))[0];
    const tokenIdRaw = new Uint32Array(key.slice(keyLen - 8 - 32 - 16, keyLen - 32 - 16));

    const tokenIdLow32 = tokenIdRaw[0];
    const tokenIdHigh32 = tokenIdRaw[1];
    const tokenId = tokenIdLow32;
    let nft = await api.query.ormlNft.tokens(classId, tokenId);
    if (nft.isSome) {
      nft = nft.unwrap();
    }

    const data = order[1].toHuman();
    data.orderOwner = orderOwner;
    data.classId = classId;
    data.tokenId = tokenId;
    data.nft = nft;

    return data;
  });
  const orders = await Promise.all(arr);
  return orders;
};

// query users class
export const queryNftByAddress = async ({ address = '' }) => {
  const nfts = await api.query.ormlNft.tokensByOwner.entries(address);

  const arr = nfts.map(async (clzToken: any) => {
    const clzTokenObj = clzToken[0];
    const len = clzTokenObj.length;

    const classId = new Uint32Array(clzTokenObj.slice(len - 4 - 8, len - 8))[0];
    const tokenIdRaw = new Uint32Array(clzTokenObj.slice(len - 8, len));

    const tokenIdLow32 = tokenIdRaw[0];
    // const tokenIdHigh32 = tokenIdRaw[1];
    const tokenId = tokenIdLow32;

    let nft = await api.query.ormlNft.tokens(classId, tokenId);
    if (nft.isSome) {
      nft = nft.unwrap();
      return nft;
    }
    return null;
  });
  const res = await Promise.all(arr);
  console.log(res, 'nft by user');
  return res;
};

// query users class
export const queryClassByAddress = async ({ address = '' }) => {
  const allClasses = await api.query.ormlNft.classes.entries();

  const arr = allClasses.map(async (clz: any) => {
    let key = clz[0];
    const len = key.length;
    key = key.buffer.slice(len - 4, len);
    const classId = new Uint32Array(key)[0];
    const clazz = clz[1].toJSON();
    clazz.metadata = hexToUtf8(clazz.metadata.slice(2));
    clazz.classId = classId;
    clazz.adminList = await api.query.proxy.proxies(clazz.owner);
    const res = clazz.adminList[0].map((admin: any) => {
      if (admin.delegate.toString() === address) {
        return clazz;
      }
      return null;
    });
    return res.length > 0 ? res[0] : null;
  });
  const res = await Promise.all(arr);
  console.log(res, 'class by user');
  return res;
};

// === post api ====

// create collections
// cb is callback for trx on chain   (status) => { ... }
export const createClass = async ({ address = '', metadata = CLASS_METADATA, cb = txLog }) => {
  const injector = await web3FromAddress(address);
  const { name, description } = metadata;
  const metadataStr = JSON.stringify(metadata);
  const res = await api.tx.nftmart
    .createClass(metadataStr, name, description, TOKEN_TRANSFERABLE_BURNABLE)
    .signAndSend(address, { signer: injector.signer }, cb);
  return res;
};

// mint nft under class
// cb is callback for trx on chain   (status) => { ... }
export const mintNft = async ({
  address = '',
  classId = 0,
  metadata = {},
  quantity = 1,
  cb = txLog,
}) => {
  const injector = await web3FromAddress(address);
  const metadataStr = JSON.stringify(metadata);
  const balancesNeeded = await nftDeposit(metadataStr, bnToBn(quantity));
  if (balancesNeeded === null) return null;
  const classInfo = await api.query.ormlNft.classes(classId);
  if (!classInfo.isSome) {
    // console.log('classInfo not exist');
    return null;
  }
  const ownerOfClass = classInfo.unwrap().owner.toString();

  const txs = [
    // make sure `ownerOfClass0` has sufficient balances to mint nft.
    api.tx.balances.transfer(ownerOfClass, balancesNeeded),
    // mint nft.
    api.tx.proxy.proxy(
      ownerOfClass,
      null,
      api.tx.nftmart.mint(address, classId, metadataStr, quantity),
    ),
  ];
  const batchExtrinsic = api.tx.utility.batchAll(txs);
  const res = await batchExtrinsic.signAndSend(address, { signer: injector.signer }, cb);
  return res;
};

// create order
export const createOrder = async ({
  address = '', // address of current user
  categoryId = 0, // category id
  deposit = 200, // stake number of NMT
  price = 1, // list price
  classId = 0, // class id
  tokenId = 0, // token id
  during = 1000, // during block num ,need to be conver from timestamp
  cb = txLog,
}) => {
  const injector = await web3FromAddress(address);
  const currentBlockNumber = bnToBn(await api.query.system.number());

  // convert on chain precision
  const priceAmount = unit.mul(bnToBn(price));
  const depositAmount = unit.mul(bnToBn(deposit));
  const call = api.tx.nftmart.submitOrder(
    NATIVE_CURRENCY_ID,
    priceAmount,
    categoryId,
    classId,
    tokenId,
    depositAmount,
    currentBlockNumber.add(bnToBn(during)),
  );
  // const feeInfo = await call.paymentInfo(account);
  await call.signAndSend(address, { signer: injector.signer }, cb);
};

// take order
export const takeOrder = async ({
  address = '', // address of current user
  ownerAddress = '', // owner address
  classId = 0, // class id
  tokenId = 0, // token id
  price = 0, // order price
  cb = txLog,
}) => {
  const injector = await web3FromAddress(address);
  let order = await api.query.nftmart.orders([classId, tokenId], ownerAddress);
  if (order.isSome) {
    const priceAmount = unit.mul(bnToBn(price));
    order = order.unwrap();
    const call = api.tx.nftmart.takeOrder(classId, tokenId, priceAmount, ownerAddress);
    const res = await call.signAndSend(address, { signer: injector.signer }, cb);
    return res;
  }
  return null;
};

// delete order
export const updateOrderPrice = async ({
  address = '', // address of current user
  ownerAddress = '', // owner address
  classId = 0, // class id
  tokenId = 0, // token id
  price = 0, // new price
  cb = txLog,
}) => {
  const injector = await web3FromAddress(address);
  let order = await api.query.nftmart.orders([classId, tokenId], ownerAddress);

  if (order.isSome) {
    // convert on chain precision
    const priceAmount = unit.mul(bnToBn(price));
    order = order.unwrap();
    const call = api.tx.nftmart.updateOrderPrice(classId, tokenId, priceAmount);
    const res = await call.signAndSend(address, { signer: injector.signer }, cb);
    return res;
  }
  return null;
};

// delete order
export const deleteOrder = async ({
  address = '', // address of current user
  ownerAddress = '', // owner address
  classId = 0, // class id
  tokenId = 0, // token id
  cb = txLog,
}) => {
  const injector = await web3FromAddress(address);
  let order = await api.query.nftmart.orders([classId, tokenId], ownerAddress);
  if (order.isSome) {
    order = order.unwrap();
    const call = api.tx.nftmart.removeOrder(classId, tokenId);
    const res = await call.signAndSend(address, { signer: injector.signer }, cb);
    return res;
  }
  return null;
};
