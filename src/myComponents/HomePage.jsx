import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      <WelcomeBanner />
      <Footer />
    </>
  );
};

export default HomePage;
