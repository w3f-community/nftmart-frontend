import React, { FC } from 'react';
import { Box, Button, Heading, Stack, Flex, Text } from '@chakra-ui/react';
import Card from '../../../components/card';
import colors from '../../../themes/colors';
import Meta from '../Meta';
import { t } from '../../../i18n';

export interface InnerCardProps {
  price: number | string;
  onPurchase: () => void;
}

const InnerCard: FC<InnerCardProps> = ({ price, onPurchase }) => (
  <Card
    title={
      <Box>
        <Text color={colors.text.gray}>{t('detail.current-price')}</Text>
        <Button
          variant="primary"
          width="180px"
          height="50px"
          float="right"
          onClick={() => onPurchase()}
        >
          {t('detail.purchase')}
        </Button>
      </Box>
    }
    backgroundColor="#f9f8fd"
    noHeadBorder
  >
    <Box marginTop="-1rem">
      <Heading display="inline">{price}</Heading> <Text display="inline">FEI</Text>
    </Box>
  </Card>
);

export interface PurchaseCardProps {
  name: string;
  category: string;
  price: number | string;
  owner?: string;
  onPurchase: () => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ category, name, owner, price, onPurchase }) => {
  return (
    <Card title={<Text color={colors.primary}>{category} [ICON]</Text>} noHeadBorder>
      <Stack marginTop="-1rem" spacing={4}>
        <Flex justify="space-between" align="flex-end">
          <Heading as="h2" size="lg">
            {name}
          </Heading>
          {owner && <Meta description="Owned by" who={owner} />}
        </Flex>
        <InnerCard price={price} onPurchase={onPurchase}></InnerCard>
      </Stack>
    </Card>
  );
};

export default PurchaseCard;
