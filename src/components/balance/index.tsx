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
import { map } from 'ramda';
import { useTranslation } from 'react-i18next';
import { formatBalance } from '@polkadot/util';
import colors from '../../themes/colors';
import { toBigNumber } from '../../utils';

interface BalanceType {
  feeFrozen: string;
  free: string;
  miscFrozen: string;
  reserved: string;
}

const availableBalanceKeys: (keyof BalanceType)[] = ['free', 'reserved'];
const baseOptions = [
  { power: 0, text: 'TEST', value: '-' },
  { power: 3, text: 'Kilo', value: 'k' },
  { power: 6, text: 'Mill', value: 'M' },
  { power: 9, text: 'Bill', value: 'B' },
  { power: 12, text: 'Tril', value: 'T' },
  { power: 15, text: 'Peta', value: 'P' },
  { power: 18, text: 'Exa', value: 'E' },
  { power: 21, text: 'Zeta', value: 'Z' },
  { power: 24, text: 'Yotta', value: 'Y' },
];

export interface BalanceProps {
  balance?: BalanceType | null;
}

const Balance: FC<BalanceProps> = ({ balance }) => {
  const { t } = useTranslation();

  if (!balance) return null;

  const renderBalanceText = (balanceText: string) => {
    if (!balanceText || typeof balanceText !== 'string') return null;

    const baseOption =
      baseOptions.find((option) => balanceText.includes(option.value)) || baseOptions[0];

    const [money, unit] = balanceText.replace(baseOption.value, '').split(' ');
    const normalizedMoney = toBigNumber(money).times(10 ** baseOption.power);
    const [integer, decimal] = normalizedMoney.toString().split('.');

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

  const renderContentText = (key: keyof BalanceType) => {
    const balanceText = balance[key];

    return (
      <Stack direction="row" alignItems="center" justifyContent="space-between" key={key}>
        <Text fontSize="sm">{t(`balance.${key}`)}:</Text>{' '}
        <Flex>{renderBalanceText(balanceText)}</Flex>
      </Stack>
    );
  };

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

  const contentNode = <Box padding={4}>{map(renderContentText, availableBalanceKeys)}</Box>;

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
