import React from 'react';
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import Card from '../../../components/card';

const HistoryEventCard = () => {
  return (
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
  );
};

export default HistoryEventCard;
