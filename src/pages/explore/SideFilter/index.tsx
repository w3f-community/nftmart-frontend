import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { t } from '../../../i18n';
import colors from '../../../themes/colors';
import { Collection } from '../../../stores/assets';
import Empty from '../../../components/empty';

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

export interface SideFilterProps {
  data: Collection[];
  loading: boolean;
  onSearch: (v: string) => void;
  onSelect: (c: number) => void;
  onStatusChange: (s: number) => void;
}

const SideFilter: FC<SideFilterProps> = ({ data, loading, onSearch, onStatusChange, onSelect }) => {
  // TODO: is there a better way to manipulate status
  // TODO: add multiple select prop
  const selectedStatusSet = useMemo<Set<number>>(() => new Set(), []);
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(-1);

  // Update default collectionId
  useEffect(() => {
    if (data.length && selectedCollectionId === -1) {
      setSelectedCollectionId(data[0].id);
    }

    return () => {
      //
    };
  }, [data]);

  const handleSelectStatus = (status: number) => {
    if (selectedStatusSet.has(status)) {
      selectedStatusSet.delete(status);
    } else {
      selectedStatusSet.add(status);
    }

    setSelectedStatus(Array.from(selectedStatusSet));
  };

  const handleSelectCollection = (val: number | string) => {
    const result = Number(val);
    setSelectedCollectionId(result);
    onSelect(result);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    // TODO: add debounce
    onSearch(value);
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
            <Input placeholder={t('form.collection.placeholder')} onChange={handleSearch} />
            {loading && (
              <Center height="88px">
                <Spinner />
              </Center>
            )}

            {!loading && !data.length && (
              <Empty image={null} description={t('explore.collections.empty')} />
            )}

            {!loading && !!data.length && (
              <RadioGroup
                onChange={handleSelectCollection}
                value={selectedCollectionId}
                defaultValue={data[0].id}
              >
                <Stack>
                  {data.map(({ id, name }) => (
                    <Radio value={id} kye={id} checked={id === selectedCollectionId}>
                      {name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SideFilter;
