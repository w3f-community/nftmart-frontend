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
import { createClass, getClassById, mintNft, getCategories, getAllNfts } from '../../api/polka';

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

  const create = () => {
    const metadata = {
      name: 'second nft class',
      description: 'this is my second nft class',
      url: 'http://www.baidu.com',
      externalUrl: '123',
      bannerUrl: '123',
    };
    createClass({ address: account.address, metadata });
  };

  const mint = () => {
    const metadata = {
      name: 'second nft class',
      description: 'this is my second nft class',
      url: 'http://www.baidu.com',
      externalUrl: '123',
      bannerUrl: '123',
    };
    mintNft({ address: account.address, metadata, classID: 15 });
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
    <CommLayout>
      <TypeFilter onFilter={handleFilter} sticky={stickyFilter} top={typeFilterHeight} />
      {error ? errorBox : <Works loading={loading} data={workListMap} />}
      <button onClick={() => create()}>create</button>|
      <button onClick={() => getClassById(8)}>get</button>|
      <button onClick={() => mint()}>mint</button>
      <br />
      <button onClick={() => getCategories()}>getCate</button>
      <button onClick={() => getAllNfts()}>getAllNFTs</button>
    </CommLayout>
  );
};

export default Page;
