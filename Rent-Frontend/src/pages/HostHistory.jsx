import React, { useContext, useState } from "react";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";

// const bookings = [
//   {
//     id: "BKG001",
//     car: "Hyundai Creta",
//     renter: "Amit Sharma",
//     pickupDate: "2025-04-20",
//     returnDate: "2025-04-23",
//     amount: "₹3,600",
//     status: "Completed",
//   },
//   {
//     id: "BKG002",
//     car: "Honda City",
//     renter: "Priya Verma",
//     pickupDate: "2025-04-24",
//     returnDate: "2025-04-26",
//     amount: "₹2,400",
//     status: "Ongoing",
//   },
//   {
//     id: "BKG003",
//     car: "Tata Nexon",
//     renter: "Rahul Mehta",
//     pickupDate: "2025-03-18",
//     returnDate: "2025-03-20",
//     amount: "₹2,000",
//     status: "Completed",
//   },
// ];

const HostHistory = () => {
  const { bookCars, searchHistory, searchedHistories } = useContext(CarContext);
  const [activeTab, setActiveTab] = useState("All Bookings");
  let toatalBookings = 0;

  bookCars?.map(() => {
    toatalBookings++;
  });
  const handleSearch = (event) => {
    searchHistory(event.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Booking History
          </h2>
          <p className="text-gray-600">
            Track and manage all your car rental bookings
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 ${
                  activeTab === "All Bookings"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                } rounded-lg duration-300 font-medium cursor-pointer`}
                onClick={() => setActiveTab("All Bookings")}
              >
                All Bookings
              </button>
              <button
                className={`px-4 py-2  ${
                  activeTab === "Completed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                } rounded-lg duration-300 font-medium cursor-pointer`}
                onClick={() => setActiveTab("Completed")}
              >
                Completed
              </button>
              <button
                className={`px-4 py-2  ${
                  activeTab === "Ongoing"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                } rounded-lg duration-300 font-medium cursor-pointer`}
                onClick={() => setActiveTab("Ongoing")}
              >
                Ongoing
              </button>
            </div>

            {activeTab === "All Bookings" && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleSearch}
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-8">Booking ID</th>
                  <th className="py-4 px-8">Car</th>
                  <th className="py-4 px-8">Renter</th>
                  <th className="py-4 px-8">Pickup Date</th>
                  <th className="py-4 px-8">Return Date</th>
                  <th className="py-4 px-8">Amount</th>
                  <th className="py-4 px-8">Status</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              {activeTab === "All Bookings" && (
                <tbody className="divide-y divide-gray-200">
                  {searchedHistories.map((booking, index) => {
                    const bookDate = booking.bookedAt.split(" ");
                    const compDate = booking.completedAt.split(" ");
                    return (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-6 font-medium text-blue-600">
                          BKG00{index + 1}
                        </td>
                        <td className="py-4 px-6 font-medium">
                          {booking.bookId.make} {booking.bookId.model}
                        </td>
                        <td className="py-4 px-6">
                          {booking.user.firstName} {booking.user.secName}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {bookDate?.[0]}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {compDate?.[0]}
                        </td>
                        <td className="py-4 px-6 font-medium">
                          {booking.amount}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              booking.bookId.status === "unavailable"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {booking.bookId.status === "unavailable"
                              ? "Ongoing"
                              : "Completed"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            {/* <button className="text-blue-600 hover:text-blue-800">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                          </button> */}
                            <Link
                              to={`/hostinvoice/${booking?._id}`}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                ></path>
                              </svg>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
              {activeTab === "Completed" && (
                <tbody className="divide-y divide-gray-200">
                  {bookCars.map((booking, index) => {
                    const bookDate = booking.bookedAt.split(" ");
                    const compDate = booking.completedAt.split(" ");
                    if (booking.bookId.status === "available") {
                      return (
                        <tr
                          key={booking._id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4 px-6 font-medium text-blue-600">
                            BKG00{index + 1}
                          </td>
                          <td className="py-4 px-6 font-medium">
                            {booking.bookId.make} {booking.bookId.model}
                          </td>
                          <td className="py-4 px-6">
                            {booking.user.firstName} {booking.user.secName}
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {bookDate?.[0]}
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {compDate?.[0]}
                          </td>
                          <td className="py-4 px-6 font-medium">
                            {booking.amount}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                booking.bookId.status === "unavailable"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {booking.bookId.status === "unavailable"
                                ? "Ongoing"
                                : "Completed"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              {/* <button className="text-blue-600 hover:text-blue-800">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                          </button> */}
                              <Link
                                to={`/hostinvoice/${booking?._id}`}
                                className="text-gray-600 hover:text-gray-800"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  ></path>
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              )}
              {activeTab === "Ongoing" && (
                <tbody className="divide-y divide-gray-200">
                  {bookCars.map((booking, index) => {
                    const bookDate = booking.bookedAt.split(" ");
                    const compDate = booking.completedAt.split(" ");
                    if (booking.bookId.status === "unavailable") {
                      return (
                        <tr
                          key={booking._id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4 px-6 font-medium text-blue-600">
                            BKG00{index + 1}
                          </td>
                          <td className="py-4 px-6 font-medium">
                            {booking.bookId.make} {booking.bookId.model}
                          </td>
                          <td className="py-4 px-6">
                            {booking.user.firstName} {booking.user.secName}
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {bookDate?.[0]}
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {compDate?.[0]}
                          </td>
                          <td className="py-4 px-6 font-medium">
                            {booking.amount}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                booking.bookId.status === "unavailable"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {booking.bookId.status === "unavailable"
                                ? "Ongoing"
                                : "Completed"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              {/* <button className="text-blue-600 hover:text-blue-800">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                          </button> */}
                              <Link
                                to={`/hostinvoice/${booking?._id}`}
                                className="text-gray-600 hover:text-gray-800"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  ></path>
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              )}
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{toatalBookings}</span> of{" "}
              <span className="font-medium">{toatalBookings}</span> bookings
            </p>
            {/* <div className="flex space-x-1">
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 font-medium">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                1
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 font-medium">
                Next
              </button>
            </div> */}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center">
          <div className="bg-blue-100 rounded-full p-2 mr-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-600">
              Need help with a booking? Contact our customer support at{" "}
              <span className="font-medium">support@carrent.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostHistory;
