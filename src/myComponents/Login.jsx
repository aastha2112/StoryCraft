import {
  Box,
  Flex,
  Button,
  VStack,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginPng from "../assets/images/login.png";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { loginFailure, loginSuccess } from "@/redux/actions/authActions";

const MotionBox = motion.create(Box);

const Login = () => {
  const [emailBox, setEmailBox] = useState(true);
  const [googleBox, setGoogleBox] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSignUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(loginSuccess(user));
        navigate("/");
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };

  const handleLoginWithEmail = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        dispatch(loginSuccess(userCredential.user));
        navigate("/");
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justifyContent={{ base: "center", lg: "space-between" }}
      alignItems="center"
      justifySelf={"center"}
      w="full"
      minH="100vh"
      px={{ base: 2, md: 8 }}
      bg="#fffbf5"
    >
      {/* Image */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        w={{ base: "full", md: "auto" }}
        textAlign="center"
      >
        <Image
          src={loginPng}
          h={{ base: "30vh", md: "35vh", lg: "60vh" }}
          mb={{ base: 4, lg: 0 }}
          mx="auto"
        />
      </MotionBox>

      {/* Login Box */}
      <VStack
        w={{ base: "full", md: "80%", lg: "45%" }}
        p={6}
        marginX={"auto"}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        textAlign="center"
        minH={{ base: "40vh", md: "auto" }}
      >
        <Flex
          gap={4}
          w="full"
          justifyContent="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Button
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
            onClick={() => {
              setEmailBox(true);
              setGoogleBox(false);
            }}
          >
            Login with Email
          </Button>
          <Button
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            onClick={() => {
              handleSignUpWithGoogle();
              setGoogleBox(true);
              setEmailBox(false);
            }}
          >
            Login with Google
          </Button>
        </Flex>

        {emailBox && (
          <VStack w="full" spacing={4} mt={4}>
            <Input
              type="email"
              placeholder="Email"
              required
              value={userEmail}
              onChange={(e) => setuserEmail(e.target.value)}
              bg="gray.100"
            />
            <Input
              type="password"
              placeholder="Password"
              required
              value={userPassword}
              onChange={(e) => setuserPassword(e.target.value)}
              bg="gray.100"
            />
            <Button
              w="full"
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              onClick={handleLoginWithEmail}
            >
              Login
            </Button>
          </VStack>
        )}

        <Text mt={4}>
          Don't have an account?{" "}
          <Button
            variant="link"
            color={"blue.500"}
            p={0}
            onClick={() => navigate("/signup")}
          >
            Sign up here.
          </Button>
        </Text>
      </VStack>
    </Flex>
  );
};

export default Login;
