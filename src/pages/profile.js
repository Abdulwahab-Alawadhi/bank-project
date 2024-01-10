import React, { useState, useEffect } from "react";
import { myUser } from "../api/auth";

const Profile = () => {
  const [user, setUser] = useState("");
  const [userImage, setUserImage] = useState(""); // State for user image URL
  const [newUsername, setNewUsername] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await myUser();
        setUser(data.username);
        setUserImage(data.image); // Update the state with the image URL
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUsernameChange = () => {
    setEditing(!editing);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditing(false); // Hide the text field when Enter is pressed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-semibold mb-4">Profile Page</h1>

        {/* User Image */}
        {userImage && (
          <img
            src={userImage}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <h2 className="text-lg mb-4">{user}</h2>
        {editing ? (
          <div>
            <input
              type="text"
              placeholder="Enter new username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoFocus
            />
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleUsernameChange}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Username
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => console.log("Change Password Clicked")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
