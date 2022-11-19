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
import {
  Link as ReactRouterLink
} from "react-router-dom";

export default LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // Meteor.loginWithPassword(values.username,values.password);
    }
  });

  return( 
    <Flex align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Hasło</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Zaloguj
            </Button>
	
	    <Link>
	      Nie masz jeszcze konta? Zarejestruj się tutaj.
	    </Link>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
