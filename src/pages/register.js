import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const { mutate } = useMutation({
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-green-500">
      <div className="w-full max-w-md px-8 py-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-3xl text-white font-bold mb-8 text-center">
          Register
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white text-sm font-medium mb-2"
            >
              New Username
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
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-white text-sm font-medium mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
