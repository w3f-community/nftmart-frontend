import React, { useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import SideFilter from './SideFilter';
import MainList from './MainList';
import Layout from '../../layouts/common';
import store, { actions } from '../../stores/assets';
import { GetCollections, GetItems } from '../../api/graph';
import { debounce } from '../../utils';
import { useQuery } from '../../utils/hook';

// TODO
const STATUS_MAP: Record<any, any> = {
  all: -1,
  listing: 1,
  new: 2,
  recent: 3,
  '-1': 'all',
  '1': 'listing',
  '2': 'new',
  '3': 'recent',
};

const Explore = () => {
  const query = useQuery();
  const history = useHistory();

  const statusQueryValue = STATUS_MAP[query.get('status') ?? 'all'];

  const { data: collectionsResponse, loading: collectionsLoading } = GetCollections();
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedStatus, setSelectedStatus] = useState<number>(statusQueryValue);

  const { data: assetsResponse, loading: itemsLoading } = GetItems({
    status: selectedStatus,
    collectionId: selectedCollectionId,
    categoryId: selectedCategoryId,
  });

  const { filteredAssets, filteredCollections } = store.useState(
    'filteredAssets',
    'filteredCollections',
  );

  // Update status
  useEffect(() => {
    setSelectedStatus(statusQueryValue);
    return () => {
      //
    };
  }, [statusQueryValue]);

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
    setSelectedStatus(status);
    const statusString = STATUS_MAP[String(status)];
    history.push(`explore?status=${statusString}`);
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
            onSelectCollection={handleSelectCollection}
            onStatusChange={handleStatusChange}
            singleStatus
          />
          {/* TODO: sorting event */}
          <MainList data={filteredAssets} onTypeChange={handleTypeChange} loading={itemsLoading} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Explore;
