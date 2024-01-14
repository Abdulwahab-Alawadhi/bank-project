import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => login(userInfo),
    mutationKey: [`login`],
    onSuccess: () => {
      setUser(true);
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="w-full max-w-md px-8 py-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-3xl text-white font-bold mb-8 text-center">
          Login
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
