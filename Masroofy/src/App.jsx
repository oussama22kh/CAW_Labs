// src/App.jsx
import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import home from "/home.png";
import add from "/addition.png";
import transaction from "/transaction.png";
import analytics from "/analytics.png";
import AddTransaction from "./Components/AddTransaction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "./Components/Transactions";
import { pb } from "../pocketbaseService";
const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(pb.authStore.isValid);

  useEffect(() => {
    const checkAuth = () => {
       // Log current auth state
      setisAuthenticated(pb.authStore.isValid);
    };
    checkAuth();
  }, []);
  return (
    <>
      <div className="flex min-h-screen font-sans">
        {/* Sidebar */}
        {isAuthenticated && (
          <aside className="w-[300px]  bg-[#0B666A] text-white  min-h-screen flex flex-col items-center px-[10px]  py-[50px] shadow-xl">
            <h1 className="text-3xl font-bold mb-[100px]">MA$ROOFY</h1>
            <nav className="flex flex-col gap-[50px] w-full items-center ">
              <Link
                to="/"
                className="hover:bg-[#35A29F] py-4  rounded-lg w-full px-[20px] flex gap-[20px]"
              >
                <img src={home} className="w-[25px] h-[25px]" alt="" />
                <h1 className="text-[18px]">Home</h1>
              </Link>
              <Link
                to="/add-transaction"
                className="hover:bg-[#35A29F] py-4  rounded-lg w-full px-[20px] flex gap-[20px]"
              >
                <img src={add} className="w-[25px] h-[25px]" alt="" />
                <h1 className="text-[18px]">Add Transaction</h1>
              </Link>
              <Link
                to="/transactions"
                className="hover:bg-[#35A29F] py-4  rounded-lg w-full px-[20px] flex gap-[20px]"
              >
                <img src={transaction} className="w-[25px] h-[25px]" alt="" />
                <h1 className="text-[18px]">Transactions</h1>
              </Link>
              <Link
                to="/reports"
                className="hover:bg-[#35A29F] py-4  rounded-lg w-full px-[20px] flex gap-[20px]"
              >
                <img src={analytics} className="w-[25px] h-[25px]" alt="" />
                <h1 className="text-[18px]">Reports</h1>
              </Link>
              <Link
                to="/"
                className="hover:bg-[#35A29F] py-4  rounded-lg  px-[20px] flex "
              >
                <h1 className="text-[18px]">Log out</h1>
              </Link>
            </nav>
          </aside>
        )}

        {/* Page Content */}
        <main className=" flex-1 py-[40px] px-[60px]">
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
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
