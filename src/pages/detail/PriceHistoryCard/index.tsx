import React from 'react';
import { Stack, Flex, Heading, Text } from '@chakra-ui/react';

import Card from '../../../components/card';
import NSelect from '../../../components/nSelect';
import colors from '../../../themes/colors';
import PriceHistoryChart from '../PriceHistoryChart';
import { t } from '../../../i18n';

const PriceHistoryCard = () => {
  return (
    <Card title={t('detail.title.price')}>
      <Stack spacing={4}>
        <Stack direction="row" spacing={4}>
          <NSelect
            options={[
              { title: '最近7天', value: 7 },
              { title: '最近30天', value: 30 },
            ]}
            suffix
          />

          <Flex direction="column" justify="space-between">
            <Text color={colors.text.gray}>7天成交价格</Text>
            <Heading as="h4" size="md">
              187,123
            </Heading>
          </Flex>

          <Flex direction="column" justify="space-between">
            <Text color={colors.text.gray}>7天成交价格</Text>
            <Heading as="h4" size="md">
              187,123
            </Heading>
          </Flex>
        </Stack>

        <PriceHistoryChart />
      </Stack>
    </Card>
  );
};

export default PriceHistoryCard;
