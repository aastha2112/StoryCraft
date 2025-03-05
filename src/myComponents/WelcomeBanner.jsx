import React from "react";
import {
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import welcomeBannerImage from "../assets/images/welcomeBannerImage.png";
import { useNavigate } from "react-router-dom";

// Motion component for animated sparkles
const MotionBox = motion.create(Box);

const WelcomeBanner = () => {
  const navigate = useNavigate();
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align="center"
      justify="center"
      h={{ base: "auto", lg: "100vh" }}
      textAlign={{ base: "center", lg: "left" }}
      px={5}
      py={20}
      gap={{ lg: "300px" }}
    >
      {/* Sparkle Animations  */}
      <MotionBox
        position="absolute"
        top={{ base: "20%", lg: "45%" }}
        left={{ base: "10%", lg: "5%" }}
        fontSize={{ base: "lg", lg: "2xl" }}
        color="yellow.400"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </MotionBox>
      <MotionBox
        position="absolute"
        top={{ base: "10%", lg: "35%" }}
        right={{ base: "15%", lg: "50%" }}
        fontSize={{ base: "xl", lg: "3xl" }}
        color="yellow.300"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </MotionBox>

      {/* Content Section */}
      <Box>
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}
          fontWeight="bold"
        >
          StoryCraft
        </Heading>
        <Text
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          fontWeight="bold"
          pt={5}
          color="#2D2E4D"
        >
          Create your{" "}
          <Text as="span" color="#FFBA26">
            story
          </Text>
        </Text>

        {/* Button for large screens only */}
        <Button
          onClick={() => navigate("/ongoingStories")}
          color={"#ec4a4a"}
          backgroundColor={"black"}
          mt={5}
          fontWeight={"bold"}
          display={{ base: "none", lg: "block" }}
        >
          Read a story
        </Button>
      </Box>

      {/* Image Section */}
      <Box>
        <Image
          src={welcomeBannerImage}
          display={{ base: "block", lg: "inline" }}
          h={{ base: "400px", md: "450px", lg: "480px" }}
          w={{ base: "250px", md: "280px", lg: "300px" }}
          mt={"20px"}
          roundedTop="3xl"
          roundedBottom={"xl"}
        />

        {/* Button for small & medium screens */}
        <Button
          color={"#ec4a4a"}
          backgroundColor={"black"}
          mt={5}
          mx={"auto"}
          fontWeight={"bold"}
          display={{ base: "block", lg: "none" }} // Show  on small screens
        >
          Read a story
        </Button>
      </Box>
    </Flex>
  );
};

export default WelcomeBanner;
