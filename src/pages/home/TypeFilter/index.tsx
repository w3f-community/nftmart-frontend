import React, { FC } from 'react';
import { Box, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';
import colors from '../../../themes/colors';
import { t } from '../../../i18n';

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

export interface TypeFilterProps {
  onFilter?: (v: number) => void;
}

const TypeFilter: FC<TypeFilterProps> = ({ onFilter }) => {
  const typeList = [
    { name: t('type.digital'), id: 1 },
    { name: t('type.virtual'), id: 2 },
    { name: t('type.sport'), id: 3 },
    { name: t('type.collect'), id: 4 },
    { name: t('type.other'), id: 5 },
  ];

  return (
    <Box
      backgroundColor="white"
      // boxShadow="sm"
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.06)"
    >
      <Container display="flex" justifyContent="center">
        {typeList.map(({ id, name }) => (
          <TypeItem key={id} onClick={() => onFilter?.(id)}>
            {name}
          </TypeItem>
        ))}
      </Container>
    </Box>
  );
};

export default TypeFilter;
