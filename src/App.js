import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
