import React from 'react';
import { Box } from '@chakra-ui/react';
import colors from '../../themes/colors';
import PriceIcon from '../../assets/home/icon_price.png';

type CollectionProps = {
  name: string;
  price: number;
};

const Collection = (props: CollectionProps) => {
  const { name, price } = props;

  return (
    <Box width="260px" height="310px" backgroundColor="#fff" borderRadius="4px">
      <Box height="195px" backgroundColor="blue" />
      <Box
        mt="16px"
        display="flex"
        justifyContent="space-between"
        p="0 16px"
        height="17px"
        lineHeight="17px"
        fontSize="12px"
        color={colors.text[600]}
      >
        <Box>作品集</Box>
        <Box flex="1" textAlign="right">
          价格
        </Box>
      </Box>
      <Box
        mt="8px"
        display="flex"
        justifyContent="space-between"
        p="0 16px"
        height="22px"
        fontWeight="600"
        color={colors.text[500]}
      >
        <Box lineHeight="22px">{name}</Box>
        <Box
          flex="1"
          textAlign="right"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box src={PriceIcon} as="img" alt="" mr="4px" />
          <Box>{price}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Collection;
