import React, { FC } from 'react';
import { Box, Button, Heading, Stack, Flex, Text } from '@chakra-ui/react';
import Card from '../../../components/card';
import colors from '../../../themes/colors';
import Meta from '../Meta';

export interface InnerCardProps {
  price: number | string;
  onPurchase: () => void;
}

const InnerCard: FC<InnerCardProps> = ({ price, onPurchase }) => (
  <Card
    title={
      <Box>
        <Text color={colors.text.gray}>当前价格</Text>
        <Button
          variant="primary"
          width="180px"
          height="50px"
          float="right"
          onClick={() => onPurchase()}
        >
          立即购买
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
  onPurchase: () => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ name, onPurchase }) => {
  return (
    <Card title={<Text color={colors.primary}>NFTbox [ICON]</Text>} noHeadBorder>
      <Stack>
        <Flex justify="space-between" align="flex-end">
          <Heading size="lg">{name}</Heading>
          <Meta description="Owned by" who="vrlandlord" />
        </Flex>
        <InnerCard
          price="12"
          onPurchase={onPurchase}
        ></InnerCard>
      </Stack>
    </Card>
  );
};

export default PurchaseCard;
