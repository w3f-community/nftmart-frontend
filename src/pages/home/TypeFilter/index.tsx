import React from 'react';
import styled from '@emotion/styled';
import colors from '../../../themes/colors';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  height: '60px',
  backgroundColor: '#fff',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
});

const TypeItem = styled.li`
  list-style: none;
  padding: 0 10px;
  margin-left: 100px;
  font-size: 16px;
  line-height: 60px;
  cursor: pointer;
  color: ${colors.text[600]};
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
    <Container>
      {typeList.map(({ id, name }) => (
        <TypeItem key={id}>{name}</TypeItem>
      ))}
    </Container>
  );
};

export default TypeFilter;
