import React, { FC } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Divider,
  Text,
  Flex,
  Stack,
  Box,
} from '@chakra-ui/react';
import { keys, map, omit } from 'ramda';
import { useTranslation } from 'react-i18next';
import colors from '../../themes/colors';

interface BalanceType {
  feeFrozen: string;
  free: string;
  miscFrozen: string;
  reserved: string;
}

export interface BalanceProps {
  balance?: BalanceType;
}

const Balance: FC<BalanceProps> = ({ balance }) => {
  const { t } = useTranslation();

  if (!balance) return null;

  const renderBalanceText = (balanceText: string) => {
    const [money, unit] = balanceText.replace('k', '').split(' ');
    const normalizedMoney = String(+money * 1000);
    const [integer, decimal] = normalizedMoney.split('.');

    return (
      <>
        <Text fontSize="sm" fontWeight="bold" color={colors.primary}>
          {integer}
          {decimal ? '.' : ''}
        </Text>
        <Text fontSize="sm" color={colors.text.gray} marginRight={1}>
          {decimal}
        </Text>
        <Text fontSize="sm" color={colors.primary}>
          {unit}
        </Text>
      </>
    );
  };

  const renderContentText = (key: keyof BalanceType) => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Text fontSize="sm">{t(`balance.${key}`)}:</Text> <Box>{renderBalanceText(balance[key])}</Box>
    </Stack>
  );

  const triggerContent = (
    <Flex cursor="pointer">
      <Divider
        orientation="vertical"
        borderColor={colors.text.black}
        marginRight={2}
        height="18px"
      />
      {renderBalanceText(balance.free)}
    </Flex>
  );

  const contentNode = (
    <Box padding={4}>
      {map(renderContentText, keys(omit<BalanceType, 'free'>(['free'], balance)))}
    </Box>
  );

  return (
    <Popover trigger="hover" variant="menu">
      <PopoverTrigger>{triggerContent}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{contentNode}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Balance;
