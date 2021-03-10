import React, { useEffect, useState } from 'react';
import { Box, Center, Container } from '@chakra-ui/react';

import SideFilter from './SideFilter';
import MainList from './MainList';
import Layout from '../../layouts/common';
import store, { actions } from '../../stores/assets';
import { GetItems, GetMyWallet } from '../../api/graph';
import { debounce } from '../../utils';
import { useQuery } from '../../utils/hook';
import { t } from '../../i18n';
import Empty from '../../components/empty';

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

// TODO: Error handling
const Wallet = () => {
  const query = useQuery();

  const statusQueryValue = STATUS_MAP[query.get('status') ?? 'all'];

  const {
    data: collectionsResponse,
    loading: collectionsLoading,
    error: collectionsError,
  } = GetMyWallet();
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedStatus, setSelectedStatus] = useState<number>(statusQueryValue);

  const collectionsData = collectionsResponse?.collections?.collections;

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
    if (Array.isArray(collectionsData)) {
      // Update store
      actions.setCollections(collectionsData);
      // Update default selectedCollectionId
      if (!selectedCollectionId) {
        setSelectedCollectionId(collectionsData[0].id);
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
    // const statusString = STATUS_MAP[String(status)];
    // history.push(`explore?status=${statusString}`);
  };

  const handleTypeChange = (type: number) => {
    setSelectedCategoryId(type);
  };

  return (
    <Layout>
      <Box pt="20px" pb="24px">
        <Container display="flex">
          <SideFilter
            // FIXME: Here using a simple error handling
            data={collectionsError ? [] : filteredCollections}
            header={t('wallet.title')}
            loading={collectionsLoading}
            onSearch={handleSearch}
            onSelectCollection={handleSelectCollection}
            onStatusChange={handleStatusChange}
            singleStatus
          />
          {/* TODO: sorting event */}
          {!!collectionsData?.length && (
            <MainList
              data={filteredAssets}
              onTypeChange={handleTypeChange}
              loading={itemsLoading}
            />
          )}
          {!collectionsData?.length && (
            <Center height="444px" flex={1}>
              <Empty description={t('list.empty')} />
            </Center>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default Wallet;
