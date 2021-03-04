import React from 'react';
import { forwardRef, ChakraProps, chakra, ComponentWithAs, Box } from '@chakra-ui/react';
import { motion, MotionProps, isValidMotionProp } from 'framer-motion';

import colors from '../../themes/colors';
import PriceIcon from '../../assets/home/icon_price.png';

type CollectionProps = {
  name: string;
  price: number;
};

export type MotionBoxProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

// TODO: Should we abstract motion to a common component?
export const MotionBox = motion.custom(
  forwardRef<MotionBoxProps, 'div'>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
    );
    // FIXME: ref type imcompatible
    return <chakra.div ref={ref as any} {...chakraProps} />;
  }),
) as ComponentWithAs<'div', MotionBoxProps>;

// FIXME: MotionBox seems to have a bit rendering issue which looks like crashing
const Collection = (props: CollectionProps) => {
  const { name, price } = props;

  return (
    <MotionBox
      width="260px"
      height="310px"
      backgroundColor="#fff"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Box height="195px" backgroundColor="blue"></Box>
      <Box
        mt="16px"
        display="flex"
        justifyContent="space-between"
        p="0 16px"
        height="17px"
        lineHeight="17px"
        fontSize="12px"
        color={colors.text.gray}
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
        color={colors.text.black}
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
    </MotionBox>
  );
};

export default Collection;
