import { getStory } from "@/redux/actions/storyActions";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  SimpleGrid,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FinishedStories from "./FinishedStories";

const OnGoingStories = () => {
  const navigate = useNavigate();
  const [ongoingStories, setOngoingStories] = useState(true);
  const stories = useSelector((state) => state.story.stories || []);
  const dispatch = useDispatch();
  const user = useSelector(
    (state) =>
      state.auth.user || JSON.parse(localStorage.getItem("storyCraftUser"))
  );
  const author = user.displayName || user.email;

  useEffect(() => {
    if (!user) {
      alert("You need to login first!");
      navigate("/login");
    }
    dispatch(getStory());
  }, [dispatch]);

  const handleAddContribution = (story, id) => {
    navigate("/contribute", { state: { story, id } });
  };

  const handleRead = (story, id) => {
    navigate("/read", { state: { story, id } });
  };
  return (
    <Box maxW="1200px" mx="auto" mt={5} p={5} mb={10}>
      {/* <Heading textAlign="center" mb={6} color="red.600">
        Ongoing Stories
      </Heading> */}
      <Flex
        gap={4}
        w="full"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        mb={10}
      >
        <Button
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          onClick={() => setOngoingStories(true)}
        >
          Ongoing Stories
        </Button>
        <Button
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          onClick={() => setOngoingStories(false)}
        >
          Finished Stories
        </Button>
      </Flex>

      {/*  */}
      {ongoingStories ? (
        <>
          <Heading color="red.500" mb={3} textAlign={"center"}>
            Ongoing Stories
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} gap={3}>
            {Object.entries(stories).map(([id, story]) => (
              <Box
                key={id}
                p={5}
                boxShadow="lg"
                borderRadius="3xl"
                bg="white"
                _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
              >
                <Avatar
                  name={story.createdBy || "Anonymous"}
                  size="xl"
                  bg={"blue.200"}
                  border="4px solid"
                  borderColor="blue.300"
                  mb={4}
                />
                <Heading fontSize="xl" color="red.500" mb={2}>
                  {story.title}
                </Heading>
                <Text fontSize="md" fontWeight="bold" color="gray.700">
                  Created By: {story.createdBy}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={3}>
                  {new Date(story.createdAt).toLocaleString()}
                </Text>
                <VStack align="start">
                  {story.contributions
                    ?.slice(0, 1)
                    .map((contribution, index) => (
                      <Text key={index} fontSize="md" color="gray.800">
                        {contribution.sentence}
                      </Text>
                    ))}
                </VStack>
                <Flex gap={4} mt={2}>
                  <Button
                    onClick={() => handleRead(story, id)}
                    bg="black"
                    color="white"
                    _hover={{ bg: "gray.800" }}
                  >
                    Read
                  </Button>
                  <Button
                    bg="red.500"
                    color="white"
                    _hover={{ bg: "red.600" }}
                    onClick={() => handleAddContribution(story, id)}
                  >
                    Contribute
                  </Button>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </>
      ) : (
        // this is for finished stories

        <>
          <FinishedStories />
        </>
      )}
    </Box>
  );
};

export default OnGoingStories;
