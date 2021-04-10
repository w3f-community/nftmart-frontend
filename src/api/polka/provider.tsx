import React, { useEffect, useMemo, useState } from 'react';
import { Center, Spinner, Button, Box, Text, Heading } from '@chakra-ui/react';
import { globalStore } from 'rekv';
import { web3Accounts, web3FromSource, web3Enable } from '@polkadot/extension-dapp';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { initPolkadotApi, getCategories } from './index';
import store from '../../stores/categories';

interface Props {
  children: React.ReactNode;
}

const provider = ({ children }: Props) => {
  // init polkadot api
  const history = useHistory();
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

  // const accessAvailable = useMemo(() => api && injected && accounts, [api, injected, accounts]);
  const accessAvailable = useMemo(() => api, [api]);

  const initLoginStatu = async () => {
    const allInjected = await web3Enable('NFTMart');
    if (allInjected.length === 0) {
      history.push('/connect');
    } else {
      // get accounts info in extension
      const injectedAccounts = await web3Accounts();
      if (injectedAccounts.length !== 0) {
        // treat first account as signer
        const injector = await web3FromSource(injectedAccounts[0].meta.source);
        globalStore.setState({
          accounts: injectedAccounts,
          account: injectedAccounts[0],
          injector,
        });
      }
    }
  };
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
    initLoginStatu();
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
