import React, { FC } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import Card from '../../components/card';
import colors from '../../themes/colors';

const IntroCard: FC<{ description: string }> = ({ description }) => {
  return (
    <Card title="介绍">
      <Stack>
        <Text color={colors.text.black}>{description}</Text>
      </Stack>
    </Card>
  );
};

export default IntroCard;
