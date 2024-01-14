import React, { useState, useEffect } from "react";
import { myUser } from "../api/auth";
import { BASE_URL } from "../api";
import { NavLink } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

const Profile = () => {
  const [user, setUser] = useState("");
  const [userImage, setUserImage] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await myUser();
        setUser(data.username);
        setUserImage(data.image);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUsernameChange = () => {
    setEditing(!editing);
  };

  const handleImageChange = (e) => {};

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="md:flex bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex-shrink-0">
            <img
              src={`${BASE_URL}/${userImage}`}
              alt="User Avatar"
              className="h-48 w-full object-cover md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Profile
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {user}
            </h1>

            <button
              onClick={handleImageChange}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change Image
            </button>

            <button
              onClick={handleUsernameChange}
              className="mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change Username
            </button>

            {/* Change Password NavLink */}
            <NavLink className="mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Change Password
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
