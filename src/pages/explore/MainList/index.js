import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Collection from '../../../components/collection';
import colors from '../../../themes/colors';

const MainList = () => {
  const typeList = [
    { name: '全部', id: 0 },
    { name: '数字艺术品', id: 1 },
    { name: '虚拟世界', id: 2 },
    { name: '运动', id: 3 },
    { name: '收藏品', id: 4 },
    { name: '其他', id: 5 },
  ];
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

  const [activeType, setActiveType] = useState(0);

  const handleFilterType = (id) => {
    setActiveType(id);
  };

  return (
    <Box width="1104px">
      <Box
        display="flex"
        justifyContent="center"
        ml="16px"
        mb="20px"
        height="60px"
        alignItems="center"
        borderRadius="4px"
        backgroundColor="#fff"
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.06)"
      >
        {typeList.map(({ id, name }) => (
          <Box
            key={id}
            p="0 10px"
            ml={id > 0 ? '100px' : '0'}
            height="24px"
            cursor="pointer"
            fontSize="16px"
            fontWeight={id === activeType ? '600' : '400'}
            color={id === activeType ? colors.text.black : colors.text.gray}
            onClick={() => {
              handleFilterType(id);
            }}
          >
            {name}
          </Box>
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
