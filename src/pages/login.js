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
    console.log(userInfo);
    mutate();
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-3xl text-white font-semibold mb-6">Login</h2>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
