import React from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { t } from '../../../i18n';

const statusMap = {
  'nav.list-sale': 'a',
  'nav.latest-create': 'b',
  'nav.latest-strike': 'c',
};

const SideFilter = () => {
  return (
    // Columns
    <Box width="270px">
      {/* Card */}
      <Box
        backgroundColor="#fff"
        boxShadow="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06)"
        borderRadius="4px"
        paddingY={6}
        paddingX={4}
      >
        <Stack spacing={4}>
          <Stack mb={2}>
            <Heading as="h4" size="md">
              状态
            </Heading>
            <Wrap direction="row" spacing={4}>
              {Object.keys(statusMap).map((key) => (
                <WrapItem>
                  <Button variant="default" onClick={() => null} width="120px">
                    {t(key)}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </Stack>

          <Stack>
            <Heading as="h4" size="md">
              集合
            </Heading>
            <Input />
            <RadioGroup>
              <Stack>
                <Radio>Hashmasks</Radio>
                <Radio>CryptoPunks</Radio>
                <Radio>SperRare</Radio>
                <Radio>Raible</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SideFilter;
