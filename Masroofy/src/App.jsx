// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import home from "/home.png";
import add from "/addition.png";
import transaction from "/transaction.png";
import analytics from "/analytics.png";
import AddTransaction from "./Components/AddTransaction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "./Components/Transactions";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen font-sans">
        {/* Sidebar */}
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
          </nav>
        </aside>

        {/* Page Content */}
        <main className=" flex-1 py-[40px] px-[60px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
