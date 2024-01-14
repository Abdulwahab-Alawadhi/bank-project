import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllUsers, transferMoney } from "../api/auth";
import { BASE_URL } from "../api";

const Transfer = () => {
  const [query, setQuery] = useState("");

  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { mutate } = useMutation({
    mutationKey: ["transfer"],
    mutationFn: ({ amount, username }) => transferMoney(amount, username),
    onSuccess: () => {
      refetch();
    },
  });

  const transferMoney_ = (username) => {
    const amount = parseFloat(prompt("Enter amount to add:"));
    if (amount > 0) {
      mutate({ amount, username });
    }
  };
  console.log(users);
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w w-full px-6 py-8 bg-grey-900 rounded-md shadow-lg">
        <h2 className="text-5xl text-white font-semibold mb-6">
          Transfer to Users
        </h2>
        <center>
          <input
            type="search"
            id="form1"
            className="form-control w-1/2 mx-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 gap-10"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </center>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {users

            ?.filter((user) =>
              user.username.toLowerCase().includes(query.toLowerCase())
            )
            .map((user) => (
              <div
                key={user._id}
                className="bg-gray-700 p-6 rounded-md shadow flex flex-col items-center justify-center"
              >
                <img
                  src={`${BASE_URL}/${user.image}`}
                  alt="User"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <div className="text-white text-lg mb-2">
                  ${user.balance.toFixed(2)}
                </div>
                <button
                  onClick={() => transferMoney_(user.username)}
                  className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                  Transfer
                </button>
                <div className="text-center mt-3">
                  <h3 className="text-lg text-white font-semibold mb-1">
                    {user.name}
                  </h3>
                  <p className="text-gray-300">{user.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
