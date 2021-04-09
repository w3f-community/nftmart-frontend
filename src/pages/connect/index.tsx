import { Box, Center, Container, Heading, Button, Spinner, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { globalStore } from 'rekv';
import { useParams, useHistory } from 'react-router-dom';
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
  web3AccountsSubscribe,
} from '@polkadot/extension-dapp';

import Layout from '../../layouts/common';
import { t } from '../../i18n';
import walletLogo from '../../assets/polkadot.png';
import { useQuery } from '../../utils/hook';

// export interface Props {

// }

const Connect: FC = () => {
  // const params = useParams<{ callbackUrl: string; }>();
  const query = useQuery();
  const callbackUrl = query.get('callbackUrl');
  const { accounts = null } = globalStore.useState('api', 'accounts');
  const [injected, setInjected] = useState(false);
  const history = useHistory();
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
          // treat first account as signer
          const injector = await web3FromSource(injectedAccounts[0].meta.source);
          globalStore.setState({
            accounts: injectedAccounts,
            account: injectedAccounts[0],
            injector,
          });
          if (callbackUrl && callbackUrl.length > 0) {
            history.push(callbackUrl);
          } else {
            history.push('/');
          }
          // TODO add backend integration
        }
      }

      // subscribe and update defaultaccount
      const unsubscribe = await web3AccountsSubscribe(async (reInjectedAccounts) => {
        // console.log(reInjectedAccounts);

        if (!reInjectedAccounts.length) {
          return;
        }

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
    <Layout title={'connect'}>
      <Box display="flex">
        <Container width="1180px">
          <Center h="100vh" w="100vw">
            {!injected ? (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Heading as="h4" size="md">
                  {t('extension.dowload')}
                </Heading>
                <Box alt="waleet_logo" as="img" src={walletLogo} width="160px" margin="30px auto" />
                <Button
                  width="160px"
                  variant="primary"
                  onClick={() => window.open('https://polkadot.js.org/extension/', '_blank')}
                  isFullWidth
                >
                  {t('download')}
                </Button>
              </Box>
            ) : (
              <Center height="100%" width="100%" flexDirection="column">
                {accounts ? (
                  <>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                    <Text marginTop={5} color="GrayText">
                      {t('loading.init')}
                    </Text>
                  </>
                ) : (
                  <Heading as="h4" size="md">
                    {t('extension.account')}
                  </Heading>
                )}
              </Center>
            )}
          </Center>
        </Container>
      </Box>
    </Layout>
  );
};

export default Connect;
