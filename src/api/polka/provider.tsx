import React, { useEffect, useState } from 'react';
import { Center, Spinner, Button, Box, Text } from '@chakra-ui/react';
import { globalStore } from 'rekv';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from '@polkadot/extension-dapp';
import { initPolkadotApi } from './index';

interface Props {
  children: React.ReactNode;
}

const provider = ({ children }: Props) => {
  initPolkadotApi();
  const { api } = globalStore.useState('api');
  const [injected, setInjected] = useState(false);
  useEffect(() => {
    const initExtension = async () => {
      const allInjected = await web3Enable('NFTMart');
      if (allInjected.length === 0) {
        setInjected(false);
      } else {
        setInjected(true);
        const accounts = await web3Accounts();
        console.log(accounts);
      }
    };
    initExtension();
  }, []);

  return (
    <>
      {api && injected ? (
        children
      ) : (
        <Center h="100vh" w="100vw">
          {!injected ? (
            <Box>
              <Text>请下载Polkadot钱包插件</Text>
              <Button onClick={() => window.open('https://polkadot.js.org/extension/', '_blank')}>
                下载
              </Button>
            </Box>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
        </Center>
      )}
    </>
  );
};

export default provider;
