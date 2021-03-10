import React, { useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';

import SideFilter from './SideFilter';
import MainList from './MainList';
import Layout from '../../layouts/common';
import store, { actions } from '../../stores/assets';
import { GetCollections, GetItems } from '../../api/graph';

const Explore = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>();
  const { data: collectionsResponse, loading: collectionsLoading } = GetCollections();
  const { data: assetsResponse, loading: itemsLoading } = GetItems({
    collectionId: selectedCollectionId,
  });

  const { filteredAssets, collections } = store.useState('filteredAssets', 'collections');

  useEffect(() => {
    const data = collectionsResponse?.collections?.collections ?? [];
    if (data.length) {
      actions.setCollections(data);
    }

    return () => {
      //
    };
  }, [collectionsResponse]);

  useEffect(() => {
    const data = assetsResponse?.assets?.assets ?? [];
    if (data.length) {
      actions.setAssets(data);
    }

    return () => {
      //
    };
  }, [assetsResponse]);

  const handleSelectCollection = (collectionId: number) => {
    setSelectedCollectionId(collectionId);
  };

  const handleSearch = (value: string) => {
    //
  };

  const handleStatusChange = (status: number) => {
    //
  };

  const handleTypeChange = (type: number) => {
    //
  };

  return (
    <Layout>
      <Box pt="20px" pb="24px">
        <Container display="flex">
          <SideFilter
            data={collections}
            onSearch={handleSearch}
            onSelect={handleSelectCollection}
            onStatusChange={handleStatusChange}
          />
          {/* TODO: sorting event */}
          <MainList data={filteredAssets} onTypeChange={handleTypeChange} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Explore;
