import React, { useEffect, useMemo, useState } from 'react';
import { Center, Spinner, Button, Box, Text, Heading } from '@chakra-ui/react';
import { globalStore } from 'rekv';

import { useTranslation } from 'react-i18next';

import { initPolkadotApi, getCategories } from './index';
import store from '../../stores/categories';

interface Props {
  children: React.ReactNode;
}

const provider = ({ children }: Props) => {
  // init polkadot api
  const queryCategories = async () => {
    let categories = await getCategories();
    categories = categories.map((cat: any) => {
      return cat.metadata.name;
    });
    store.setState({ categories });
  };
  initPolkadotApi(queryCategories);

  const { t } = useTranslation();

  const { api, accounts = null } = globalStore.useState('api', 'accounts');
  // extension inject status
  const [injected, setInjected] = useState(false);

  // const accessAvailable = useMemo(() => api && injected && accounts, [api, injected, accounts]);
  const accessAvailable = useMemo(() => api, [api]);

  // Update latest header block
  useEffect(() => {
    const subscribeHead = async () => {
      if (api) {
        api.isReady.then(() => {
          api.rpc.chain.subscribeNewHeads((lastHeader: any) => {
            const blockNumber = lastHeader.number.toHuman().replace(/,/g, '');
            globalStore.setState({ blockNumber: Number(blockNumber) });
          });
        });
      }
    };

    subscribeHead();
  }, [api]);

  // return children;

  return (
    <>
      {accessAvailable ? (
        children
      ) : (
        <Center w="100%">
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default provider;
