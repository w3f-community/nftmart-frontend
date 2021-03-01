// import { useState } from 'react';
import { globalStore } from 'rekv';
import { ApiPromise, WsProvider } from '@polkadot/api';
import store from '../../stores/account';
import { TYPES, NODE_URL, TOKEN_TRANSFERABLE_BURNABLE } from '../../constants';

let api: any = null;

export const initPolkadotApi = () => {
  if (api) return;
  const wsProvider = new WsProvider(NODE_URL);
  ApiPromise.create({ provider: wsProvider, types: TYPES }).then((res) => {
    globalStore.setState({ api: res });
    api = res;
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

// create collections
export const createClass = async ({ name = '', desc = '', metadata = '', cb = null }) => {
  const { address } = globalStore.useState('address');

  const res = await api.tx.nftmart
    .createClass(metadata, name, desc, TOKEN_TRANSFERABLE_BURNABLE)
    .signAndSend(address, cb);

  return res;
};
