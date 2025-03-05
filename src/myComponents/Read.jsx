import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Text, Heading, VStack } from "@chakra-ui/react";

const Read = () => {
  const location = useLocation();
  const story = location.state?.story;
  const id = location.state?.id;
  const navigate = useNavigate();

  const user = useSelector(
    (state) =>
      state.auth.user || JSON.parse(localStorage.getItem("storyCraftUser"))
  );
  const author = user?.displayName || user?.email;

  if (!story) {
    return <Text>No story data available.</Text>;
  }

  const combinedStory = story.contributions
    ? story.contributions.map((c) => c.sentence).join(" ")
    : "No contributions yet.";

  return (
    <VStack spacing={6} p={6} mt={10} w={{ base: "full", md: "60%" }}>
      <Button
        onClick={() => navigate(-1)}
        mb={5}
        fontSize="xl"
        p={3}
        bg="black"
        color="white"
        _hover={{ bg: "red.600" }}
        alignSelf="start"
      >
        {"< Back"}
      </Button>

      <Box w="full" p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" fontSize="2xl" color="red.500" textAlign="center">
          {story.title}
        </Heading>
        <Text fontSize="md" color="gray.600" textAlign="center">
          Created by: {story.createdBy}
        </Text>
      </Box>

      <Box w="full" p={6} bg="white" borderRadius="lg" boxShadow="md">
        <Text fontSize="lg" color="black" textAlign="justify" lineHeight="1.8">
          {combinedStory}
        </Text>
      </Box>

      <Button
        bg="red.500"
        color="white"
        _hover={{ bg: "red.600" }}
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </VStack>
  );
};

export default Read;
