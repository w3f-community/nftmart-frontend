import React from "react";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import NavLink from "../navlink";

export default function Header() {
  return (
    <Flex as="header" flex={1} justify="space-between" backgroundColor="white">
      <Container
        py={4}
        maxW={1200}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex justify="center" mr={8}>
          <Text>
            {/* <img /> */}
            NFT Mark
          </Text>
        </Flex>

        <Flex flex="1 1 auto">
          <NavLink />
        </Flex>

        <Box justifyContent="flex-end">
          <Button>A</Button>
        </Box>
      </Container>
    </Flex>
  );
}
