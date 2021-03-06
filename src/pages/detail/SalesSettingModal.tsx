import React, { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Checkbox,
  Radio,
  RadioGroup,
  Heading,
} from '@chakra-ui/react';
import NFormControl from '../../components/formControl';
import colors from '../../themes/colors';

export interface SalesSettingModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const SalesSettingModal: FC<SalesSettingModalProps> = ({ open, onConfirm, onClose }) => {
  return (
    <Modal isOpen={open} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h3" size="md">
            Modal Title
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={6}>
          <Stack spacing={8}>
            <NFormControl title="price" subtitle="price.subtitle">
              <InputGroup size="sm">
                <Input placeholder="price" type="number" height="auto" />
                <InputRightAddon children="suffix" height="auto" />
              </InputGroup>
            </NFormControl>
            <NFormControl title="expiration" subtitle="expiration.subtitle">
              <Checkbox color={colors.text.gray} defaultIsChecked>
                expiration date
              </Checkbox>
            </NFormControl>
            <NFormControl title="category" subtitle="category.subtitle" direction="vertical">
              <RadioGroup color={colors.text.gray}>
                <Stack direction="row" spacing={6}>
                  <Radio value="1">First</Radio>
                  <Radio value="2">Second</Radio>
                  <Radio value="3">Third</Radio>
                  <Radio value="4">Fourth</Radio>
                </Stack>
              </RadioGroup>
            </NFormControl>
            <NFormControl title="pledge" subtitle="pledge.subtitle">
              <InputGroup size="sm">
                <Input placeholder="price" type="number" height="auto" />
                <InputRightAddon children="suffix" height="auto" />
              </InputGroup>
            </NFormControl>
          </Stack>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="center">
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SalesSettingModal;
