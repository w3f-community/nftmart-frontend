// import { useState } from 'react';
import { globalStore } from 'rekv';
import { ApiPromise, WsProvider } from '@polkadot/api';

import { TYPES, NODE_URL } from '../../constants';

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
