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
  Image,
  Link,
} from "@chakra-ui/react";

import { ReactNode, ReactElement } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import { m_NormalTextColor, m_SectionHeadingColor } from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { AiOutlineTwitter, AiOutlineArrowRight } from "react-icons/ai";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Heading
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        color={m_SectionHeadingColor}
        lineHeight={"110%"}
      >
        {title}
      </Heading>
      <Text
        color={m_NormalTextColor}
        fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
      >
        {text}
      </Text>
    </Stack>
    // </Box>
  );
};

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

export default function About() {
  return (
    <Container maxW={"5xl"} p={2}>
      <Image
        src={"./banner3.png"}
        alt="Elections"
        filter="auto"
        saturate="60%"
        opacity={0.45}
        // width={"200px"}
      />
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={m_NormalTextColor}
        >
          Democratizing AI{" "}
          <Text as={"span"} color={m_SectionHeadingColor}>
            through Solana Blockchain
          </Text>
        </Heading>
        {/* <Box p={2}> */}
        <Text
          fontSize={{ base: "lg", sm: "lg", md: "xl" }}
          textColor={m_NormalTextColor}
        >
          Decentralized provision of AI servers ensuring transparency, efficiency, security and social good.
        </Text>
      </Stack>
    </Container>
  );
}
