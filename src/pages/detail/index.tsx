import React, { FC, useEffect, useState } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import store, { actions } from '../../stores/assets';

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
import PurchaseModal from './PurchaseModal';
import SalesSettingModal from './SalesSettingModal';
import { GetItems } from '../../api/graph';
import { toFixedDecimals } from '../../utils';

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
  const { t } = useTranslation();

  const params = useParams<{ id: string }>();

  const { data: assetsResponse } = GetItems({ id: Number(params?.id) ?? -1 });

  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  const { selectedAsset } = store.useState('selectedAsset');

  useEffect(() => {
    const assets = assetsResponse?.assets?.assets ?? [];
    if (!selectedAsset && assets[0]) {
      actions.selectAsset(assets[0]);
    }

    return () => {
      //
    };
  }, [assetsResponse]);

  if (!selectedAsset) {
    return (
      <Box height="100vh" width="100vw">
        <Center height="100%">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      </Box>
    );
  }

  // Events
  const handlePurchaseClose = () => {
    setPurchaseOpen(false);
  };

  const handlePurchaseConfirm = () => {
    //
  };

  const handleSettingClose = () => {
    setSettingOpen(false);
  };

  const handleSettingConfirm = () => {
    // TODO
  };

  const handleDestroy = () => {
    //
  };

  return (
    <Box>
      <Alert
        // onDestroy={handleDestroy}
        onSetting={() => setSettingOpen(true)}
      />

      <DetailContainer
        left={
          <>
            <ImageCard src={selectedAsset.picUrl ?? 'image placeholder'} />
            <IntroCard description={selectedAsset.describe ?? t('detail.no-description')} />
            <MetaCard metadata={selectedAsset.metadata ?? t('detail.no-metadata')} />
            <AboutCard about={undefined ?? t('detail.no-about')} />
          </>
        }
        right={
          <>
            <PurchaseCard
              name={selectedAsset.name}
              price={toFixedDecimals(selectedAsset.price, 8)}
              onPurchase={() => setPurchaseOpen(true)}
            />
            <PriceHistoryCard />
            <HistoryEventCard />
          </>
        }
      />

      <PurchaseModal
        open={purchaseOpen}
        onClose={handlePurchaseClose}
        onConfirm={handlePurchaseConfirm}
      />

      <SalesSettingModal
        open={settingOpen}
        onClose={handleSettingClose}
        onConfirm={handleSettingConfirm}
      />
    </Box>
  );
};

export default Detail;
