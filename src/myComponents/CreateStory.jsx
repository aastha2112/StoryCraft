import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import loginPng from "../assets/images/login.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStory } from "@/redux/actions/storyActions";

const MotionBox = motion.create(Box);

const CreateStory = () => {
  const [title, setTitle] = useState("");
  const [sentence, setSentence] = useState("");
  const [storySuccess, setStorySuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state) =>
      state.auth.user || JSON.parse(localStorage.getItem("storyCraftUser"))
  );
  const author = user?.displayName || user?.email || "User";
  useEffect(() => {
    if (!user) {
      alert("You need to login first!");
      navigate("/login");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStory(title, sentence, author));
    setTitle("");
    setSentence("");
    setStorySuccess(true);
    setTimeout(() => {
      setStorySuccess(false);
    }, 3000);
  };

  return (
    <Flex
      gap={4}
      direction={{ base: "column", lg: "row" }}
      maxW={{ base: "95%", md: "800px", lg: "80%" }}
      mx="auto"
      mt={10}
      p={6}
      boxShadow="xl"
      borderRadius="lg"
      bgGradient="linear(to-r, red.50, blue.50)"
      textAlign="center"
      transition="all 0.3s ease-in-out"
      _hover={{ transform: "scale(1.02)" }}
      alignItems="center"
    >
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        w={{ base: "full", lg: "50%" }}
        textAlign="center"
      >
        <Image
          src={loginPng}
          h={{ base: "25vh", md: "35vh", lg: "60vh" }}
          mb={{ base: 4, lg: 0 }}
          mx="auto"
        />
      </MotionBox>

      <Box w={{ base: "full", lg: "40%" }}>
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          mb={4}
          color="red.700"
        >
          Create a New Story
        </Heading>
        <Text fontSize="md" color="gray.600" mb={4}>
          Share your creativity with a title and a one-sentence story!
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Input
              type="text"
              placeholder="Enter story title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              _focus={{ borderColor: "red.400", boxShadow: "outline" }}
            />

            <Textarea
              placeholder="Write your story in one sentence"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              maxLength={150}
              resize="none"
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
            />

            <Button
              type="submit"
              bg="red.500"
              color="white"
              w="full"
              fontSize="lg"
              fontWeight="bold"
              boxShadow="md"
              _hover={{ bg: "red.600" }}
              _active={{ transform: "scale(0.98)" }}
            >
              Submit Story
            </Button>
          </VStack>
        </form>
        {storySuccess && (
          <Text fontSize="md" color="red.500" mt={4}>
            Story created successfully!
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default CreateStory;
