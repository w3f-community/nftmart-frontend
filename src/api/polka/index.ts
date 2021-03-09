// import { useState } from 'react';
import { globalStore } from 'rekv';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { setSS58Format } from '@polkadot/util-crypto';
import { bnToBn } from '@polkadot/util';
import store from '../../stores/account';
import { TYPES, NODE_URL, TOKEN_TRANSFERABLE_BURNABLE } from '../../constants';
import { hexToUtf8 } from '../../utils';

let api: any = null;

// query gas needed
const nftDeposit = async (metadata: any, quantity: any) => {
  try {
    const [_, depositAll] = await api.ws.call(
      'nftmart_mintTokenDeposit',
      [metadata.length, quantity.toNumber()],
      10000,
    );
    return bnToBn(depositAll);
  } catch (e) {
    console.log(e);
    return bnToBn(0);
  }
};

export const initPolkadotApi = () => {
  if (api) return;
  // set ss58Format
  api = true;
  setSS58Format(50);
  const wsProvider = new WsProvider(NODE_URL);
  ApiPromise.create({ provider: wsProvider, types: TYPES }).then((res) => {
    globalStore.setState({ api: res });
    api = res;
    console.log('api inited ......');
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
  console.log(clazz);
  clazz.metadata = hexToUtf8(clazz.metadata);
  console.log(clazz);
  return clazz;
};

// get nfts by class and id
export const getNftsById = async (classId: number, id: string) => {
  const res = await api.query.ormlNft.tokens(classId, id); // todo metadata parse
  const nft = JSON.parse(res.unwrap());
  nft.class = await getClassById(classId);
  console.log(nft);
  return nft;
};

// post api

// create collections
// cb is callback for trx on chain   (status) => { ... }
export const createClass = async ({
  name = '',
  desc = '',
  metadata = {},
  signer = null,
  cb = null,
}) => {
  const { address } = globalStore.useState('address');
  const metadataStr = JSON.stringify(metadata);
  const res = await api.tx.nftmart
    .createClass(metadataStr, name, desc, TOKEN_TRANSFERABLE_BURNABLE)
    .signAndSend(address, { signer }, cb);

  return res;
};

// mint nft under class
// cb is callback for trx on chain   (status) => { ... }
export const mintNft = async ({
  address = '',
  classID = 0,
  nftMetadata = {},
  quantity = 1,
  signer = null,
  cb = null,
}) => {
  const metadataStr = JSON.stringify(nftMetadata);
  const balancesNeeded = await nftDeposit(metadataStr, bnToBn(quantity));
  const classInfo = await api.query.ormlNft.classes(classID);
  if (!classInfo.isSome) {
    console.log('classInfo not exist');
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
  const res = await batchExtrinsic.signAndSend(address, { signer }, cb);
  return res;
};
