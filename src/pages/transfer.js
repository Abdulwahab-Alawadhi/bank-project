import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllUsers, transferMoney } from "../api/auth";
import { BASE_URL } from "../api";

const Transfer = () => {
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

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w w-full px-6 py-8 bg-grey-900 rounded-md shadow-lg">
        <h2 className="text-5xl text-white font-semibold mb-6">
          Transfer to Users
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <div
              key={user.id}
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
