import React, { FC, useState } from 'react';
import { Box, Container, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

import BannerBg from '../../../assets/home/banner.png';
import colors from '../../../themes/colors';
import { t } from '../../../i18n';
import { Z_INDEXES } from '../../../constants';

const BannerImg = styled.img({
  height: '100%',
  maxWidth: 'none',
});

const Title = styled.div({
  fontSize: '54px',
  fontWeight: 'bold',
  color: '#fff',
  lineHeight: '75px',
  letterSpacing: '2px',
});

const Intro = styled.div({
  marginTop: '8px',
  color: '#fff',
  lineHeight: '30px',
  fontSize: '22px',
  letterSpacing: '1px',
});

const ExploreButton = styled(Button)`
  margin-top: 40px;
  height: 48px;
  width: 184px;
  font-size: 16px;
  font-weight: bold;
  color: #1f58e7;
  border-radius: 4px;
`;

const TextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  top: '0',
  height: '100%',
  width: '100%',
  textAlign: 'center',
  zIndex: Z_INDEXES.banner,
});

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
  &.active,
  :hover {
    color: #000;
  }
`;

export interface TypeFilterProps {
  onFilter?: (v: number) => void;
  sticky?: boolean;
  top: number;
}

const TypeFilter: FC<TypeFilterProps> = ({ onFilter, sticky, top }) => {
  const [selectedTypeId, setSelectedTypeId] = useState(0);

  const typeList = [
    // { name: t('type.all'), id: 0 },
    { name: t('type.digital'), id: 1 },
    { name: t('type.virtual'), id: 2 },
    { name: t('type.sport'), id: 3 },
    { name: t('type.collect'), id: 4 },
    { name: t('type.other'), id: 5 },
  ];

  const handleTypeClick = (id: number) => {
    setSelectedTypeId(id);
    onFilter?.(id);
  };

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      height="440px"
      overflow="hidden"
      backgroundColor="blue"
    >
      <BannerImg src={BannerBg} alt="" />

      <TextContainer>
        <Title>The largest NFT marketplace</Title>
        <Intro>Buy, sell, and discover rare digital items</Intro>
        <ExploreButton>EXPLORE</ExploreButton>
      </TextContainer>

      <Box
        backgroundColor="white"
        // boxShadow="sm"
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.06)"
        borderTop={sticky ? `1px solid ${colors.divider.dark}` : ''}
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        zIndex={Z_INDEXES.typeFilter - 1}
        transition="top 0.2s linear"
      >
        <Container display="flex" justifyContent="center">
          {typeList.map(({ id, name }) => (
            <TypeItem
              key={id}
              onClick={() => handleTypeClick(id)}
              className={selectedTypeId === id ? 'active' : ''}
            >
              {name}
            </TypeItem>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default TypeFilter;
