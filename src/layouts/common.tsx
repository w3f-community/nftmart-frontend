import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Box marginTop="77px" as="main">
        {children}
      </Box>
    </>
  );
};

export default Layout;
