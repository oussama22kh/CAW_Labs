import React, { useEffect, useState } from "react";
import { getTransactions } from "../../pocketbaseService"; // Import the fetch function
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement
);

export default function Reports() {
  const [chartData, setChartData] = useState(null);
  const [categoryData, setCategoryData] = useState(null); // For Pie chart data
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await getTransactions();

        // Ensure transactions is an array
        if (!Array.isArray(transactions)) {
          throw new Error("Fetched data is not an array");
        }

        const allMonths = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const yearlyData = {};

        const categoryExpenseData = {}; // For Pie chart

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date); // Parse the date
          const year = date.getFullYear();
          const month = allMonths[date.getMonth()];
          const type = transaction.type.toLowerCase(); // "income" or "expense"
          const amount = parseFloat(transaction.amount || 0);
          const category = transaction.category; // Get the category

          if (!yearlyData[year]) {
            yearlyData[year] = {};
            allMonths.forEach((monthName) => {
              yearlyData[year][monthName] = { income: 0, expense: 0 };
            });
          }

          // Add income/expense data to yearlyData
          if (type === "income") {
            yearlyData[year][month].income += amount;
          } else if (type === "expense") {
            yearlyData[year][month].expense += amount;

            // Add to categoryExpenseData for Pie chart (expenses only)
            if (year === selectedYear && category) {
              if (!categoryExpenseData[category]) {
                categoryExpenseData[category] = 0;
              }
              categoryExpenseData[category] += amount;
            }
          }
        });

        setAvailableYears(Object.keys(yearlyData).sort((a, b) => b - a));
        if (yearlyData[selectedYear]) {
          const incomeData = allMonths.map(
            (month) => yearlyData[selectedYear][month]?.income || 0
          );
          const expenseData = allMonths.map(
            (month) => yearlyData[selectedYear][month]?.expense || 0
          );

          setChartData({
            labels: allMonths,
            datasets: [
              {
                label: "Income",
                data: incomeData,
                backgroundColor: "#97FEED",
              },
              {
                label: "Expenses",
                data: expenseData,
                backgroundColor: "#F95454",
              },
            ],
          });
          const pieChartData = {
            labels: Object.keys(categoryExpenseData),
            datasets: [
              {
                data: Object.values(categoryExpenseData),
                backgroundColor: [
                  "#FF6384", // Red
                  "#36A2EB", // Blue
                  "#FFCE56", // Yellow
                  "#4CAF50", // Green
                  "#FF5733", // Orange
                ],
              },
            ],
          };
          setCategoryData(pieChartData);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true, // Enable the title
        text: "Monthly Income vs. Expenses", // Set the title text
        font: {
          size: 18, // Set font size
          weight: "bold", // Set font weight
        },
        color: "#071952", // Set font color
        padding: { top: 10, bottom: 20 }, // Add spacing
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#071952",
          font: { size: 14 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (Dzd)",
          color: "#071952",
          font: { size: 14 },
        },
        beginAtZero: true,
      },
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true, // Enable the title
        text: "Category-wise expense distribution", // Set the title text
        font: {
          size: 18, // Set font size
          weight: "bold", // Set font weight
        },
        color: "#071952", // Set font color
        padding: { top: 10, bottom: 20 }, // Add spacing
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: $${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <h1 className="text-[36px] text-[#0B666A] font-semibold my-[100px]">
        Reports
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <label
          className="text-lg font-medium text-[#071952]"
          htmlFor="year-select"
        >
          Select Year:
        </label>
        <select
          id="year-select"
          className="p-2 border rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex  w-full h-[500px] gap-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-[60%]">
          {chartData ? (
            <Bar data={chartData} options={options} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-[40%]">
          {categoryData ? (
            <Pie data={categoryData} options={pieOptions} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
}
