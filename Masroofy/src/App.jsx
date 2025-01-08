// src/App.jsx
import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./Components/Home";
import home from "/home.png";
import add from "/addition.png";
import transaction from "/transaction.png";
import analytics from "/analytics.png";
import user from "/user.png";
import download from "/download.png";

import AddTransaction from "./Components/AddTransaction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "./Components/Transactions";
import { pb } from "../pocketbaseService";
import { useLocation } from "react-router-dom";
import Reports from "./Components/Reports";
import ExportData from "./Components/ExportData";
const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(pb.authStore.isValid);
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation(); // Hook to get the current route
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = () => {
      // Log current auth state
      setisAuthenticated(pb.authStore.isValid);
      console.log(isAuthenticated);
    };
    checkAuth();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    pb.authStore.clear();
    navigate("/auth");
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const getLinkClasses = (path) =>
    location.pathname === path
      ? "bg-[#35A29F] text-white py-4 rounded-lg w-full px-[20px] flex gap-[20px]"
      : "hover:bg-[#97FEED]  hover:text-[#071952]  py-4 rounded-lg w-full px-[20px] flex gap-[20px]";

  return (
    <>
      <div className="flex min-h-screen font-sans">
        {/* Sidebar */}
        {isAuthenticated && (
          <aside className="fixed top-0 left-0 w-[300px] bg-[#0B666A] text-white h-full flex flex-col items-center px-[10px] py-[50px] shadow-xl">
            <h1 className="text-[36px] font-bold mb-[100px]">MA$ROOFY</h1>
            <div className="h-full flex flex-col justify-between">
              <nav className="flex flex-col gap-[50px] w-full items-center ">
                <Link to="/" className={getLinkClasses("/")}>
                  <img src={home} className="w-[25px] h-[25px]" alt="" />
                  <h1 className="text-[18px]">Home</h1>
                </Link>
                <Link
                  to="/add-transaction"
                  className={getLinkClasses("/add-transaction")}
                >
                  <img src={add} className="w-[25px] h-[25px]" alt="" />
                  <h1 className="text-[18px]">Add Transaction</h1>
                </Link>
                <Link
                  to="/transactions"
                  className={getLinkClasses("/transactions")}
                >
                  <img src={transaction} className="w-[25px] h-[25px]" alt="" />
                  <h1 className="text-[18px]">Transactions</h1>
                </Link>
                <Link to="/reports" className={getLinkClasses("/reports")}>
                  <img src={analytics} className="w-[25px] h-[25px]" alt="" />
                  <h1 className="text-[18px]">Reports</h1>
                </Link>
                <Link to="/export" className={getLinkClasses("/export")}>
                  <img src={download} className="w-[25px] h-[25px]" alt="" />
                  <h1 className="text-[18px]">Export Data</h1>
                </Link>
              </nav>
              {/* User Profile Dropdown */}
              <div className="relative w-full">
                <div className={getLinkClasses("/")} onClick={toggleLogout}>
                  <img src={user} className="w-[30px] h-[30px] " alt="User" />
                  <h1 className="text-[18px] capitalize">
                    {pb.authStore?.model?.name || "User"}
                  </h1>
                </div>
                {showLogout && (
                  <button
                    className="absolute bottom-full left-0 bg-white text-[#071952] rounded-lg shadow-lg mb-2 w-full p-4 transition-all"
                    onClick={(e) => logout(e)}
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </aside>
        )}

        {/* Page Content */}
        <main className="ml-[300px] flex-1 py-[50px] px-[60px]">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
            />
            <Route
              path="/add-transaction"
              element={
                isAuthenticated ? <AddTransaction /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/transactions"
              element={
                isAuthenticated ? <Transactions /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/reports"
              element={isAuthenticated ? <Reports /> : <Navigate to="/auth" />}
            />
            <Route
              path="/export"
              element={
                isAuthenticated ? <ExportData /> : <Navigate to="/auth" />
              }
            />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
