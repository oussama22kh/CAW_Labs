import inc from "/increase.png";
import bln from "/balance.png";
import { useState, useEffect } from "react";
import { getTransactions } from "../../pocketbaseService";
import Reports from "./Reports"
export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      // Assume this fetches your transactions
      const response = await getTransactions();
      setTransactions(response);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    // Calculate totals whenever transactions change
    const calculateTotals = () => {
      const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const balance = totalIncome - totalExpenses;

      setTotals({ totalIncome, totalExpenses, balance });
    };

    calculateTotals();
  }, [transactions]);

  return (
    <div className="flex flex-col">
      <h1 className=" text-[36px] text-[#0B666A] font-semibold">Home</h1>
      <div className="mt-[100px] flex w-full h-[200px] gap-[50px]">
        <div className="relative  flex flex-col  px-[50px] py-[30px] bg-[#35A29F] w-full h-full rounded-2xl  overflow-hidden group shadow-xl ">
          <h1 className="z-10 text-[28px] text-white font-semibold mb-5">
            Total Income
          </h1>
          <h1 className="z-10 text-[36px] text-white font-semibold">
            {totals.totalIncome} DZD
          </h1>
          <div
            className="absolute opacity-20 top-[-50px] right-5 w-[200px] h-[200px] bg-no-repeat bg-contain transform rotate-[192deg] translate-x-[20%] translate-y-[20%] transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-[200deg]"
            style={{ backgroundImage: `url(${inc})` }}
          ></div>
        </div>
        <div className=" relative flex flex-col  px-[50px] py-[30px] bg-[#F95454] w-full h-full rounded-2xl  overflow-hidden group shadow-xl ">
          <div
            className="absolute opacity-20 bottom-5 right-5 w-[200px] h-[200px] bg-no-repeat bg-contain transform rotate-12 translate-x-[20%]  translate-y-[20%] transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-[20deg] "
            style={{ backgroundImage: `url(${inc})` }}
          ></div>
          <h1 className="z-10 text-[28px] text-white font-semibold mb-5">
            Total Expenses
          </h1>
          <h1 className="z-10 text-[36px] text-white font-semibold">
            {totals.totalExpenses} DZD
          </h1>
        </div>
        <div className="relative  flex flex-col  px-[50px] py-[30px] bg-[#77CDFF] w-full h-full rounded-2xl overflow-hidden group shadow-xl">
          <div
            className="absolute opacity-20 bottom-10 right-10 w-[180px] h-[180px] bg-no-repeat bg-contain transform rotate-12 translate-x-[20%] translate-y-[20%] transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-[20deg]"
            style={{ backgroundImage: `url(${bln})` }}
          ></div>
          <h1 className="z-10 text-[28px] text-white font-semibold mb-5">
            Balance
          </h1>
          <h1 className="z-10 text-[36px] text-white font-semibold">
            {totals.balance} DZD
          </h1>
        </div>
      </div>
      <Reports></Reports>
    </div>
  );
}
