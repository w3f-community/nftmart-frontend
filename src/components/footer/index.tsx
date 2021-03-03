import React from 'react';
import { Box } from '@chakra-ui/react';
import LogoImg from '../../assets/footer_logo.png';
import GithubLogo from '../../assets/footer_icon_github.png';
import GithubLogoHover from '../../assets/footer_icon_github_s.png';
import TwitterLogo from '../../assets/footer_icon_twitter.png';
import TwitterLogoHover from '../../assets/footer_icon_twitter_s.png';
import FaceboookLogo from '../../assets/footer_icon_facebook.png';
import FaceboookLogoHover from '../../assets/footer_icon_facebook_s.png';
import WeboLogo from '../../assets/footer_icon_webo.png';
import WeboLogoHover from '../../assets/footer_icon_webo_s.png';
import WechatLogo from '../../assets/footer_icon_wechat.png';
import WechatLogoHover from '../../assets/footer_icon_wechat_s.png';
import InsLogo from '../../assets/footer_icon_ins.png';
import InsLogoHover from '../../assets/footer_icon_ins_s.png';

export default function Uploader() {
  const iconList = [
    { src: GithubLogo, hoverSrc: GithubLogoHover, id: 0 },
    { src: TwitterLogo, hoverSrc: TwitterLogoHover, id: 1 },
    { src: FaceboookLogo, hoverSrc: FaceboookLogoHover, id: 2 },
    { src: WeboLogo, hoverSrc: WeboLogoHover, id: 3 },
    { src: WechatLogo, hoverSrc: WechatLogoHover, id: 4 },
    { src: InsLogo, hoverSrc: InsLogoHover, id: 5 },
  ];

  return (
    <Box
      as="footer"
      flex={1}
      display="flex"
      justifyContent="center"
      height="232px"
      backgroundColor="#373F60"
      border="1px solid #979797"
    >
      <Box mr="60px" mt="100px">
        <Box as="img" src={LogoImg} alt="" width="180px"></Box>
      </Box>
      <Box mr="60px" width="663px" mt="60px">
        <Box lineHeight="20px" fontWeight="500" fontSize="14px" color="#61688A" mb="10px">
          About Us
        </Box>
        <Box lineHeight="20px" color="#C7CCE6" fontSize="14px">
          NFTmark, dedicated to an instant and inclusive coverage of everything happening in the
          crypto/blockchain world, delivers right trade information with professional insights and
          state-of-art accuracy to an international readership.
        </Box>
      </Box>
      <Box mt="60px">
        <Box lineHeight="20px" color="#61688a" fontWeight="500" fontSize="14px" mb="33px">
          Follow Us
        </Box>
        <Box mb="20px" display="flex">
          {iconList.map(({ id, src, hoverSrc }) => (
            <Box ml={id !== 0 ? '30px' : 0} role="group">
              <Box
                as="img"
                alt=""
                src={src}
                key={id}
                width="32px"
                cursor="pointer"
                _groupHover={{ display: 'none' }}
              />
              <Box
                as="img"
                alt=""
                display="none"
                src={hoverSrc}
                key={id}
                width="32px"
                cursor="pointer"
                _groupHover={{ display: 'block' }}
              />
            </Box>
          ))}
        </Box>
        <Box lineHeight="20px" color="#61688a" fontSize="12px">
          © 2021 NFTmark
        </Box>
      </Box>
    </Box>
  );
}
