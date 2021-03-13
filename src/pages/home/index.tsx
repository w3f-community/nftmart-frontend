import React, { useEffect, useState } from 'react';
import { groupBy } from 'ramda';
import { Button, Container, Flex, Text } from '@chakra-ui/react';

import { globalStore } from 'rekv';
import { useTranslation } from 'react-i18next';
import store, { actions } from '../../stores/assets';

import { GetItems } from '../../api/graph';
import CommLayout from '../../layouts/common';

import TypeFilter from './TypeFilter';
import Works from './Works';
import { Work } from '../../types';
import colors from '../../themes/colors';
import {
  createClass,
  getClassById,
  mintNft,
  getCategories,
  getAllNfts,
  getAllOrders,
  createOrder,
  takeOrder,
  updateOrderPrice,
  deleteOrder,
  queryClassByAddress,
  queryNftByAddress,
} from '../../api/polka';

type ListMap = Record<string, Work[]>;

const STATUS_MAP: Record<number, string> = {
  1: 'listing',
  2: 'new',
  3: 'recent',
};

const groupByStatus = groupBy<Work>(({ status }) => STATUS_MAP[status]);

const Page = () => {
  const { loading, error, data: response, refetch } = GetItems({ pageSize: 30 });
  const { t } = useTranslation();

  const { assets } = store.useState('assets', 'filteredAssets');
  const { account } = globalStore.useState('account');

  const [workListMap, setWorkListMap] = useState<ListMap>(groupByStatus(assets));
  const [stickyFilter, setStickyFilter] = useState(false);
  const [typeFilterHeight] = useState(338);

  const listOrder = () => {
    const order = {
      address: account.address,
      price: 20,
      categoryId: 0,
      classId: 17,
      tokenId: 0,
    };
    createOrder(order);
  };
  const takerOrder = () => {
    const order = {
      address: account.address,
      classId: 17,
      tokenId: 0,
      ownerAddress: '611LQeE32RZvaY6m2oG8US5R4dRsTzxRnn43vqjtoUwzHqtC',
      price: 20,
    };
    takeOrder(order);
  };
  const updateOrder = () => {
    const order = {
      address: account.address,
      price: 50,
      classId: 17,
      tokenId: 0,
      ownerAddress: '611LQeE32RZvaY6m2oG8US5R4dRsTzxRnn43vqjtoUwzHqtC',
    };
    updateOrderPrice(order);
  };

  const delOrder = () => {
    const order = {
      address: account.address,
      classId: 17,
      tokenId: 0,
      ownerAddress: '611LQeE32RZvaY6m2oG8US5R4dRsTzxRnn43vqjtoUwzHqtC',
    };
    deleteOrder(order);
  };

  const create = () => {
    const metadata = {
      name: 'nft class',
      description: 'this is my second nft class',
      url: 'http://www.baidu.com',
      externalUrl: '123',
      bannerUrl: '123',
    };
    createClass({ address: account.address, metadata });
  };

  const mint = () => {
    const metadata = {
      name: 'nft',
      description: 'this is my second nft class',
      url: 'http://www.baidu.com',
      externalUrl: '123',
      bannerUrl: '123',
    };
    mintNft({ address: account.address, metadata, classId: 17 });
  };

  // State Effect
  useEffect(() => {
    const newAssets = response?.assets?.assets || [];
    if (newAssets.length) {
      setWorkListMap(groupByStatus(newAssets));
      actions.setAssets(newAssets);
    }
    return () => {
      //
    };
  }, [response]);

  // Update sticky header UI
  useEffect(() => {
    const listenter = () => {
      if (window.pageYOffset > 80 && !stickyFilter) {
        setStickyFilter(true);
        return;
      }

      setStickyFilter(false);
    };

    window.addEventListener('scroll', listenter);
    return () => {
      window.removeEventListener('scroll', listenter);
    };
  }, []);

  // Events
  const handleFilter = (categoryId: number) => {
    actions.filterAssets({ category: categoryId });
  };

  // Component
  const errorBox = (
    <Container height={300}>
      <Flex direction="column" height="100%">
        <Text color={colors.text.gray}>{error?.message}</Text>
        <Button variant="primary" onClick={() => refetch()}>
          {t('network.retry')}
        </Button>
      </Flex>
    </Container>
  );

  return (
    <CommLayout title="title.home">
      <TypeFilter onFilter={handleFilter} sticky={stickyFilter} top={typeFilterHeight} />
      {error ? errorBox : <Works loading={loading} data={workListMap} />}
      <button onClick={() => create()}>create</button>|
      <button onClick={() => getClassById(8)}>get</button>|
      <button onClick={() => mint()}>mint</button>
      <br />
      <button onClick={() => getCategories()}>getCate</button>|
      <button onClick={() => getAllNfts()}>getAllNFTs</button>|
      <button onClick={() => getAllOrders()}>getAllOrders</button>|
      <br />
      <button onClick={() => listOrder()}>createOrder</button>|
      <button onClick={() => takerOrder()}>takeOrder</button>|
      <button onClick={() => updateOrder()}>updateOrderPrice</button>|
      <button onClick={() => delOrder()}>deleteOrder</button>|
      <br />
      <button onClick={() => queryClassByAddress({ address: account.address })}>
        queryClassByAddress
      </button>
      |
      <button onClick={() => queryNftByAddress({ address: account.address })}>
        queryNftByAddress
      </button>
      |
    </CommLayout>
  );
};

export default Page;
