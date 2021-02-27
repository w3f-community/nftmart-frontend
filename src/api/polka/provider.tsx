import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { globalStore } from 'rekv';
import { initPolkadotApi } from './index';

interface Props {
  children: React.ReactNode;
}

const provider = ({ children }: Props) => {
  initPolkadotApi();
  const { api } = globalStore.useState('api');
  return (
    <>
      {api ? (
        children
      ) : (
        <Center h="100vh" w="100vw">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      )}
    </>
  );
};

export default provider;
