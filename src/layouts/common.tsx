import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <Box as="main">{children}</Box>
    </>
  );
};

export default layout;
