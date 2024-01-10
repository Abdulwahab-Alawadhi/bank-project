import React, { useContext } from "react";
import BankLogo from "../assets/bank_logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { deleteToken } from "../api/storage";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <img src={BankLogo} alt="Bank Logo" className="h-8" />
      </div>
      <div className="flex gap-4">
        {user == true ? (
          <>
            <NavLink
              to="/profile"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Profile
            </NavLink>
            <NavLink
              to="/transactions"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Transactions
            </NavLink>
            <NavLink
              to="/transfers"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tranfer Money
            </NavLink>
            <NavLink
              to="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                deleteToken();
                setUser(false);
              }}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
