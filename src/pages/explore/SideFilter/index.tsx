import React, { useMemo, useState } from 'react';
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
import colors from '../../../themes/colors';

const STATUS_MAP: Record<string, number> = {
  'nav.list-sale': 0,
  'nav.latest-create': 1,
  'nav.latest-strike': 2,
};

const QUERY_MAP: Record<string, string> = {
  listing: 'nav.list-sale',
  new: 'nav.latest-create',
  recent: 'nav.latest-strike',
};

const FAKE_CATEGORIES = [];

const SideFilter = () => {
  // TODO: is there a better way to manipulate status
  // TODO: add multiple select prop
  const selectedStatusSet = useMemo<Set<number>>(() => new Set(), []);
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);

  const handleSelectStatus = (status: number) => {
    if (selectedStatusSet.has(status)) {
      selectedStatusSet.delete(status);
    } else {
      selectedStatusSet.add(status);
    }

    setSelectedStatus(Array.from(selectedStatusSet));
  };

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
              {Object.keys(STATUS_MAP).map((key) => {
                const status = STATUS_MAP[key];
                const isSelected = selectedStatusSet.has(status);
                const color = isSelected ? colors.primary : colors.text.gray;

                return (
                  <WrapItem flex={1} key={key}>
                    <Button
                      variant="default"
                      borderColor={color}
                      color={color}
                      onClick={() => handleSelectStatus(status)}
                      flex={1}
                      _focus={{ boxShadow: 'none' }}
                    >
                      {t(key)}
                    </Button>
                  </WrapItem>
                );
              })}
              {/* Placeholder */}
              <WrapItem flex={1}></WrapItem>
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
