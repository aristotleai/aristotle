import React, { FC, ReactNode, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, SimpleGrid, Stack, Text, Container, Flex } from "@chakra-ui/react";
import ServersGridItem from "./ServersGridItem";
import { m_NormalTextColor, m_SectionHeadingColor, m_CardBgColor } from "../Constants";
import { ToastContainer, toast } from "react-toastify";
import {
    Heading,
    Button,
    Image,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    useColorModeValue,
    Link,
    Select
} from '@chakra-ui/react';
import {
    createServer,
  } from "../api/api";

const ListServer: React.FC<{
    bearer: string;
    guestBearer: string;
    loginKey: string;
}> = ({
    bearer,
    guestBearer,
    loginKey
}) => {
    const navigate = useNavigate();
    const notifySuccess = () => {
        toast.success('🦄Server Created!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const notifyFailure = () => {
        toast.error('Server Creation Failed! Please try again after some time!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            progress: undefined,
        });
    }

    const [serverCode, setServerCode] = useState("");
    const [memoryGB, setMemoryGB] = useState(0);
    const [numCores, setNumCores] = useState(0);
    const [bandwidthGbps, setBandwidthGbps] = useState(0);
    const [usageFee, setUsageFee] = useState(0);

    const possibleMemoryGB = [1, 2, 4, 8, 16];
    const possibleNumCores = [1, 2, 4, 8, 16];
    const possibleBandwidthGbps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15];

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if(bearer === "" || serverCode === "" || memoryGB === 0 || numCores === 0 || bandwidthGbps === 0 || usageFee === 0) {
            return;
        }
        console.log("Submitting server creation request", serverCode, memoryGB, numCores, bandwidthGbps, usageFee);
        createServer(bearer, serverCode, memoryGB, numCores, bandwidthGbps, usageFee, true)
        .then((response: any) => {
            notifySuccess();
            navigate("/servers");
        }
        ).catch((err: any) => {
            console.error(err);
            notifyFailure();
        });
    }

    return (
        <Container maxW={"5xl"} p={2} pt={{base: 10, sm: 20}}>
        <Flex
        align={'center'}
        justify={'center'}>
          <Box
            rounded={'lg'}
            bg={"white"}
            opacity={0.75}
            boxShadow={'lg'}
            p={8}
            maxW={"660px"}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "xl", sm: "xl", md: "4xl" }}
                    lineHeight={"110%"}
                    color={m_SectionHeadingColor}
                    pt={5}>
                    List your Server
                </Heading>
                <Text
                    fontSize={{ base: "lg", sm: "lg", md: "lg" }}
                    pt={5}>
                    Provide your server details to list it on Aristotle AI.
                </Text>
            <Stack spacing={4} pt={10}>
                <Text textAlign={"start"}>Unique Server Code</Text>
                <Input type="text" value={serverCode} onChange={(event) => setServerCode(event.target.value)} />
                <HStack>
                <Box>
                    <Select placeholder="Select Memory (GB)" onChange={(event) => setMemoryGB(parseInt(event.target.value))}>
                        {possibleMemoryGB.map((memory) => (
                            <option value={memory}>{memory}</option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    <Select placeholder="Select Bandwidth (Gbps)" onChange={(event) => setBandwidthGbps(parseInt(event.target.value))}>
                        {possibleBandwidthGbps.map((bandwidth) => (
                            <option value={bandwidth}>{bandwidth}</option>
                        ))}
                    </Select>
                </Box>
              </HStack>
              <Select placeholder="Select Number of Cores" onChange={(event) => setNumCores(parseInt(event.target.value))}>
                {possibleNumCores.map((cores) => (
                    <option value={cores}>{cores}</option>
                ))}
                </Select>
              <Text pt={2} textAlign={"start"}>Usage Fee (bps per hour)</Text>
                <Input type="number" onChange={(event) => setUsageFee(parseInt(event.target.value))} />
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={m_SectionHeadingColor}
                  color={'white'}
                  _hover={{
                    bg: m_SectionHeadingColor,
                  }}
                    onClick={handleSubmit}>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
      </Flex>
      </Container>
    );
};

export default ListServer;