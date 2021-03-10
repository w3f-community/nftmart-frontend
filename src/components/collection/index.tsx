import React from 'react';
import { forwardRef, ChakraProps, chakra, ComponentWithAs, Box, Flex } from '@chakra-ui/react';
import { motion, MotionProps, isValidMotionProp } from 'framer-motion';
import Image, { Shimmer } from 'react-shimmer';

import colors from '../../themes/colors';
import PriceIcon from '../../assets/home/icon_price.png';
import { t } from '../../i18n';
import { Work } from '../../types';
import { toFixedDecimals } from '../../utils';

type CollectionProps = {
  isSet?: boolean;
} & Partial<Work>;

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
  const { name, price, picUrl, isSet = false } = props;

  return (
    <MotionBox
      width="231px"
      height="310px"
      backgroundColor="#fff"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      <Image src={picUrl as string} fallback={<Shimmer height={195} width={231} />} />
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
        <Box userSelect="none">{t('component.collection.title')}</Box>
        <Box userSelect="none" flex="1" textAlign="right">
          {t('component.collection.price')}
        </Box>
      </Box>
      <Box
        mt="8px"
        display="flex"
        justifyContent="space-between"
        maxHeight="80px"
        p="0 16px 16px 16px"
        fontWeight="600"
        color={colors.text.black}
        flex="1"
      >
        <Box pr={2} flex="2" overflow="hidden" textOverflow="ellipsis">
          {name}
        </Box>
        <Box flex="1" textAlign="right" display="flex" justifyContent="flex-end">
          <Flex align="center" height="22px">
            {isSet && <Box src={PriceIcon} as="img" alt="" mr="4px" />}
            <Box>{toFixedDecimals(price!, 0)}</Box>
          </Flex>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default Collection;
