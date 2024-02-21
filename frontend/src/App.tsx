import React from "react";
import { createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";

function App() {

  const {isLoggedIn} = useAppContext();

  const router = createBrowserRouter([{
    path:"/",
    element: <Layout/>,
   children: [
    {
      index:true,
      element: <Home/>,
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
      path: '/add-hotel',
      element: isLoggedIn ? <AddHotel /> : <Navigate to="/signIn" />,
    },
  ]
}]);
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
   
  );
}

export default App
