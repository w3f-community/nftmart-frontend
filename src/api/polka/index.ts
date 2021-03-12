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
  MetaData,
  CLASS_METADATA,
} from '../../constants';
import { hexToUtf8, txLog } from '../../utils';

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
    console.log(cateId, cate);
    return cate;
  });

  return categories;
};

// get nft by class id
const getAllNftsByClassId = async (classID: number) => {
  console.log(classID);
  const nextTokenId = await api.query.ormlNft.nextTokenId(classID);
  // let tokenCount = 0;
  let classInfo = await api.query.ormlNft.classes(classID);
  if (classInfo.isSome) {
    const arr = [];
    classInfo = classInfo.unwrap();
    // const accountInfo = await api.query.system.account(classInfo.owner);
    // console.log(classInfo.toString());
    // console.log(accountInfo.toString());
    for (let i = 0; i < nextTokenId; i += 1) {
      arr.push(api.query.ormlNft.tokens(classID, i));
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
export const getAllNfts = async (classID?: number) => {
  if (classID === undefined) {
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
  const res = await getAllNftsByClassId(classID);
  return res;
};

// get all orders
export const getAllOrders = async () => {
  const allOrders = await api.query.nftmart.orders.entries();
  const ss58Format = 50;
  const keyring = new Keyring({ type: 'sr25519', ss58Format });

  // for (let order of allOrders) {
  // 	let key = order[0];
  // 	let keyLen = key.length;
  // 	const orderOwner = keyring.encodeAddress(new Uint8Array(key.buffer.slice(keyLen - 32, keyLen)));

  // 	const classID = new Uint32Array(key.slice(keyLen - 4 - 8 - 32 - 16, keyLen - 8 - 32 - 16))[0];
  // 	const tokenIDRaw = new Uint32Array(key.slice(keyLen - 8 - 32 - 16, keyLen - 32 - 16));

  // 	const tokenIDLow32 = tokenIDRaw[0];
  // 	const tokenIDHigh32 = tokenIDRaw[1];
  // 	const tokenID = u32ToU64(tokenIDLow32, tokenIDHigh32);

  // 	let nft = await api.query.ormlNft.tokens(classID, tokenID);
  // 	if (nft.isSome) {
  // 		nft = nft.unwrap();
  // 	}

  // 	let data = order[1].toHuman();
  // 	data.orderOwner = orderOwner;
  // 	data.classID = classID;
  // 	data.tokenID = tokenID;
  // 	data.nft = nft;
  // 	console.log("%s", JSON.stringify(data));
  // }
  const arr = allOrders.map(async (order: any) => {
    const key = order[0];
    const keyLen = key.length;
    const orderOwner = keyring.encodeAddress(new Uint8Array(key.buffer.slice(keyLen - 32, keyLen)));

    const classID = new Uint32Array(key.slice(keyLen - 4 - 8 - 32 - 16, keyLen - 8 - 32 - 16))[0];
    const tokenIDRaw = new Uint32Array(key.slice(keyLen - 8 - 32 - 16, keyLen - 32 - 16));

    const tokenIDLow32 = tokenIDRaw[0];
    const tokenIDHigh32 = tokenIDRaw[1];
    const tokenID = tokenIDLow32;
    let nft = await api.query.ormlNft.tokens(classID, tokenID);
    if (nft.isSome) {
      nft = nft.unwrap();
    }

    const data = order[1].toHuman();
    data.orderOwner = orderOwner;
    data.classID = classID;
    data.tokenID = tokenID;
    data.nft = nft;

    return data;
  });
  const orders = await Promise.all(arr);
  return orders;
};

// post api

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
  classID = 0,
  metadata = {},
  quantity = 1,
  cb = txLog,
}) => {
  const injector = await web3FromAddress(address);
  const metadataStr = JSON.stringify(metadata);
  const balancesNeeded = await nftDeposit(metadataStr, bnToBn(quantity));
  if (balancesNeeded === null) return null;
  const classInfo = await api.query.ormlNft.classes(classID);
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
      api.tx.nftmart.mint(address, classID, metadataStr, quantity),
    ),
  ];
  const batchExtrinsic = api.tx.utility.batchAll(txs);
  const res = await batchExtrinsic.signAndSend(address, { signer: injector.signer }, cb);
  return res;
};
