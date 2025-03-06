import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text, VStack, Flex } from "@chakra-ui/react";

const FinishedStories = () => {
  const stories = useSelector((state) => state.story.stories || {});
  const navigate = useNavigate();

  const finishedStories = Object.entries(stories).filter(
    ([, story]) => story.contributions?.length >= 10
  );

  return (
    <VStack spacing={6} p={6} w={{ base: "full", md: "80%" }} mx="auto">
      <Heading color="red.500" mb={3}>
        Finished Stories
      </Heading>
      {finishedStories.length > 0 ? (
        finishedStories.map(([id, story]) => (
          <Box
            key={id}
            p={6}
            w="full"
            bg="gray.50"
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
          >
            <Heading as="h2" fontSize="xl" color="blue.500">
              {story.title}
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Created by: {story.createdBy}
            </Text>
            {/* 
            
            */}

            <VStack align="start">
              {story.contributions?.slice(0, 1).map((contribution, index) => (
                <Text key={index} fontSize="md" color="gray.800">
                  {contribution.sentence}
                </Text>
              ))}
            </VStack>
            {/*  */}
            {/* <Text fontSize="md" mb={4}>
              {story.contributions.map((c) => c.sentence).join(" ")}
            </Text> */}
            <Flex gap={4} justifyContent="center">
              <Button
                bg="red.500"
                mt={3}
                color="white"
                _hover={{ bg: "red.600" }}
                onClick={() => navigate(`/read`, { state: { story, id } })}
              >
                Read Story
              </Button>
            </Flex>
          </Box>
        ))
      ) : (
        <Text fontSize="lg" color="gray.600">
          No finished stories yet.
        </Text>
      )}
    </VStack>
  );
};

export default FinishedStories;
