import {
    chakra,
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from '@chakra-ui/react';
import { m_CardBgColor, m_NormalTextColor, m_SectionHeadingColor } from "../Constants";

const FAQs = [
    {
        question: "How do I join Aristotle AI as a server provider or a model trainer?",
        answer: "Joining Aristotle AI is easy! Just connect your Solana wallet by clicking the Connect Wallet button on the top right corner of the page. Once you have connected your wallet, you can create a server or a training job by clicking on the respective buttons on the top right corner of the page."
    },
    {
        question: "How is the pricing determined for using computational resources?",
        answer: "Pricing is dynamically determined based on supply and demand within the network. Our platform ensures competitive and fair pricing for all users. You are allocated the lowest priced server meeting your minimum requirements."
    },
    {
        question: "How does Aristotle AI ensure the security and privacy of my data?",
        answer: "Data security is paramount. All data is encrypted with the Server Provider / User Public Keys and stored. The data can only be decrypted by the requisite participant. In v2 we are coming with permissionless usage of servers, which would completely encrypt the data from every participant. Additionally, smart contracts and blockchain technology ensure transparency and integrity of all transactions within the network."
    },
    {
        question: "How does Aristotle AI ensure the security of my funds?",
        answer: "All funds are held in escrow until the job is completed and verified. The escrow is managed by a Smart Contract and is completely secure and transparent."
    },
    {
        question: "What types of computational resources can I access on AITrainChain?",
        answer: "Aristotle AI provides access to a variety of computational resources including CPU, GPU, and RAM, offered by server providers on the network. You can specify your requirements and the platform will match you with the appropriate resources.",
    },
    {
        question: "What happens if a dispute arises between a model trainer and a server provider?",
        answer: "The platform has a dispute resolution mechanism in place, guided by the terms outlined in the smart contract. Users can report disputes and the platform will facilitate resolution in a fair and transparent manner.",
    }
]

export default function FAQ() {
    return (
    <Container maxW={'5xl'} p={2} mt={24}>
        <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '3xl', md: '3xl' }}
            color={m_NormalTextColor}
            lineHeight={'110%'}>
            Frequently Asked Questions
        </Heading>
        <Accordion allowToggle pt={16} pb={28}>
            {FAQs.map((faq) => (
                <AccordionItem border={'0'}>
                    <h2>
                    <AccordionButton bgColor={m_CardBgColor} mt={5} p={3} rounded={5}>
                        <Box as="span" flex='1' textAlign='left'>
                            <Text ml={3} fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }} color={m_NormalTextColor}>{faq.question}</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <Text textAlign={'left'} fontSize={'lg'} color={m_NormalTextColor}>
                        {faq.answer}
                    </Text>
                    </AccordionPanel>
                </AccordionItem>
            ))
            }
        </Accordion>
    </Container>
    );
  }