import React from 'react';
import { Box } from '@chakra-ui/react';
import Collection from '../../../components/collection';

const MainList = () => {
  const typeList = [{ name: '全部', id: 0 }];

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
    <Box width="1104px">
      <Box
        display="flex"
        ml="16px"
        mb="20px"
        height="60px"
        borderRadius="4px"
        backgroundColor="#fff"
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.06)"
      >
        {typeList.map(({ id, name }) => (
          <Box key={id}>{name}</Box>
        ))}
      </Box>
      <Box display="flex" flexWrap="wrap">
        {list.map(({ name, price, id }) => (
          <Box ml="16px" mb="16px">
            <Collection name={name} price={price} key={id} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MainList;
