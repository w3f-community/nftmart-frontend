import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import BannerBg from '../../../assets/home/banner.png';

const Container = styled.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  height: '440px',
  backgroundColor: 'blue',
});

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
});

const Banner = () => {
  return (
    <Container>
      <BannerImg src={BannerBg} alt="" />
      <TextContainer>
        <Title>The largest NFT marketplace</Title>
        <Intro>Buy, sell, and discover rare digital items</Intro>
        <ExploreButton>EXPLORE</ExploreButton>
      </TextContainer>
    </Container>
  );
};

export default Banner;
