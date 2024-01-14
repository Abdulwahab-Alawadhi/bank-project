import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deposit,
  getAllUsers,
  getTransactions,
  myUser,
  withdraw,
} from "../api/auth";
import dayjs from "dayjs";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [money, setMoney] = useState("");
  //const formattedTimestamp = getCurrentFormattedTimestamp();
  const { mutate: performTransaction, isLoading: isTransactionLoading } =
    useMutation({
      mutationFn: (amount) =>
        transactionType === "deposit" ? deposit(amount) : withdraw(amount),
      mutationKey: ["transactions"],
      onSuccess: () => {
        refetchTransactions();
        refechUser();
        refechUsers();
      },
    });
  const { data: allUsers, refetch: refechUsers } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["profile"],
  });

  const { data: profileData, refetch: refechUser } = useQuery({
    queryFn: myUser,
    queryKey: ["my use"],
  });

  const { data: transactions, refetch: refetchTransactions } = useQuery({
    queryFn: getTransactions,
    queryKey: ["transactions"],
  });

  const handleTransaction = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount > 0) {
      performTransaction(numericAmount);
      setAmount("");
    }
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedAndFilteredTransactions = [
    ...(sortedTransactions.length > 0
      ? sortedTransactions
      : transactions || []),
  ];

  sortedAndFilteredTransactions.sort((a, b) => {
    const dateA = dayjs(a.createdAt);
    const dateB = dayjs(b.createdAt);
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  function timeDate(transaction) {
    return dayjs(transaction.createdAt).format("DD/MM/YYYY  | HH:mm");
  }
  console.log(allUsers);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Bank Account Transactions</h2>
      <div className="mb-4 text-4xl flex justify-center items-center gap-7">
        Total Balance: ${profileData?.balance?.toFixed(2)}
      </div>
      <div className="gap-100">
        <center>
          <input
            type="search"
            id="form1"
            className="form-control w-1/2 mx-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 gap-10"
            placeholder="Search Date"
            onChange={(e) => setQuery(e.target.value)}
          />
        </center>
        <center>
          <input
            type="search"
            id="form1"
            className="form-control w-1/2 mx-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 gap-10"
            placeholder="Search Amount"
            onChange={(e) => setMoney(e.target.value)}
          />
        </center>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter amount"
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            setTransactionType("withdraw");
            handleTransaction();
          }}
          disabled={isTransactionLoading}
        >
          Withdraw
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            setTransactionType("deposit");
            handleTransaction();
          }}
          disabled={isTransactionLoading}
        >
          Add Money
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Transaction</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">
                Date & Time{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    toggleSortDirection();
                    setSortedTransactions(sortedAndFilteredTransactions);
                  }}
                >
                  {sortDirection === "asc" ? "▲Old" : "▼New"}
                </span>
              </th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredTransactions
              ?.filter((transaction) => timeDate(transaction).includes(query))
              .filter((transaction) =>
                transaction.amount.toString().includes(money)
              )
              .map((transaction) => (
                <tr key={transaction} className="border-b">
                  <td className="px-4 py-2">{transaction.type}</td>
                  <td className="px-4 py-2">{transaction._id}</td>
                  <td className="px-4 py-2">
                    {
                      allUsers?.find((user) => {
                        if (user._id == transaction.from) {
                          return user;
                        }
                      }).username
                    }
                  </td>
                  <td className="px-4 py-2">
                    {
                      allUsers?.find((user) => {
                        if (user._id == transaction.to) {
                          return user;
                        }
                      }).username
                    }
                  </td>
                  <td className="px-4 py-2">{timeDate(transaction)}</td>
                  <td
                    className={`px-4 py-2 ${
                      transaction.type === "deposit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {(transaction.type === "withdraw" ||
                    transaction.type === "transfer"
                      ? "-"
                      : "") + `$ ${transaction.amount?.toFixed(2)}`}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
