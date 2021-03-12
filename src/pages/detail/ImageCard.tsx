import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import Image, { Shimmer } from 'react-shimmer';

export interface ImageCardProps {
  src: string;
  width?: number;
  height?: number;
}

const ImageCard: FC<ImageCardProps> = ({ width = 466, height = 666, src }) => {
  return (
    <Box borderRadius="3px">
      {/* <AspectRatio maxHeight="666px" ratio={1}> */}
      <Box borderRadius="3px">
        <Image
          src={src}
          fallback={<Shimmer height={height} width={width} />}
          NativeImgProps={{
            style: {
              objectFit: 'cover',
              maxWidth: '100%',
            },
          }}
        />
      </Box>
      {/* </AspectRatio> */}
    </Box>
  );
};

export default ImageCard;
