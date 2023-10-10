import React, { FC, ReactNode, useMemo, useState, useEffect } from "react";
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
    createJob,
    findServerForJob
  } from "../api/api";

const UseServer: React.FC<{
    bearer: string;
    guestBearer: string;
    loginKey: string;
}> = ({
    bearer,
    guestBearer,
    loginKey
}) => {
    const notifySuccess = () => {
        toast.success('Job Created!', {
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
        toast.error('Job Creation Failed! Please try again after some time!', {
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

    const [jobCode, setJobCode] = useState("");
    const [jobName, setJobName] = useState("");
    const [description, setDescription] = useState("");
    const [reqMemory, setReqMemory] = useState(0);
    const [reqCores, setReqCores] = useState(0);
    const [reqBandwidth, setReqBandwidth] = useState(0);
    const [reqServerTime, setReqServerTime] = useState(0);
    const [serverDetails, setServerDetails] = useState({} as any);

    const possibleMemoryGB = [1, 2, 4, 8, 16];
    const possibleNumCores = [1, 2, 4, 8, 16];
    const possibleBandwidthGbps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15];


    const handleSubmit = (event: any) => {
        event.preventDefault();
        if(bearer === "" || jobCode === "" || jobName === "" || description === "" || reqMemory === 0 || reqCores === 0 || reqBandwidth === 0 || reqServerTime === 0) {
            return;
        }
        createJob(bearer, jobCode, jobName, description, "", reqMemory, reqCores, reqBandwidth, reqServerTime)
        .then((response: any) => {
            console.log(response.data.job_code)
            notifySuccess();
            findServerForJob(bearer, response.data.job_code)
            .then((response: any) => {
                console.log(response.data)
                setServerDetails(response.data);
            }
            ).catch((err: any) => {
                console.error(err);
                notifyFailure();
            });
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
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            maxW={"660px"}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "xl", sm: "xl", md: "4xl" }}
                    lineHeight={"110%"}
                    color={m_SectionHeadingColor}
                    pt={5}>
                    List Job Details
                </Heading>
                <Text
                    fontSize={{ base: "lg", sm: "lg", md: "lg" }}
                    pt={5}>
                    Find an optimal server based on your AI requirements
                </Text>
            <Stack spacing={4} pt={10}>
                <Text textAlign={"start"}>Unique Job Code</Text>
                <Input type="text" value={jobCode} onChange={(event) => setJobCode(event.target.value)} />
                <Text textAlign={"start"}>AI Job Name</Text>
                <Input type="text" value={jobName} onChange={(event) => setJobName(event.target.value)} />
                <Text textAlign={"start"}>Description</Text>
                <Input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
                <HStack>
                <Box>
                    <Select placeholder="Select Memory (GB)" onChange={(event) => setReqMemory(parseInt(event.target.value))}>
                        {possibleMemoryGB.map((memory) => (
                            <option value={memory}>{memory}</option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    <Select placeholder="Select Bandwidth (Gbps)" onChange={(event) => setReqBandwidth(parseInt(event.target.value))}>
                        {possibleBandwidthGbps.map((bandwidth) => (
                            <option value={bandwidth}>{bandwidth}</option>
                        ))}
                    </Select>
                </Box>
              </HStack>
              <Select placeholder="Select Number of Cores" onChange={(event) => setReqCores(parseInt(event.target.value))}>
                {possibleNumCores.map((cores) => (
                    <option value={cores}>{cores}</option>
                ))}
                </Select>
              <Text pt={2} textAlign={"start"}>Required Server Time (hours)</Text>
                <Input type="number" onChange={(event) => setReqServerTime(parseInt(event.target.value))} />
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

export default UseServer;