import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/register";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Transactions from "./pages/transactions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import Transfer from "./pages/transfer";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/transfers",
        element: <Transfer />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
]);
//Transactions
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
