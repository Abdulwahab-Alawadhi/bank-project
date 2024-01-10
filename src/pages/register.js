import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigator = useNavigate();

  const handleChange = (e) => {
    // console.log(userInfo);
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };
  const { mutate } = useMutation({
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      navigator("/login");
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();

    mutate();
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-3xl text-white font-semibold mb-6">Register</h2>
        <div>
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
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleFormSubmit}
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
