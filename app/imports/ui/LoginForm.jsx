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
import { Accounts } from 'meteor/accounts-base';

export default LoginForm = () => {
  const [isregister, setisregister] = useState(false);

  const loginformik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      Meteor.loginWithPassword(values.username,values.password);
    }
  });

  const registerformik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password2:""
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      Accounts.createUser({username: values.username,password: values.password}); 
    }
  });

  const Login = () => (
    <>
      <form onSubmit={loginformik.handleSubmit}>
        <VStack spacing={4} align="flex-start">
	  <FormControl>
      	    <FormLabel htmlFor="text">Nazwa użytkownika</FormLabel>
      	    <Input
      	      id="username"
      	      name="username"
      	      type="text"
      	      variant="filled"
      	      onChange={registerformik.handleChange}
      	      value={loginformik.values.email}
      	    />
      	  </FormControl>
      	  <FormControl>
      	    <FormLabel htmlFor="password">Hasło</FormLabel>
      	    <Input
      	      id="password"
      	      name="password"
      	      type="password"
      	      variant="filled"
      	      onChange={registerformik.handleChange}
      	      value={loginformik.values.password}
      	    />
      	  </FormControl>
      	  <Button type="submit" colorScheme="purple" width="full">
      	    Zaloguj
      	  </Button>
      	  <Button onClick={() => setisregister(true)}>
      	    Nie masz jeszcze konta? Zarejestruj się tutaj.
      	  </Button>
        </VStack>
      </form>
    </>
  );
  
  const Register = () => (
    <>
      <form onSubmit={registerformik.handleSubmit}>
        <VStack spacing={4} align="flex-start">
	  <FormControl>
      	    <FormLabel htmlFor="email">Email</FormLabel>
      	    <Input
      	      id="email"
      	      name="email"
      	      type="email"
      	      variant="filled"
      	      onChange={registerformik.handleChange}
      	      value={registerformik.values.email}
      	    />
      	  </FormControl>
      	  <FormControl>
      	    <FormLabel htmlFor="password">Hasło</FormLabel>
      	    <Input
      	      id="password"
      	      name="password"
      	      type="password"
      	      variant="filled"
      	      onChange={registerformik.handleChange}
      	      value={registerformik.values.password}
      	    />
      	  </FormControl>
      	  <FormControl>
      	    <FormLabel htmlFor="password">Hasło</FormLabel>
      	    <Input
      	      id="password2"
      	      name="password2"
      	      type="password"
      	      variant="filled"
      	      onChange={registerformik.handleChange}
      	      value={registerformik.values.password2}
      	    />
      	  </FormControl>
      	  <Button type="submit" colorScheme="purple" width="full" onClick={() => setisregister(false)}>
      	    Zarejestruj
      	  </Button>
        </VStack>
      </form>
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
