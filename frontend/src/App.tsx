import React from "react";
import { createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {

  const router = createBrowserRouter([{
    path:"/",
    element: <Layout/>,
   children: [
    {
      path: "/",
      element:  <p> Home </p>,
    },
    {
      path: "/register",
      element:  <Register/>,
    },
    {
      path: "/signIn",
      element:  <SignIn/>,
    },
    {
      path: "*",
      element: <Navigate to="/"/>,
    },]
}]);
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
   
  );
}

export default App
