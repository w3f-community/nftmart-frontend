import React, { useEffect, useState } from 'react';
import { compose, filter, groupBy } from 'ramda';
import { Center, Container, Text } from '@chakra-ui/react';

import { GetItems } from '../../api/graph';
import CommLayout from '../../layouts/common';

import TypeFilter from './TypeFilter';
import Works from './Works';
import { Work } from '../../types';
import colors from '../../themes/colors';
import Up from '../../components/uploader';

type ListMap = Record<string, Work[]>;

const STATUS_MAP: Record<number, string> = {
  1: 'listing',
  2: 'new',
  3: 'recent',
};

const groupByStatus = groupBy<Work>(({ Status }) => STATUS_MAP[Status]);

const Page = () => {
  const { loading, error, data: response } = GetItems();

  const originalAssets: Work[] = response?.assets?.assets ?? [];

  const [workListMap, setWorkListMap] = useState<ListMap>(groupByStatus(originalAssets));
  const [stickyFilter, setStickyFilter] = useState(false);
  const [typeFilterHeight, setTypeFilterHeight] = useState(338);

  // State Effect
  useEffect(() => {
    if (response?.assets?.assets.length) {
      setWorkListMap(groupByStatus(response?.assets?.assets));
    }
    return () => {
      //
    };
  }, [response]);

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
    setWorkListMap(
      compose<Work[], Work[], ListMap>(
        groupByStatus,
        filter((work: Work) => work.categoryId === categoryId),
      )(originalAssets),
    );
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
      <Up></Up>
    </CommLayout>
  );
};

export default Page;
