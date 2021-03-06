import React, { FC, useState } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

import Alert from './Alert';

import HistoryEventCard from './HisotryEventCard';
import PriceHistoryCard from './PriceHistoryCard';

import PurchaseCard from './PurchaseCard';
import DetailContainer from './DetailContainer';
import ImageCard from './ImageCard';
import IntroCard from './IntroCard';
import MetaCard from './MetaCard';
import AboutCard from './AboutCard';

import bgSrc from '../../assets/background-demo.jpeg';
import colors from '../../themes/colors';
import PurchaseModal from './PurchaseModal';

const data = {
  collection_id: 0,
  category_id: -1,
  name: '饕餮史蒂芬',
  picture: '史蒂芬史蒂芬是否第三方',
  metadata: '元数据',
  external_links: '外部链接说明',
  describe:
    'NFTmart 主链上的NFT资产，将兼容主流的 NFT 协议。每个账号都可以创建属于自己的NFT资产，为了方便每个账号创建不同系列的 NFT 资产，每个账号还可以创建“集合”',
  status: 0,
  address: '0x12541254189999',
};

const Detail: FC = () => {
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const handlePurchaseClose = () => {
    setPurchaseOpen(false);
  };

  const handlePurchaseConfirm = () => {
    //
  };

  return (
    <Box>
      <Alert />
      <DetailContainer
        left={
          <>
            <ImageCard src={bgSrc} />
            <IntroCard description={data.describe} />
            <MetaCard metadata={data.metadata} />
            <AboutCard about={data.address} />
          </>
        }
        right={
          <>
            <PurchaseCard name={data.name} onPurchase={() => setPurchaseOpen(true)} />
            <PriceHistoryCard />
            <HistoryEventCard />
          </>
        }
      />

      <PurchaseModal open={purchaseOpen} onClose={handlePurchaseClose} onConfirm={handlePurchaseConfirm} />
    </Box>
  );
};

export default Detail;
