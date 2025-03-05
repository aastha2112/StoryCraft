import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Text, Heading, Textarea, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateStory } from "@/redux/actions/storyActions";

const WriteContribution = () => {
  const location = useLocation();
  const story = location.state?.story;
  const id = location.state?.id;
  const user = useSelector(
    (state) =>
      state.auth.user || JSON.parse(localStorage.getItem("storyCraftUser"))
  );
  const author = user.displayName || user.email;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showContributions, setShowContributions] = useState(false);
  const [contribution, setContribution] = useState("");
  if (!story) {
    return <Text>No story data available.</Text>;
  }

  const handleContribution = (id, story, contribution, author) => {
    if (!contribution || story.contributions.length >= 10) {
      return;
    }
    dispatch(updateStory(id, story, contribution, author));
    navigate("/ongoingStories");
  };

  return (
    <VStack
      spacing={6}
      p={6}
      mt={15}
      w={{ base: "full", md: "auto", lg: "50%" }}
    >
      <Button
        onClick={() => navigate(-1)}
        mb={5}
        fontSize="2xl"
        p={0}
        bg="black"
        color="white"
        _hover={{ bg: "red.600" }}
        alignSelf={"start"}
      >
        {"<"}
      </Button>
      <Box
        w="full"
        p={6}
        bg="gray.50"
        borderRadius="lg"
        boxShadow="md"
        mb={6}
        mt={20}
      >
        <Heading as="h2" fontSize="xl" color="red.500">
          {story.title}
        </Heading>
        <Text fontSize="md" color="gray.600">
          Created by: {story.createdBy}
        </Text>
        <Text fontSize="md" mt={4}>
          Latest Contribution:{" "}
          {story.contributions?.[story.contributions.length - 1]?.sentence ||
            "No contributions yet."}
        </Text>
      </Box>

      <Textarea
        placeholder="Write your contribution..."
        h={20}
        maxLength={150}
        mb={4}
        value={contribution}
        onChange={(e) => setContribution(e.target.value)}
      />

      <Button
        bg="red.500"
        color="white"
        _hover={{ bg: "red.600" }}
        onClick={() => handleContribution(id, story, contribution, author)}
      >
        Submit Contribution
      </Button>
      <Button
        bg="black"
        color="white"
        _hover={{ bg: "gray.800" }}
        onClick={() => setShowContributions(!showContributions)}
      >
        {showContributions ? "Hide" : "Show"} all Contributions
      </Button>

      {showContributions && (
        <>
          {story.contributions.map((contribution, index) => {
            return (
              <Text fontSize="md" mt={4} key={index}>
                {contribution.sentence}
              </Text>
            );
          })}
        </>
      )}
    </VStack>
  );
};

export default WriteContribution;
