import React from "react";
import BankLogo from "../assets/bank_logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <img src={BankLogo} alt="Bank Logo" className="h-8" />
      </div>
      <div className="flex gap-4">
        <NavLink
          to="/register"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </NavLink>
        <NavLink
          to="/transactions"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          transactions
        </NavLink>
        <NavLink
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button 3
        </NavLink>
        <NavLink
          to="/profile"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Profile
        </NavLink>
        <NavLink
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
