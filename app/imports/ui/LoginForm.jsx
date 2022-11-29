import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react'
import { Formik, Field, useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";
import { Accounts } from 'meteor/accounts-base';

export default LoginForm = () => {
  const [isregister, setisregister] = useState(false);

  const Register = () => (
    <>
      <Formik
        initialValues={{
          email:    "",
	  name:     "",
          password: ""
        }}
        onSubmit={(values) => {
	  Accounts.createUser({email: values.email, password: values.password, profile:{name: values.name}},
	    error => {
	      if(!error)
		setisregister(false);
	    }
	  );
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor='email'>Adres email</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Imię</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  variant="filled"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Hasło</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  validate={(value) => {
                    let error;

                    if (value.length < 5) {
                      error = "Hasło musi zawierać conajmniej 5 znaków";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" >
                Zarejestruj
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </>
  );
  
  const Login = () => (
    <>
       <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
	  Meteor.loginWithPassword(values.email,values.password);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor='email'>Adres email</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Hasło</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                Zaloguj
              </Button>
              <Button onClick={() => setisregister(true) }>
		Nie masz jeszcze konta? Zarejestruj się tutaj! 
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </>
  );


  return( 
    <Flex align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
	{isregister ? <Register/> : <Login/> }
      </Box>
    </Flex>
  );
};
