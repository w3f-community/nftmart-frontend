import React, { FC, useEffect } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Image, { Shimmer } from 'react-shimmer';
import { globalStore } from 'rekv';

import NavLink from '../navlink';
import Login from '../login';
// import ChangeLanguage from '../changeLanguage';
import LogoSrc from '../../assets/logo.png';
import { Z_INDEXES } from '../../constants';
import { getBalance } from '../../api/polka';
import accountStore from '../../stores/account';
import Balance from '../balance';

export interface HeaderProps {
  sticky?: boolean;
}

const formatAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

const Header: FC<HeaderProps> = ({ sticky }) => {
  const { account, api } = globalStore.useState('account', 'api');
  const { balance } = accountStore.useState('balance');

  useEffect(() => {
    if (account?.address && api) {
      api.isReady.then(() => getBalance(account.address));
    }

    return () => {
      // cleanup
    };
  }, [account?.address, api]);

  return (
    <Flex
      as="header"
      flex={1}
      justify="space-between"
      backgroundColor="white"
      boxShadow="md"
      minHeight="77px"
      position={sticky ? 'fixed' : 'initial'}
      top={0}
      left={0}
      right={0}
      zIndex={Z_INDEXES.header}
    >
      <Container
        py={2}
        maxW={1200}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex justify="center" mr={8}>
          <Image
            NativeImgProps={{ style: { height: 60, width: 'auto' } }}
            src={LogoSrc}
            fallback={<Shimmer width={120} height={22} />}
            fadeIn
          />
        </Flex>

        <Flex flex="1 1 auto">
          <NavLink />
        </Flex>

        <Flex>{/* <ChangeLanguage /> */}</Flex>

        {account?.meta && (
          <Flex flex="1 1 auto" justifyContent="flex-end" alignItems="center" height="55px">
            <Login username={formatAddress(account.address)} avatar={account.meta.avatar} />
            <Balance balance={balance} />
          </Flex>
        )}
      </Container>
    </Flex>
  );
};

export default Header;
