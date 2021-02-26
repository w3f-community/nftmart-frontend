import React from 'react';
import { Box } from '@chakra-ui/react';
// import { useIpfs } from '../../utils';

export default function Uploader() {
  // useEffect(() => {
  //   const getFile = async () => {
  //     const ipfs = useIpfs();
  //     const res = await ipfs.get('QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF');
  //     console.log(res, '======');
  //   };
  //   getFile();
  // }, [ipfs]);

  return <Box as="header" flex={1}></Box>;
}
