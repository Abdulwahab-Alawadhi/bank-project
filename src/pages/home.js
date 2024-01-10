// Import React and the logo image
import React from "react";
import Navbar from "../components/Navbar";

//import BankLogo from "./assets/bank-logo.png";

const Home = () => {
  return (
    <div className="bg-red-600 h-screen">
      {/* The rest of your homepage content goes here */}
      <div className="text-white text-center mt-10">
        <h1 className="text-4xl font-bold">Welcome to Our Fictional Bank</h1>
        <p className="mt-5">Your trusted partner in financial success.</p>
      </div>
    </div>
  );
};

export default Home;