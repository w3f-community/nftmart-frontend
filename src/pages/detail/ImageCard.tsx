import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import Image, { Shimmer } from 'react-shimmer';

const ImageCard: FC<{ src: string }> = ({ src }) => {
  return (
    <Box borderRadius="3px">
      {/* <AspectRatio maxHeight="666px" ratio={1}> */}
      <Box borderRadius="3px">
        <Image
          src={src}
          fallback={<Shimmer height={666} width={466} />}
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
