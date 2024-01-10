import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions([
      {
        id: 1,
        date: "2024-01-01",
        description: "Grocery Shopping",
        amount: -50.0,
        balance: 950.0,
      },
      {
        id: 2,
        date: "2024-01-02",
        description: "Salary",
        amount: 2000.0,
        balance: 2950.0,
      },
      {
        id: 3,
        date: "2024-01-03",
        description: "Gym Membership",
        amount: -100.0,
        balance: 2850.0,
      },
    ]);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bank Account Transactions</h2>
      <table
        style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td style={{ color: transaction.amount < 0 ? "red" : "green" }}>
                ${transaction.amount.toFixed(2)}
              </td>
              <td>${transaction.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Transactions;
