import React from 'react';
import { Box } from '@chakra-ui/react';
import SideFilter from './SideFilter';
import MainList from './MainList';

const Explore = () => {
  return (
    <Box
      width="1364px"
      display="flex"
      backgroundColor="#F7F8FB"
      pt="20px"
      justifyContent="center"
      pb="24px"
    >
      <SideFilter />
      <MainList />
    </Box>
  );
};

export default Explore;
