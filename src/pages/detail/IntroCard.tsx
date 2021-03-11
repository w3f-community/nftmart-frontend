import React, { FC } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import Card from '../../components/card';
import colors from '../../themes/colors';
import { t } from '../../i18n';

const IntroCard: FC<{ description: string }> = ({ description }) => {
  return (
    <Card title={t('detail.title.intro')}>
      <Stack>
        <Text color={colors.text.black}>{description}</Text>
      </Stack>
    </Card>
  );
};

export default IntroCard;
