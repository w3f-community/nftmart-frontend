import React, { useEffect } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { globalStore } from 'rekv';

import { getBalance } from '../../api/polka';
import store from '../../stores/account';

import SideFilter from './side-filter';
import MainList from './main-list';
import Layout from '../../layouts/common';

const Page = () => {
  const { account } = globalStore.useState('account');
  const { balance, nonce } = store.useState('balance', 'nonce');

  useEffect(() => {
    // if (account) getBalance(account.address);
  }, [account]);

  console.log(balance, nonce);

  return (
    <Layout>
      <Box pt="20px" pb="24px">
        <Container display="flex">
          <SideFilter />
          <MainList />
        </Container>
      </Box>
    </Layout>
  );
};

export default Page;
