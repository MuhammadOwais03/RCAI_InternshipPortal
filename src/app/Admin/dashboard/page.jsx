"use client"
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar"; // Assuming you have a Sidebar component
import ApexCharts from "apexcharts"; // For charts
import React, { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    // Initialize ApexCharts
    const options = {
      chart: {
        type: "bar",
        height: 350,
      },
      series: [
        {
          name: "Internships",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
        ],
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Quick Stats Cards */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Internships
                </h2>
                <p className="text-3xl font-bold text-indigo-600">120</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700">
                  Active Interns
                </h2>
                <p className="text-3xl font-bold text-green-600">85</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700">
                  Completed Internships
                </h2>
                <p className="text-3xl font-bold text-red-600">35</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Internship Progress
              </h2>
              <div id="chart"></div>
            </div>

            {/* Additional Content */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700">
                Recent Activities
              </h2>
              <p className="text-gray-600 mt-2">
                List of recent activities or notifications can go here.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}