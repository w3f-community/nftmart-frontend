import React from 'react';
import { groupBy } from 'ramda';
import { Box, Center, Container, Text } from '@chakra-ui/react';

import { GetItems } from '../../api/graph';
import CommLayout from '../../layouts/common';

import Banner from './Banner';
import TypeFilter from './TypeFilter';
import Works from './Works';
import { Work } from '../../types';
import colors from '../../themes/colors';

const STATUS_MAP: Record<number, string> = {
  1: 'listing',
  2: 'new',
  3: 'recent',
};

const Page = () => {
  const { loading, error, data: response } = GetItems();

  const errorBox = (
    <Container height={300}>
      <Center height="100%">
        <Text color={colors.text.gray}>{error?.message}</Text>
      </Center>
    </Container>
  );

  const workList: Record<string, Work[]> = groupBy<Work>(
    ({ Status }) => STATUS_MAP[Status],
    response?.assets.assets ?? [],
  );

  return (
    <CommLayout>
      <Banner />
      <TypeFilter />
      {error ? errorBox : <Works loading={loading} data={workList} />}
    </CommLayout>
  );
};

export default Page;
