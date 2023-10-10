import { Link } from "react-router-dom";

import { m_SectionHeadingColor } from "../Constants";
import {
    Text,
    chakra,
    Flex,
    Container,
    Heading,
    Button,
    Icon,
    IconProps,
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
import React, { FC, ReactNode, useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./header";
import FAQ from "./FAQ";
import CommunityCard from "./CommunityCard";
import Rewards from "./Rewards";
import Actors from "./Actors";

import About from "./About";
const Landing: React.FC<{
    bearer: string;
    guestBearer: string;
    loginKey: string;
}> = ({
    bearer,
    guestBearer,
    loginKey
}) => {
    return (
      <Container maxW={'5xl'} p={2}>
      <About></About>
      <Rewards />
      <Actors />
      <FAQ />
      <CommunityCard />
      </Container>
      );
};

export default Landing;