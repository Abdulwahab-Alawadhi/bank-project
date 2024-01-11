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
  const handleWithdraw = () => {
    const amount = parseFloat(prompt("Enter amount to withdraw:"));
    if (amount > 0) {
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
        description: "Withdrawal",
        amount: -amount,
        balance: transactions[transactions.length - 1].balance - amount,
      };
      setTransactions([...transactions, newTransaction]);
    }
  };
  const handleAddMoney = () => {
    const amount = parseFloat(prompt("Enter amount to add:"));
    if (amount > 0) {
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
        description: "Deposit",
        amount: amount,
        balance: transactions[transactions.length - 1].balance + amount,
      };
      setTransactions([...transactions, newTransaction]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bank Account Transactions</h2>
      <div className="display flex">
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
