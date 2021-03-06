import React from 'react';
import { Flex, Box, Container, Text, Button, color } from '@chakra-ui/react';
import Collection from '../../../components/collection';
import { t } from '../../../i18n';
import colors from '../../../themes/colors';

const MainList = () => {
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

  return (
    <Container>
      <Flex alignItems="center" pl="16PX" height="40px" justifyContent="space-between">
        <Flex alignItems="center">
          <Text fontSize="14px" color={colors.text.gray} mr="10px">
            {t('list.total.result', { count: 1000 })}
          </Text>
          <Button variant="default" onClick={() => null}>
            {t('nav.list-sale')}
          </Button>
        </Flex>
        <Box>Sorter</Box>
      </Flex>
      <Box display="flex" flexWrap="wrap">
        {list.map(({ name, price, id }) => (
          <Flex ml="16px" mb="16px">
            <Collection name={name} price={price} key={id} />
          </Flex>
        ))}
      </Box>
    </Container>
  );
};

export default MainList;
