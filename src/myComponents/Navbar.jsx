import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaPlus, FaHome, FaBook } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/actions/authActions";

const Navbar = () => {
  const user = useSelector(
    (state) =>
      state.auth.user || JSON.parse(localStorage.getItem("storyCraftUser"))
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    let confirmation = confirm(
      "Do you really want to go? Your story isn't over yet. 😢💔"
    );
    if (confirmation) {
      signOut(auth).then(() => {
        dispatch(logout());
      });
    } else {
      return;
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <Flex
        justify="space-between"
        alignItems="center"
        py={3}
        display={{ base: "none", md: "flex" }}
      >
        <NavLink to="/">
          {/* <Heading
            fontSize="3xl"
            p={2}
            fontWeight="bold"
            _hover={{ color: "inherit" }}
          >
            StoryCraft
          </Heading> */}

          <Heading
            fontSize="3xl"
            fontWeight="bold"
            p={2}
            color="red.500"
            transition="all 0.3s ease-in-out"
            _hover={{ color: "red.600" }}
            textShadow="2px 2px 4px rgba(0,0,0,0.3)"
          >
            Story
            <Text as="span" color="black">
              Craft
            </Text>
          </Heading>
        </NavLink>
        <Flex justify="space-evenly" w={{ base: "full", md: "50%", lg: "30%" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to={"/ongoingStories"}>Stories</NavLink>
          <NavLink to={"/createStory"}>
            <Flex align="center" gap={1}>
              <FaPlus /> Create Story
            </Flex>
          </NavLink>
          {user ? (
            <NavLink onClick={handleLogout} align="center" gap={1}>
              <Flex align="center" gap={1}>
                <IoPerson /> Logout
              </Flex>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <Flex align="center" gap={1}>
                <IoPerson /> Login
              </Flex>
            </NavLink>
          )}
        </Flex>
      </Flex>

      {/* Mobile Navbar */}
      <Flex
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
        bg="white"
        boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
        p={3}
        zIndex={1}
        justify="space-around"
        alignItems="center"
        display={{ base: "flex", md: "none" }}
      >
        <NavLink to="/">
          <Button aria-label="Home" fontSize="xl">
            <FaHome />
          </Button>
        </NavLink>
        <NavLink to={"/ongoingStories"}>
          <Button aria-label="Stories" fontSize="xl">
            <FaBook />
          </Button>
        </NavLink>
        <NavLink to={"/createStory"}>
          <Button aria-label="Create Story" fontSize="xl">
            <FaPlus />
          </Button>
        </NavLink>
        <NavLink to="/login">
          <Button aria-label="Login" fontSize="xl">
            <IoPerson />
          </Button>
        </NavLink>
      </Flex>
    </>
  );
};

export default Navbar;
