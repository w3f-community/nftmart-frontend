import React, { FC, useState } from 'react';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { t } from '../../../i18n';
import colors from '../../../themes/colors';
import Collection from '../../../components/collection';
import NSelect from '../../../components/nSelect';
import { Work } from '../../../types';
import Empty from '../../../components/empty';

const typeMap: Record<string, number> = {
  all: 1,
  digital: 2,
  virtual: 3,
  sport: 4,
  collect: 5,
  other: 6,
};

/** 类型选择 Type filter, use for filtering different types of works */

export interface TypeFiltersProps {
  onChange: (val: any) => void;
}

const TypeFilters: FC<TypeFiltersProps> = ({ onChange }) => {
  const [selectedType, setSelectedType] = useState('all');

  const handleSelect = (type: string) => {
    setSelectedType(type);
    // TODO: which property should we use?
    onChange(type);
  };

  const renderFilter = (type: string) => (
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
export interface Helpers {
  count: number;
  onSort: (val: any) => void;
}

const Helpers: FC<Helpers> = ({ count, onSort }) => {
  const suffix = `result${count > 1 ? 's' : ''}`;
  const options = [
    { value: 1, title: t('form.sort.auto') },
    // { value: 2, title: t('form.sort.other') },
    // { value: 3, title: t('form.sort.latest') },
  ];

  const result = (
    <Box>
      <Text color={colors.text.gray}>
        {count} {suffix}
      </Text>
    </Box>
  );

  const handleSelect = (value: any) => {
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

export interface MainListProps {
  data: Work[];
  onTypeChange: (type: number) => void
}

const MainList: FC<MainListProps> = ({ data, onTypeChange }) => {
  const count = data.length;

  const handleFilterChange = (type: number) => {
    // type
    console.log('CHANGED type:', type);
    onTypeChange(type)
  };

  const handleSorting = (sort: any) => {
    //
  };

  return (
    <Box flex={1}>
      <TypeFilters onChange={handleFilterChange} />

      <Helpers onSort={handleSorting} count={count} />

      {!!count && (
        <SimpleGrid columns={4}>
          {data.map((work) => (
            <Link to={`/detail/${work.id}`} key={work.id}>
              <Box ml="16px" mb="16px">
                <Collection {...work} />
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      )}

      {!count && <Empty description={t('list.empty')} />}
    </Box>
  );
};

export default MainList;
