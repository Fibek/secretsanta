import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Snow from './Snow.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import Dashboard from './Dashboard.jsx';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useState } from 'react';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <ChakraProvider>
      <Snow />
      {!isregister && <LoginForm />}
      {isregister && !user ? <LoginForm /> : <LoginForm />}
    </ChakraProvider>
  )
};
