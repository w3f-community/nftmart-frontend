import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import SideFilter from './SideFilter';
import MainList from './MainList';
import Layout from '../../layouts/common';

const Explore = () => {
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

export default Explore;
