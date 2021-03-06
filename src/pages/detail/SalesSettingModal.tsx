import React, { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  Button,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

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
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>content</ModalBody>

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
