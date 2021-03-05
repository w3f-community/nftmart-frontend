import React from 'react';
import { Box, Flex, Stack, Text, Button, Container, Center } from '@chakra-ui/react';
import colors from '../../../themes/colors';

const Alert = () => {
  return (
    <Box height="80px" backgroundColor="#e9ecff" display="flex" alignItems="center">
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          <Center>
            <Box>
              <Text display="inline" color={colors.text.gray}>
                已上架
              </Text>{' '}
              <Text as="span" color={colors.primary}>
                数字艺术品 体育
              </Text>
            </Box>
          </Center>
          <Button variant="default">销毁</Button>
          <Button variant="primary">售卖设置</Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Alert;
