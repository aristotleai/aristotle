import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { m_BigCardColour, m_AppBgColor, m_BigCardTextColour, m_NormalTextColor, m_SectionHeadingColor } from "../Constants";

const ServersGridItem: React.FC<{
  server: any
}> = ({
  server
}) => {
    return (
      <Center px={5} py={6}>
      <Box
        maxW={'660px'}
        bg={m_BigCardColour}
        opacity={0.8}
        boxShadow={'3xl'}
        rounded={'xl'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          py={6}
          color={m_BigCardTextColour}
          align={'center'}>
            <Text
            fontSize={'md'}>
            Server Provider
          </Text>
          <Text
            fontSize={'md'}>
            {server.provider_name.length >= 25 ? server.provider_name.substring(0, 25)+'...' : server.provider_name}
          </Text>
          <Divider mb={2} borderColor={"black"}/>
          <Stack direction={'row'} align={'center'} justify={'center'} px={6} pt={6}>
            <Text fontSize={'3xl'} color={m_SectionHeadingColor}>$</Text>
            <Text fontSize={'6xl'} fontWeight={800} color={m_SectionHeadingColor}>
              {server.usage_fee/10000}
            </Text>
            <Text color={m_BigCardTextColour}>/hour</Text>
          </Stack>
        </Stack>

        <Box bg={m_BigCardColour} px={6} py={6} textAlign={"left"}>
          <List spacing={3}>
            <ListItem color={m_BigCardTextColour} fontSize={'md'}>
              {server.num_cores} Cores
            </ListItem>
            <ListItem color={m_BigCardTextColour} fontSize={'md'}>
              {server.memory} GB RAM
            </ListItem>
            <ListItem color={m_BigCardTextColour} fontSize={'md'}>
              {server.bandwidth_gbps} GBPS Network
            </ListItem>
          </List>

          <Button
            mt={10}
            w={'full'}
            bg={m_AppBgColor}
            color={m_SectionHeadingColor}
            rounded={'xl'}
            _hover={{
              bg: m_AppBgColor,
            }}
            _focus={{
              bg: m_AppBgColor,
            }}>
            {server.is_available ? "Available" : "In Use"}
          </Button>
        </Box>
      </Box>
    </Center>
    )
}

export default ServersGridItem;