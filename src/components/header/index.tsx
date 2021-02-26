import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import NavLink from '../navlink';

export default function Header() {
  return (
    <Flex as="header" flex={1}>
      <Flex justify="center">
        <Text>
          {/* <img /> */}
          logo
        </Text>
      </Flex>

      <Flex flex="1 1 auto">
        <NavLink />
      </Flex>

      <Box justifyContent="flex-end">
      </Box>
    </Flex>
  );
}
