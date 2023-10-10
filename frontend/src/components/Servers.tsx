import React, { FC, ReactNode, useMemo, useState, useEffect } from "react";
import { Box, SimpleGrid, Stack, Text, Container, Flex } from "@chakra-ui/react";
import ServersGridItem from "./ServersGridItem";
import { m_NormalTextColor, m_SectionHeadingColor, m_CardBgColor } from "../Constants";
import {
    Heading,
    Button,
    Image
} from '@chakra-ui/react';
import {
    getServers,
  } from "../api/api";

const Servers: React.FC<{
    bearer: string;
    guestBearer: string;
    loginKey: string;
}> = ({
    bearer,
    guestBearer,
    loginKey
}) => {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        getServers(guestBearer)
          .then((response: any) => {
            if (guestBearer === "") {
              return;
            }
            const serversFromApi = response.data.data;
            setServers(serversFromApi);
          })
          .catch((err: any) => {
            console.error(err);
          });
      }, [guestBearer]);

    return (
    <Container maxW={'5xl'} p={2}>
        <Container maxW={'5xl'} pt={6}>
            <Flex direction={{base: 'column', sm: 'row'}} pt={10} flexWrap={"wrap"} justifyContent={"center"}>
            {servers ? servers.map((server) => (
          <ServersGridItem
            server={server}
            />
            )): null}
            </Flex>
        </Container>
        </Container>
        );
};

export default Servers;