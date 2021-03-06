import {
  Box,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import colors from '../themes/colors';

export type Option<Value = any> = { value: Value; title: string };

export interface NSelectProps<Value = any> {
  options: Option<Value>[];
  onSelect?: (val: Value) => void;
  defaultValue?: Value;
}

const NSelect: FC<NSelectProps> = ({ options, onSelect, defaultValue }) => {
  const [opening, setOpening] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>();

  // Trigger
  const triggerNode = (
    <Box
      paddingX={4}
      paddingY={2}
      backgroundColor="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="180px"
      borderRadius={3}
      cursor="pointer"
      boxShadow="base"
      onClick={() => setOpening(true)}
    >
      <Text>{selectedOption?.title ?? options[0].title}</Text>
      <Icon color={colors.text.gray} as={opening ? IoMdArrowDropup : IoMdArrowDropdown} />
    </Box>
  );

  // events
  const handleSelect = (index: number) => {
    onSelect?.(options[index].value);
    setSelectedOption(options[index]);
    setOpening(false);
  };

  // option
  const renderOption = ({ title, value }: Option, index: number) => (
    <Box
      color={colors.text.gray}
      _hover={{ color: colors.text.black }}
      cursor="pointer"
      onClick={() => handleSelect(index)}
      textAlign="center"
      userSelect="none"
      key={title}
    >
      <Text>{title}</Text>
    </Box>
  );

  const Options = <Stack>{options.map(renderOption)}</Stack>;

  return (
    <Popover
      placement="bottom-end"
      size="sm"
      variant="menu"
      isOpen={opening}
      onClose={() => setOpening(false)}
    >
      <PopoverTrigger>{triggerNode}</PopoverTrigger>
      <Portal>
        <PopoverContent maxWidth="200px" _focus={{ boxShadow: 'none' }} paddingY={0}>
          <PopoverArrow />
          <PopoverBody>{Options}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default NSelect;
