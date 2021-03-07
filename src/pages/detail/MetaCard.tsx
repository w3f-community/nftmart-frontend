import { Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import Card from '../../components/card';
import Meta from './Meta';

const MetaCard: FC<{ metadata: string }> = ({ metadata }) => {
  return (
    <Card title="元数据">
      <Stack>
        <Meta description="Created by" who="Cook" />
        <Text color="#4d5058">{metadata}</Text>
      </Stack>
    </Card>
  );
};

export default MetaCard;
