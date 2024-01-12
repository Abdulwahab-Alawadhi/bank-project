import { useMutation, useQuery } from "@tanstack/react-query";

import React, { useState, useEffect } from "react";
import { deposit, getTransactions, myUser, withdraw } from "../api/auth";

const Transactions = () => {
  const { mutate: getDeposit } = useMutation({
    mutationFn: (amount) => deposit(amount),
    mutationKey: [`transactions`],
    onSuccess: () => {
      refetchTransactions();
      refechUser();
    },
  });

  const { mutate: getWithdraw } = useMutation({
    mutationFn: (amount) => withdraw(amount),
    mutationKey: [`transactions`],
    onSuccess: () => {
      refetchTransactions();
      refechUser();
    },
  });

  const { data: profileData, refetch: refechUser } = useQuery({
    queryFn: () => myUser(),
    queryKey: [`profile`],
  });

  const { data: transactions, refetch: refetchTransactions } = useQuery({
    queryFn: () => getTransactions(),
    queryKey: [`transactions`],
  });
  const handleWithdraw = () => {
    const amount = parseFloat(prompt("Enter amount to withdraw:"));
    if (amount > 0) {
      getWithdraw(amount);
    }
  };

  const handleAddMoney = () => {
    const amount = parseFloat(prompt("Enter amount to add:"));
    if (amount > 0) {
      getDeposit(amount);
    }
  };

  console.log(transactions);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bank Account Transactions</h2>
      <div> Total Balance: ${profileData?.balance?.toFixed(2)}</div>
      <div className="flex justify-cen">
        <button className="btn btn-error" onClick={handleWithdraw}>
          Withdraw
        </button>
        <button className="btn btn-success" onClick={handleAddMoney}>
          Add Money
        </button>
      </div>

      <table
        style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Description</th>
            <th>Amount</th>
            {/* <th>Balance</th> */}
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>{transaction.to}</td>
              <td
                style={{
                  color: transaction?.type === "withdraw" ? "tomato" : "green",
                }}
              >
                $ {transaction.amount?.toFixed(2)}
              </td>
              {/* <td>$ {profileData.balance?.toFixed(2)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
