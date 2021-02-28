import React, { useEffect } from 'react';

import CommLayout from '../../layouts/common';
import Banner from './Banner';
import TypeFilter from './TypeFilter';
import Works from './Works';

const Page = () => {
  return (
    <CommLayout>
      <Banner />
      <TypeFilter />
      <Works />
    </CommLayout>
  );
};

export default Page;
