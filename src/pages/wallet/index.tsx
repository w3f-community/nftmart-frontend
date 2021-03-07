import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { globalStore } from 'rekv';

import { getBalance } from '../../api/polka';
import CommLayout from '../../layouts/common';
import store from '../../stores/account';

const Page = () => {
  const { account } = globalStore.useState('account');
  const { balance, nonce } = store.useState('balance', 'nonce');

  useEffect(() => {
    if (account) getBalance(account.address);
  }, [account]);

  console.log(balance, nonce);

  return (
    <CommLayout>
      <Box></Box>
    </CommLayout>
  );
};

export default Page;
