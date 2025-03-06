import React from "react";
import Homepage from "./myComponents/HomePage";
import { Container, Heading } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./myComponents/SignUp";
import Navbar from "./myComponents/Navbar";
import Login from "./myComponents/Login";
import CreateStory from "./myComponents/CreateStory";
import OnGoingStories from "./myComponents/OnGoingStories";
import WriteContribution from "./myComponents/WriteContribution";
import Read from "./myComponents/Read";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(
    (state) =>
      state.auth.user || JSON.parse(localStorage.getItem("storyCraftUser"))
  );
  const author = user?.displayName || user.email;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/createStory"
          element={
            <>
              <Heading
                fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}
                px={3}
                py={6}
                fontWeight="bold"
              >
                Hello, {author}
              </Heading>
              <CreateStory />
            </>
          }
        />
        <Route
          path="/ongoingStories"
          element={
            <>
              <Heading
                fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}
                px={3}
                pt={6}
                fontWeight="bold"
              >
                Hello, {author}
              </Heading>
              <OnGoingStories />
            </>
          }
        />
        <Route path="/contribute" element={<WriteContribution />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </>
  );
};

export default App;
