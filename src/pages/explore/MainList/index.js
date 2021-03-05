import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { t } from '../../../i18n';
import colors from '../../../themes/colors';
import Collection from '../../../components/collection';
import NSelect from '../../../components/nSelect';

const typeMap = {
  all: 1,
  digital: 2,
  virtual: 3,
  sport: 4,
  collect: 5,
  other: 6,
};

/** 类型选择 Type filter, use for filtering different types of works */
const TypeFilters = ({ onChange }) => {
  const [selectedType, setSelectedType] = useState('all');

  const handleSelect = (type) => {
    setSelectedType(type);
    // TODO: which property should we use?
    onChange(type);
  };

  const renderFilter = (type) => (
    <Box
      key={typeMap[type]}
      cursor="pointer"
      _hover={{ color: colors.text.black }}
      color={selectedType === type ? colors.text.black : ''}
      onClick={() => handleSelect(type)}
    >
      {t(`type.${type}`)}
    </Box>
  );

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      ml="16px"
      height="60px"
      borderRadius="4px"
      backgroundColor="#fff"
      boxShadow="base"
      color={colors.text.gray}
    >
      {Object.keys(typeMap).map(renderFilter)}
    </Box>
  );
};

/** 展示 结果 与 排序选择 */
const Helpers = ({ count, onSort }) => {
  const suffix = `result${count > 1 ? 's' : ''}`;
  const options = [
    { value: 1, title: t('form.sort.auto') },
    { value: 2, title: t('form.sort.other') },
    { value: 3, title: t('form.sort.latest') },
  ];

  const result = (
    <Box>
      <Text color={colors.text.gray}>
        {count} {suffix}
      </Text>
    </Box>
  );

  const handleSelect = (value) => {
    onSort(value);
  };

  const sorter = (
    <Box>
      <NSelect options={options} onSelect={handleSelect} />
    </Box>
  );

  return (
    <Flex justify="space-between" align="center" ml="16px" py="16px">
      {result}
      {sorter}
    </Flex>
  );
};

const MainList = () => {
  const [count, setCount] = useState(16178);

  const list = [
    { name: '星空', price: 1, id: 0 },
    { name: '星空', price: 1, id: 1 },
    { name: '星空', price: 1, id: 2 },
    { name: '星空', price: 1, id: 3 },
    { name: '星空', price: 1, id: 4 },
    { name: '星空', price: 1, id: 5 },
    { name: '星空', price: 1, id: 6 },
    { name: '星空', price: 1, id: 7 },
    { name: '星空', price: 1, id: 8 },
    { name: '星空', price: 1, id: 9 },
  ];

  const handleFilterChange = (type) => {
    // type
    console.log('CHANGED type:', type);
  };

  const handleSorting = (sort) => {
    //
  };

  return (
    <Box width="1104px">
      <TypeFilters onChange={handleFilterChange} />

      <Helpers onSort={handleSorting} count={count} />

      <Box display="flex" flexWrap="wrap">
        {list.map(({ name, price, id }) => (
          <Link to="/">
            <Box ml="16px" mb="16px">
              <Collection name={name} price={price} key={id} />
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default MainList;
