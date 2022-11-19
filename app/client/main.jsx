import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container); // createRoot(container!)

  root.render(<App />);
  // const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />
  // },
  // {
  //   path: "/register",
  //   element: <RegisterForm />
  // },
// ]);

  // root.render(
  //   <React.StrictMode>
  //     <RouterProvider router={router} />
  //   </React.StrictMode>
  // );
});
