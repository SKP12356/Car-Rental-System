import React, { useContext } from "react";
import { CarContext } from "../store/carStore";

const Dashboard = () => {
  const { userType, cars, bookCars, history, myCars } = useContext(CarContext);

  let totalSpendings = 0;
  let totalCars = 0;
  let totalMyCars = 0;
  let totalBookCars = 0;
  let totalMyBookCars = 0;

  history?.map((his) => {
    totalSpendings = totalSpendings + his.amount;
  });

  myCars?.map(() => {
    totalMyCars++;
  });

  cars?.map(() => {
    totalCars++;
  });

  bookCars?.map((car) => {
    if (car.bookId.status === "unavailable") {
      totalBookCars++;
    }
  });

  myCars?.map((car) => {
    if (car.status === "unavailable") {
      totalMyBookCars++;
    }
  });

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1 p-6 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
            <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
              {userType === "user" ? "User Account" : "Host Account"}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-600 font-medium">
                  {userType === "user" ? "Available Vehicles" : "My Vehicles"}
                </h3>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mt-4 text-blue-800">
                {/* {totalCars} */}
                {userType === "user" ? `${totalCars}` : `${totalMyCars}`}
              </p>
              <p className="text-sm text-blue-500 mt-2">Total count</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-600 font-medium">
                  {userType === "user" ? "Active Bookings" : "Approved Rentals"}
                </h3>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mt-4 text-green-800">
                {/* {totalBookCars} */}
                {userType === "user"
                  ? `${totalBookCars}`
                  : `${totalMyBookCars}`}
              </p>
              <p className="text-sm text-green-500 mt-2">Current status</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-600 font-medium">
                  {userType === "user" ? "Total Spends" : "Total Revenue"}
                </h3>
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mt-4 text-purple-800">
                ₹{totalSpendings}
              </p>
              <p className="text-sm text-purple-500 mt-2">Total amount</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Activity
              </h3>
              {/* <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </button> */}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center py-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      New booking confirmed
                    </p>
                    {/* <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      2 hours ago
                    </span> */}
                  </div>
                  {userType === "user" ? (
                    <div className="mt-1">
                      {bookCars.map(
                        (car, index) =>
                          car.bookId.status === "unavailable" && (
                            <p key={index} className="text-sm text-gray-500">
                              {car.bookId.make} {car.bookId.model}
                            </p>
                          )
                      )}
                    </div>
                  ) : (
                    <div className="mt-1">
                      {bookCars.map(
                        (car, index) =>
                          car.bookId?.status === "unavailable" && (
                            <p key={index} className="text-sm text-gray-500">
                              {car.bookId?.make} {car.bookId?.model}
                            </p>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center py-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      Vehicle returned
                    </p>
                    {/* <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      5 hours ago
                    </span> */}
                  </div>
                  {userType === "user" ? (
                    <div className="mt-1">
                      {bookCars.map(
                        (car, index) =>
                          car.bookId.status === "available" && (
                            <p key={index} className="text-sm text-gray-500">
                              {car.bookId.make} {car.bookId.model}
                            </p>
                          )
                      )}
                    </div>
                  ) : (
                    <div className="mt-1">
                      {bookCars.map(
                        (car, index) =>
                          car.bookId?.status === "available" && (
                            <p key={index} className="text-sm text-gray-500">
                              {car.bookId.make} {car.bookId.model}
                            </p>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
