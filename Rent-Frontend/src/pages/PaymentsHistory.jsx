import React, { useContext } from "react";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";

const PaymentsHistory = () => {
  const { history } = useContext(CarContext);
  console.log(history);
  // const bookedCars = [
  //   { vehicle: { name: "Toyota Fortuner" }, amount: 5000 },
  //   { vehicle: { name: "Hyundai Creta" }, amount: 3500 },
  //   { vehicle: { name: "Honda City" }, amount: 4000 },
  // ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Payment History
      </h2>

      {history?.length > 0 ? (
        <div className="space-y-4">
          {history.map((car, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-md p-5 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-800">
                  {car?.car}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-green-600 font-semibold text-lg">
                  ₹{car?.amount}
                </span>
                <span className="text-xs text-gray-500">Successful</span>
                <div className="text-lg font-medium text-blue-800">
                  <Link to={`/invoice/${car?._id}`}>Download Invoice</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No payment history available</p>
        </div>
      )}

      {/* <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Transactions
        </button>
      </div> */}
    </div>
  );
};

export default PaymentsHistory;
