import {
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Box,
    Center,
    Card,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import { m_AppBgColor, m_CardBgColor, m_CardHeadingColor, m_CardTextColor, m_NormalTextColor, m_SectionHeadingColor } from "../Constants";
import { m } from 'framer-motion';

  export default function Rewards() {
    return (
    <Center maxW={"5xl"} p={2} textAlign={"left"} flexDirection={"column"} py={20}>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        bg={m_AppBgColor}
        my={5}
        opacity={0.9}
        overflow='hidden'
        variant={"elevated"}
        >
        <Image
            objectFit={"contain"}
            maxW={'200px'}
            p={{base: 5, sm: 10}}
            bg={m_CardBgColor}
            opacity={0.8}
            src={"./transparency.png"}
            alt='Caffe Latte'
        />
        <Stack direction={{ base: 'column', md: 'row' }} pt={{base: 0}}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
                <Heading fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                <Text color={m_NormalTextColor} as={'span'}>
                    Transparency
                </Text>{' '}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={m_NormalTextColor}>
                    All transactions, listings and accounts are public and verifiable on the Solana blockchain. No more black box algorithms!
                </Text>
            </Stack>
            </Flex>
        </Stack>
        </Card>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        bg={m_AppBgColor}
        my={5}
        opacity={0.9}
        overflow='hidden'
        variant={"elevated"}
        >
        <Stack direction={{ base: 'column', md: 'row' }} pt={{base: 0}}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
                <Heading fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                <Text color={m_NormalTextColor} as={'span'}>
                    Fair Allocation
                </Text>{' '}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={m_NormalTextColor}>
                    Optimal server allocation is determined by requirements and available resources, completely verifiable on chain.
                </Text>
            </Stack>
            </Flex>
        </Stack>
        <Image
            objectFit={"contain"}
            maxW={'200px'}
            p={{base: 5, sm: 10}}
            bg={m_CardBgColor}
            opacity={0.8}
            src={"./fair.png"}
            alt='Caffe Latte'
        />
        </Card>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        bg={m_AppBgColor}
        opacity={0.9}
        overflow='hidden'
        variant={"elevated"}
        >
        <Image
            objectFit={"contain"}
            maxW={'200px'}
            p={{base: 5, sm: 10}}
            bg={m_CardBgColor}
            opacity={0.8}
            src={"./shield.png"}
            alt='Caffe Latte'
        />
        <Stack direction={{ base: 'column', md: 'row' }} pt={{base: 0}}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
                <Heading fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                <Text color={m_NormalTextColor} as={'span'}>
                    Security
                </Text>{' '}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={m_NormalTextColor}>
                Only encrypted data and model is stored. Security of funds is guaranteed by the smart contract governing the escrow account.
                </Text>
            </Stack>
            </Flex>
        </Stack>
        </Card>
        <Box
        maxW={"4xl"}
        pos="relative"
        boxShadow={m_CardBgColor}
        p={{ base: 4, sm: 8 }}
        my={5}
        overflow="hidden"
        rounded="lg">
        <Text fontSize={{ base: 'md', lg: 'lg' }} color={m_NormalTextColor} textAlign={"center"}>
            Break free from the limitations of centralized systems, and step into a world where AI training is more accessible, transparent, and collaborative.
        </Text>
        </Box>
      </Center>
    );
  }