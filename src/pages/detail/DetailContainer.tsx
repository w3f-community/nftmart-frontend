import React, { FC } from 'react';
import { Box, SimpleGrid, Stack } from '@chakra-ui/react';

export interface DetailContainerProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const DetailContainer: FC<DetailContainerProps> = ({ left, right }) => {
  return (
    <Box minH="1200px">
      <SimpleGrid templateColumns="466px auto" spacing={4} paddingY={6}>
        <Stack spacing={4}>{left}</Stack>

        <Stack spacing={4}>{right}</Stack>
      </SimpleGrid>
    </Box>
  );
};

export default DetailContainer;
