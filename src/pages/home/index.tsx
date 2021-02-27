import React, { useEffect } from 'react';

import CommLayout from '../../layouts/common';
import Uploader from '../../components/uploader';
import { queryTimestamp } from '../../services';

const Page = () => {
  return (
    <CommLayout>
      home
      <Uploader />
    </CommLayout>
  );
};

export default Page;
