import React from 'react';
import { Box } from '@chakra-ui/react';
import StateIcon from '../../../assets/explore/icon_state.png';
import CollectionIcon from '../../../assets/explore/icon_collection.png';

const SideFilter = () => {
  return (
    <Box
      width="260px"
      height="396px"
      backgroundColor="#fff"
      boxShadow="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06)"
      borderRadius="4px"
      padding="20px"
    >
      <Box height="25px" display="flex" alignItems="center">
        <Box as="img" src={StateIcon} alt="" width="18px"></Box>
        <Box
          lineHeight="25px"
          height="100%"
          fontSize="18px"
          color="#333"
          fontWeight="600"
          fontSize="18px"
          ml="4px"
        >
          状态
        </Box>
      </Box>
      <Box></Box>
      <Box height="25px" display="flex" alignItems="center">
        <Box as="img" src={CollectionIcon} alt="" width="18px"></Box>
        <Box
          lineHeight="25px"
          height="100%"
          fontSize="18px"
          color="#333"
          fontWeight="600"
          fontSize="18px"
          ml="4px"
        >
          集合
        </Box>
      </Box>
    </Box>
  );
};

export default SideFilter;
