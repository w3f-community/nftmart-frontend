import React from 'react';
import { groupBy, prop } from 'ramda';

import { GetItems } from '../../api/graph';
import CommLayout from '../../layouts/common';

import Banner from './Banner';
import TypeFilter from './TypeFilter';
import Works from './Works';
import { Work } from '../../types';

const STATUS_MAP: Record<number, string> = {
  1: 'listing',
  2: 'new',
  3: 'recent',
};

const Page = () => {
  const { loading, error, data: response } = GetItems();

  const workList: Record<string, Work[]> = groupBy<Work>(
    ({ Status }) => STATUS_MAP[Status],
    response?.assets.assets ?? [],
  );

  return (
    <CommLayout>
      <Banner />
      <TypeFilter />
      <Works loading={loading} data={workList} />
    </CommLayout>
  );
};

export default Page;
