import React, { FC } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HTMLChakraProps,
  SimpleGrid,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AspectRatio,
  Image,
} from '@chakra-ui/react';

import Alert from './Alert';
import PriceHistoryChart from './PriceHistoryChart';

import colors from '../../themes/colors';

import bgSrc from '../../assets/background-demo.jpeg';

const CardHead: FC<HTMLChakraProps<'div'>> = ({ children, ...restProps }) => (
  <Box paddingX={4}>
    <Box paddingY={4}>
      <Heading as="h4" size="md" color={colors.text.black}>
        {children}
      </Heading>
    </Box>
  </Box>
);

const CardBody: FC<HTMLChakraProps<'div'>> = ({ children, ...restProps }) => (
  <Box paddingX={4}>
    <Box paddingY={4}>{children}</Box>
  </Box>
);

export interface CardProps {
  title?: React.ReactNode;
  body?: React.ReactNode;
  noHeadBorder?: boolean;
}

const Card: FC<Omit<HTMLChakraProps<'div'>, 'title'> & CardProps> = ({
  title,
  noHeadBorder = false,
  body,
  children,
  ...restProps
}) => {
  return (
    <Box borderRadius="3px" backgroundColor="white" padding={0} {...restProps}>
      {title && <CardHead>{title}</CardHead>}
      {title && !noHeadBorder && <Divider borderColor={colors.divider.dark} />}
      {body || <CardBody>{children}</CardBody>}
    </Box>
  );
};

export interface CardMetaProps {
  avatar?: string;
  description?: string;
  who?: string;
}

const Meta: FC<CardMetaProps> = ({ avatar, description, who }) => (
  <Stack direction="row" alignItems="center" cursor="pointer" userSelect="none">
    <Avatar width={6} height={6} src={avatar} /> <Text color={colors.text.gray}>{description}</Text>
    <Text as="span" color={colors.primary}>
      {who}
    </Text>
  </Stack>
);

export interface PurchaseCardProps {
  price: number | string;
  onPurchase: () => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ price, onPurchase }) => (
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
  return (
    <Box>
      <Alert />
      <Container>
        <SimpleGrid templateColumns="466px auto" spacing={4} paddingY={6}>
          <Stack spacing={4}>
            <Box borderRadius="3px">
              {/* <AspectRatio maxHeight="666px" ratio={1}> */}
              <Image borderRadius="3px" maxHeight="666px" src={bgSrc} objectFit="cover" />
              {/* </AspectRatio> */}
            </Box>
            <Card title="介绍">
              <Stack>
                <Text color={colors.text.black}>{data.describe}</Text>
              </Stack>
            </Card>

            <Card title="元数据">
              <Stack>
                <Meta description="Created by" who="Cook" />
                <Text color="#4d5058">{data.metadata}</Text>
              </Stack>
            </Card>

            <Card title="关于集合名称">NFTBoxes are a curated monthly box of NFTs...</Card>
          </Stack>

          <Stack spacing={4}>
            <Card title={<Text color={colors.primary}>NFTbox ICON</Text>} noHeadBorder>
              <Stack>
                <Flex justify="space-between" align="flex-end">
                  <Heading size="lg">{data.name}</Heading>
                  <Meta description="Owned by" who="vrlandlord" />
                </Flex>
                <PurchaseCard
                  price="12"
                  onPurchase={() => {
                    //
                  }}
                ></PurchaseCard>
              </Stack>
            </Card>

            <Card title="历史成交价">
              <PriceHistoryChart />
            </Card>

            <Card
              title="历史事件"
              body={
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>事件</Th>
                      <Th isNumeric>价格</Th>
                      <Th>来源</Th>
                      <Th>目标</Th>
                      <Th isNumeric>时间</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Create</Td>
                      <Td isNumeric>187,12</Td>
                      <Td>未知</Td>
                      <Td>目标</Td>
                      <Td isNumeric>2021-02-12 14:23:45</Td>
                    </Tr>

                    <Tr>
                      <Td>Create</Td>
                      <Td isNumeric>187,12</Td>
                      <Td>未知</Td>
                      <Td>目标</Td>
                      <Td isNumeric>2021-02-12 14:23:45</Td>
                    </Tr>
                    <Tr>
                      <Td>Create</Td>
                      <Td isNumeric>187,12</Td>
                      <Td>未知</Td>
                      <Td>目标</Td>
                      <Td isNumeric>2021-02-12 14:23:45</Td>
                    </Tr>
                  </Tbody>
                </Table>
              }
            />
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Detail;
