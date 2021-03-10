import React, { useEffect, useState } from 'react';
import { groupBy } from 'ramda';
import { Center, Container, Text } from '@chakra-ui/react';

import store, { actions } from '../../stores/assets';

import { GetItems } from '../../api/graph';
import CommLayout from '../../layouts/common';

import TypeFilter from './TypeFilter';
import Works from './Works';
import { Work } from '../../types';
import colors from '../../themes/colors';

type ListMap = Record<string, Work[]>;

const STATUS_MAP: Record<number, string> = {
  1: 'listing',
  2: 'new',
  3: 'recent',
};

const groupByStatus = groupBy<Work>(({ status }) => STATUS_MAP[status]);

const Page = () => {
  const { loading, error, data: response } = GetItems();
  const { assets } = store.useState('assets', 'filteredAssets');

  const [workListMap, setWorkListMap] = useState<ListMap>(groupByStatus(assets));
  const [stickyFilter, setStickyFilter] = useState(false);
  const [typeFilterHeight] = useState(338);

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
      <Center height="100%">
        <Text color={colors.text.gray}>{error?.message}</Text>
      </Center>
    </Container>
  );

  return (
    <CommLayout>
      <TypeFilter onFilter={handleFilter} sticky={stickyFilter} top={typeFilterHeight} />
      {error ? errorBox : <Works loading={loading} data={workListMap} />}
    </CommLayout>
  );
};

export default Page;
