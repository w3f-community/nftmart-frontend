import React, { FC } from 'react';
import { Container, Flex, Text } from '@chakra-ui/react';
import NavLink from '../navlink';
import Login from '../login';
import { Z_INDEXES } from '../../constants';

export interface HeaderProps {
  sticky?: boolean;
}

const Header: FC<HeaderProps> = ({ sticky }) => {
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
        py={4}
        maxW={1200}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex justify="center" mr={8}>
          <Text>
            {/* <img /> */}
            NFT Mark
          </Text>
        </Flex>

        <Flex flex="1 1 auto">
          <NavLink />
        </Flex>

        <Flex flex="1 1 auto" justifyContent="flex-end" maxW="200px">
          <Login />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
