import React, { useEffect, useState } from 'react';
import { Center, Spinner, Button, Box, Text } from '@chakra-ui/react';
import { globalStore } from 'rekv';
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
  web3AccountsSubscribe,
  // web3FromAddress,
  // web3ListRpcProviders,
  // web3UseRpcProvider,
} from '@polkadot/extension-dapp';
import { initPolkadotApi } from './index';
import { t } from '../../i18n';

interface Props {
  children: React.ReactNode;
}

const provider = ({ children }: Props) => {
  // init polkadot api
  initPolkadotApi();

  const { api, accounts = null } = globalStore.useState('api', 'accounts');
  // extension inject status
  const [injected, setInjected] = useState(false);

  useEffect(() => {
    const initExtension = async () => {
      const allInjected = await web3Enable('NFTMart');
      if (allInjected.length === 0) {
        setInjected(false);
      } else {
        setInjected(true);
        // get accounts info in extension
        const injectedAccounts = await web3Accounts();
        if (injectedAccounts.length !== 0) {
          // console.log(injectedAccounts)
          // treat first account as signer
          const injector = await web3FromSource(injectedAccounts[0].meta.source);
          globalStore.setState({
            accounts: injectedAccounts,
            account: injectedAccounts[0],
            injector,
          });
          // TODO add backend integration
        }
      }

      // subscribe and update defaultaccount
      const unsubscribe = await web3AccountsSubscribe(async (reInjectedAccounts) => {
        const injector = await web3FromSource(reInjectedAccounts[0].meta.source);
        globalStore.setState({
          accounts: reInjectedAccounts,
          account: reInjectedAccounts[0],
          injector,
        });
      });
    };
    initExtension();
  }, []);

  return (
    <>
      {api && injected && accounts ? (
        children
      ) : (
        <Center h="100vh" w="100vw">
          {!injected ? (
            <Box>
              <Text>{t('extension.dowload')}</Text>
              <Button onClick={() => window.open('https://polkadot.js.org/extension/', '_blank')}>
                {t('download')}
              </Button>
            </Box>
          ) : (
            <Box>
              {accounts ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                <Text>{t('extension.account')}</Text>
              )}
            </Box>
          )}
        </Center>
      )}
    </>
  );
};

export default provider;
