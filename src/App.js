import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { getToken } from "./api/storage";
import UserContext from "./context/UserContext";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser(true);
    }
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
