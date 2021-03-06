import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';
import colors from '../../../themes/colors';

const TypeItem = styled.li`
  list-style: none;
  padding: 0 10px;
  margin-left: 100px;
  font-size: 16px;
  line-height: 60px;
  cursor: pointer;
  color: ${colors.text.gray};
  :first-of-type {
    margin-left: 0;
  }
  :hover {
    color: #000;
  }
`;

const TypeFilter = () => {
  const typeList = [
    { name: '数学艺术品', id: 0 },
    { name: '虚拟世界', id: 1 },
    { name: '运动', id: 2 },
    { name: '收藏品', id: 3 },
    { name: '其他', id: 4 },
  ];

  return (
    <Box
      backgroundColor="white"
      // boxShadow="sm"
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.06)"
    >
      <Container display="flex" justifyContent="center">
        {typeList.map(({ id, name }) => (
          <TypeItem key={id}>{name}</TypeItem>
        ))}
      </Container>
    </Box>
  );
};

export default TypeFilter;
