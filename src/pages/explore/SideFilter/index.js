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
    <Box width="321px">
      {/* Card */}
      <Box backgroundColor="#fff" boxShadow="base" borderRadius="4px" paddingY={6} paddingX={4}>
        <Stack spacing={4}>
          <Stack mb={2}>
            <Heading as="h4" size="md">
              {t('form.status')}
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
              {t('form.collection')}
            </Heading>
            <Input placeholder={t('form.collection.placeholder')} />
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
