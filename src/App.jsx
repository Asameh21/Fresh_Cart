import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CategoriesContextProvider from "./Context/CategoriesContext";
import Checkout from "./components/Checkout/Checkout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetCode from "./components/ResetCode/ResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import WishlistContextProvider from "./Context/WishlistContext";
import WishList from "./components/WishList/WishList";

let y = new QueryClient();

function App() {
  let x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "productDetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "resetCode", element: <ResetCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "login", element: <Login /> },
        { path: "signout", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <WishlistContextProvider>
        <UserContextProvider>
          <CounterContextProvider>
            <QueryClientProvider client={y}>
              <CartContextProvider>
                <CategoriesContextProvider>
                  <RouterProvider router={x}></RouterProvider>
                  <Toaster />
                </CategoriesContextProvider>
              </CartContextProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </CounterContextProvider>
        </UserContextProvider>
      </WishlistContextProvider>
    </>
  );
}

export default App;
