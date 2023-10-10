import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Divider,
  Avatar,
  Heading,
  Badge
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { m_BigCardColour, m_AppBgColor, m_BigCardTextColour, m_NormalTextColor, m_SectionHeadingColor } from "../Constants";

const JobsGridItem: React.FC<{
  job: any
}> = ({
  job
}) => {
    return (
        <Center py={6} px={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          opacity={0.7}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={'./banner3.png'}
            mb={4}
            pos={'relative'}
          />
          <Heading pt={2} fontSize={'2xl'} fontFamily={'body'} color={m_SectionHeadingColor}>
            {job.job_name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {job.job_code}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            {job.description}
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {job.req_cores} Cores
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {job.req_memory} GB RAM
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
                {job.req_bandwidth} GBPS Network
            </Badge>
          </Stack>

          <Text
            textAlign={"start"}
            color={useColorModeValue('gray.700', 'gray.400')}
            pt={5}>
            Time Requirement: {job.req_server_time} Hours
          </Text>

          <Text fontWeight={600} color={'gray.500'} pt={2} textAlign={"start"}>
            Listed by: {job.taker_name}
          </Text>

          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={m_SectionHeadingColor}
              color={'white'}
              _focus={{
                bg: m_SectionHeadingColor,
              }}>
              {job.is_open ? "Open" : "Closed"}
            </Button>
          </Stack>
        </Box>
      </Center>
    )
}

export default JobsGridItem;