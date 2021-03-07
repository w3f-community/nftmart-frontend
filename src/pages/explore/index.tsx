import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import SideFilter from './SideFilter';
import MainList from './MainList';

const Explore = () => {
  return (
    <Box pt="20px" pb="24px">
      <Container display="flex">
        <SideFilter />
        <MainList />
      </Container>
    </Box>
  );
};

export default Explore;
