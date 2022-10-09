import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Snow from './Snow.jsx';
import LoginForm from './LoginForm.jsx';

export const App = () => (
  <ChakraProvider>
    <Snow />
    <LoginForm />
  </ChakraProvider>
);
