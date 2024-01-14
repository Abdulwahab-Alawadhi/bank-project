import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deposit, getTransactions, myUser, withdraw } from "../api/auth";
import dayjs from "dayjs";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedTransactions, setSortedTransactions] = useState([]);

  const dayjs = require("dayjs");

  //const formattedTimestamp = getCurrentFormattedTimestamp();
  const { mutate: performTransaction, isLoading: isTransactionLoading } =
    useMutation({
      mutationFn: (amount) =>
        transactionType === "deposit" ? deposit(amount) : withdraw(amount),
      mutationKey: ["transactions"],
      onSuccess: () => {
        refetchTransactions();
        refechUser();
      },
    });

  const { data: profileData, refetch: refechUser } = useQuery({
    queryFn: myUser,
    queryKey: ["profile"],
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Bank Account Transactions</h2>
      <div className="mb-4">
        Total Balance: ${profileData?.balance?.toFixed(2)}
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <th className="px-4 py-2">
                Date & Time{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    toggleSortDirection();
                    setSortedTransactions(sortedAndFilteredTransactions);
                  }}
                >
                  {sortDirection === "asc" ? "▲" : "▼"}
                </span>
              </th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredTransactions.map((transaction) => (
              <tr key={transaction} className="border-b">
                <td className="px-4 py-2">{transaction.type}</td>
                <td className="px-4 py-2">{transaction.to}</td>
                <td className="px-4 py-2">
                  {dayjs(transaction.createdAt).format("YYYY-MM-DD HH:mm")}
                </td>
                <td
                  className={`px-4 py-2 ${
                    transaction.type === "withdraw" ||
                    transaction.type === "transfer"
                      ? "text-red-500"
                      : "text-green-500"
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
