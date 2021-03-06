import React, { FC } from 'react';
import { Box, Button, Center, Flex, Input, Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Card = styled.div`
  width: 880px;
  height: 600px;
  background: #ffffff;
  border-radius: 4px;
  margin: auto;
`;

const CardContent = styled.div`
  padding: 0 20px;
`;

const CardItem = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #e9e9f0;
`;

const CardHead = styled(CardItem)`
  font-size: 16px;
  color: #191a24;
  font-weight: 600;
  padding: 14px 20px;
`;

const Label = styled(Box)`
  font-size: 14px;
  font-weight: 400;
  color: #858999;
  width: 240px;
`;

const StyleInput = styled(Input)`
  border: none;
  height: 20px;
  &:focus {
    border: none;
    box-shadow: none;
  }
`;
const StyledTextarea = styled(Textarea)`
  border: none;
  &:focus {
    border: none;
    box-shadow: none;
  }
`;

const Create: FC = () => {
  return (
    <Box paddingBottom="148px" paddingTop="20px">
      <Card>
        <CardHead>创建作品</CardHead>
        <CardContent>
          <CardItem>
            <Flex>
              <Label>所属作品集：</Label>
              <Box flex="1">
                <StyleInput placeholder="请输入名称(50个字符之内)" />
              </Box>
            </Flex>
          </CardItem>
          <CardItem>
            <Flex>
              <Label>名称：：</Label>
              <Box flex="1">
                <StyleInput placeholder="尺寸350*350" />
              </Box>
            </Flex>
          </CardItem>
          <CardItem>
            <Flex>
              <Label>图片：</Label>
              <Box flex="1">
                <StyleInput placeholder="尺寸350*350" />
              </Box>
            </Flex>
          </CardItem>
          <CardItem>
            <Flex>
              <Label>外部链接：</Label>
              <Box flex="1">
                <StyleInput placeholder="关于资产介绍的外部信息链接" />
              </Box>
            </Flex>
          </CardItem>
          <CardItem>
            <Flex>
              <Label>介绍：</Label>
              <Box flex="1">
                <StyledTextarea placeholder="请输入描述(200字之内）" />
              </Box>
            </Flex>
          </CardItem>
          <Center mt="20px">
            <Button colorScheme="blue">保存</Button>
          </Center>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Create;
