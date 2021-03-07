import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  Stack,
  Heading,
  Container,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import Card from '../../components/card';
import colors from '../../themes/colors';
import ImageCard from './ImageCard';
import Meta from './Meta';

import bgSrc from '../../assets/background-demo.jpeg';

export interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const data = {
  name: '',
  type: '',
  owner: '',
  count: 1,
  price: 1,
};

const PurchaseModal: FC<PurchaseModalProps> = ({ open, onClose, onConfirm }) => {
  const item = (
    <Container>
      <Stack direction="row" justifyContent="space-between">
        <Flex flex={2} align="center">
          <ImageCard src={bgSrc} />
        </Flex>
        <Stack flex={2} justifyContent="space-between">
          <Flex flex={1}>
            <Text color={colors.text.gray}>category</Text>
          </Flex>
          <Flex flex={2}>
            <Heading as="h4" size="md">
              title
            </Heading>
          </Flex>
          <Flex flex={1} align="flex-end">
            <Meta
              description="Owned by"
              who="Who"
              fontSize="0.75rem"
              cursor="text"
              userSelect="auto"
              whoProps={{ color: colors.text.gray }}
            />
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );

  const itemCard = (
    <Card backgroundColor={colors.bg.light2}>
      <Stack>
        <Flex color={colors.text.gray} align="center">
          <Flex flex={4}>
            <Text>item</Text>
          </Flex>
          <Flex flex={2}>count</Flex>
          <Flex flex={1} justify="flex-end">
            price
          </Flex>
        </Flex>
        <Flex align="center">
          <Flex flex={4}>{item}</Flex>
          <Flex flex={2}>count</Flex>
          <Flex flex={1} justify="flex-end">
            <Text color={colors.primary}>price</Text>
          </Flex>
        </Flex>
      </Stack>
    </Card>
  );

  return (
    <Modal isOpen={open} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h3" size="md">
            Modal Title
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Box paddingX={6} marginTop={-3}>
          <Text color={colors.text.gray}>Sub title</Text>
        </Box>
        <ModalBody>{itemCard}</ModalBody>

        <ModalFooter display="flex" justifyContent="center">
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PurchaseModal;
