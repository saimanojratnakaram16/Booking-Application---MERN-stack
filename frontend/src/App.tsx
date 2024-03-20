import React from "react";
import { createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

function App() {

  const {isLoggedIn} = useAppContext();

  const router = createBrowserRouter([{
    element: <Layout/>,
   children: [
    {
      path: "/",
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
      path: "/search",
      element:  <Search/>,
    },
    {
      path: '/add-hotel',
      element: isLoggedIn ? <AddHotel /> : <Navigate to="/signIn" />,
    },
    {
      path: '/my-hotels',
      element: isLoggedIn ? <MyHotels /> : <Navigate to="/signIn" />,
    },
    {
      path: '/edit-hotel/:hotelId',
      element: isLoggedIn ? <EditHotel/> : <Navigate to="/signIn"/>,
    },
    {
      path: "*",
      element: <Navigate to="/"/>,
    }
  ]
}]);
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
   
  );
}

export default App
