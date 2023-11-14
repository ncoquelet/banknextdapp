import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export default function Header() {
  return (
    <Flex>
      <Box>
        <h1>Mini jobs Dapp</h1>
      </Box>
      <Spacer />
      <Box>
        <Link color="teal.500" href="home">
          Home
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link color="teal.500" href="addjob">
          Add Job
        </Link>
      </Box>
      <Spacer />
      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  );
}
