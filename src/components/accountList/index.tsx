import React, { useState, useEffect } from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Box, Text, Divider } from '@chakra-ui/react';
import iconSelect from '../../assets/icon_select.png';
import colors from '../../themes/colors';

import { getBalance } from '../../api/polka';

interface AccountProps {
  account: InjectedAccountWithMeta;
  handleClick: (index: number) => Promise<void>;
  index: number;
  length: number;
  balance: string;
}

const Account = ({ account, handleClick, index, length, balance }: AccountProps) => {
  const { address, meta } = account;
  const { name } = meta;

  return (
    <>
      <Box
        key={address}
        height="80px"
        padding="20px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => handleClick(index)}
        cursor="pointer"
      >
        <Box display="inline-block">
          <Text fontWeight="medium">{name}</Text>
          <Text color={colors.text.gray}>{address}</Text>
        </Box>
        <Box display="inline-block">
          <Text display="inline-block" fontWeight="medium" paddingRight="1">
            {balance}
          </Text>
          <Text display="inline-block" fontSize="small" color={colors.text.gray}>
            NMT
          </Text>
        </Box>
        <Box display="inline-block" as="img" src={iconSelect} w="32px" h="32px" />
      </Box>
      {index !== length - 1 && <Divider></Divider>}
    </>
  );
};

interface AccountListProps {
  list: InjectedAccountWithMeta[];
  handleClick: (index: number) => Promise<void>;
}

const AccountList = ({ list, handleClick }: AccountListProps) => {
  const [balanceArr, setBalanceArr] = useState<any>([]);

  useEffect(() => {
    list.forEach(async (account) => {
      const resArr = [];
      const res = await getBalance(account.address);
      resArr.push(res.toHuman().free);
      setBalanceArr(resArr);
    });
  }, [list]);

  return list.map((account, index) => (
    <Account
      account={account}
      handleClick={handleClick}
      balance={balanceArr[index]}
      index={index}
      length={list.length}
    />
  ));
};

export default AccountList;
