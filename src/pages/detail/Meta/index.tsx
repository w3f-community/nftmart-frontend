import React, { FC } from 'react';
import { Avatar, Stack, Text } from '@chakra-ui/react';
import colors from '../../../themes/colors';

export interface MetaProps {
  avatar?: string;
  description?: string;
  who?: string;
}

const Meta: FC<MetaProps> = ({ avatar, description, who }) => (
  <Stack direction="row" alignItems="center" cursor="pointer" userSelect="none">
    <Avatar width={6} height={6} src={avatar} /> <Text color={colors.text.gray}>{description}</Text>
    <Text as="span" color={colors.primary}>
      {who}
    </Text>
  </Stack>
);

export default Meta;
