import { Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import Card from '../../components/card';
import { t } from '../../i18n';
import Meta from './Meta';

export interface MetaCardProps {
  metadata: string;
  owner?: string;
}

const MetaCard: FC<MetaCardProps> = ({ metadata, owner }) => {
  return (
    <Card title={t('detail.title.metadata')}>
      <Stack>
        {owner && <Meta description={t('detail.meta.create')} who={owner} />}
        <Text color="#4d5058">{metadata}</Text>
      </Stack>
    </Card>
  );
};

export default MetaCard;
