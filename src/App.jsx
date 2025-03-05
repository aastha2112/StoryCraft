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

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/createStory" element={<CreateStory />} />
        <Route path="/ongoingStories" element={<OnGoingStories />} />
        <Route path="/contribute" element={<WriteContribution />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </>
  );
};

export default App;
