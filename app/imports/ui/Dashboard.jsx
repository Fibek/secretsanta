import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react'
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Link
} from "@chakra-ui/react";

export default LoginForm = () => {

  return( 
    <Flex align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
	<Text> Dashboard </Text>
      </Box>
    </Flex>
  );
};
