import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Snow from './Snow.jsx';
import LoginForm from './LoginForm.jsx';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <ChakraProvider>
      <Snow />
      {!user ? <LoginForm /> : <LoginForm user={user} />}
    </ChakraProvider>
  )
};
