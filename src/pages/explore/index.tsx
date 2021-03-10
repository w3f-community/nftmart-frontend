import React, { useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';

import SideFilter from './SideFilter';
import MainList from './MainList';
import Layout from '../../layouts/common';
import store, { actions } from '../../stores/assets';
import { GetCollections, GetItems } from '../../api/graph';
import { debounce } from '../../utils';
import { useQuery } from '../../utils/hook';

const Explore = () => {
  const query = useQuery();

  const { data: collectionsResponse, loading: collectionsLoading } = GetCollections();
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const { data: assetsResponse, loading: itemsLoading } = GetItems({
    collectionId: selectedCollectionId,
    categoryId: selectedCategoryId,
  });

  const { filteredAssets, filteredCollections } = store.useState(
    'filteredAssets',
    'filteredCollections',
  );

  // Update collections when data fetched
  useEffect(() => {
    const data = collectionsResponse?.collections?.collections;
    if (Array.isArray(data)) {
      // Update store
      actions.setCollections(data);
      // Update default selectedCollectionId
      if (!selectedCollectionId) {
        setSelectedCollectionId(data[0].id);
      }
    }

    return () => {
      //
    };
  }, [collectionsResponse]);

  // Update assets by collectionId when data fetched
  useEffect(() => {
    const data = assetsResponse?.assets?.assets;
    if (Array.isArray(data)) {
      actions.setAssets(data);
    }

    return () => {
      //
    };
  }, [assetsResponse]);

  const handleSelectCollection = (collectionId: number) => {
    setSelectedCollectionId(collectionId);
  };

  const handleSearch = debounce((value: string) => {
    actions.filterCollectionsByName(value);
  }, 233);

  const handleStatusChange = (status: number) => {
    //
  };

  const handleTypeChange = (type: number) => {
    setSelectedCategoryId(type);
  };

  return (
    <Layout>
      <Box pt="20px" pb="24px">
        <Container display="flex">
          <SideFilter
            data={filteredCollections}
            loading={collectionsLoading}
            onSearch={handleSearch}
            onSelect={handleSelectCollection}
            onStatusChange={handleStatusChange}
          />
          {/* TODO: sorting event */}
          <MainList data={filteredAssets} onTypeChange={handleTypeChange} loading={itemsLoading} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Explore;
