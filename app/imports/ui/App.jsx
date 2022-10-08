import * as React from 'react';
import Snow from './Snow.jsx'
import { ChakraProvider } from '@chakra-ui/react'

export const App = () => (
  <ChakraProvider>
    <Snow />
  </ChakraProvider>
);
