import { Box, Image } from '@chakra-ui/react';
import React, { FC } from 'react';

const ImageCard: FC<{ src: string }> = ({ src }) => {
  return (
    <Box borderRadius="3px">
      {/* <AspectRatio maxHeight="666px" ratio={1}> */}
      <Image borderRadius="3px" maxHeight="666px" src={src} objectFit="cover" />
      {/* </AspectRatio> */}
    </Box>
  );
};

export default ImageCard;
