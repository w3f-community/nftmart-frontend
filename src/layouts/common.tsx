import React from 'react';
import { Box } from '@chakra-ui/react';


interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <Box as="main" h='100vh'>
        {children}
      </Box>
    </>
  );
}


export default layout