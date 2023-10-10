import React, { FC, ReactNode, useMemo, useState, useEffect } from "react";
import { Box, SimpleGrid, Stack, Text, Container, Flex } from "@chakra-ui/react";
import JobsGridItem from "./JobsGridItem";
import { m_NormalTextColor, m_SectionHeadingColor, m_CardBgColor } from "../Constants";
import {
    Heading,
    Button,
    Image
} from '@chakra-ui/react';
import {
    getJobs,
  } from "../api/api";

const Jobs: React.FC<{
    bearer: string;
    guestBearer: string;
    loginKey: string;
}> = ({
    bearer,
    guestBearer,
    loginKey
}) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs(guestBearer)
          .then((response: any) => {
            if (guestBearer === "") {
              return;
            }
            const jobsFromApi = response.data.data;
            setJobs(jobsFromApi);
          })
          .catch((err: any) => {
            console.error(err);
          });
      }, [guestBearer]);

    return (
    <Container maxW={'5xl'} p={2}>
        <Container maxW={'5xl'} pt={6}>
            <Flex direction={{base: 'column', sm: 'row'}} pt={10} flexWrap={"wrap"} justifyContent={"center"}>
            {jobs ? jobs.map((job) => (
          <JobsGridItem
            job={job}
            />
            )): null}
            </Flex>
        </Container>
        </Container>
        );
};

export default Jobs;