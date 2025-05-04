import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../store/carStore";

const Payment = () => {
  const { cars, providePayment } = useContext(CarContext);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [value, setValue] = useState();
  const [time, setTime] = useState();
  const { id } = useParams();
  const [detailsCar, setDetailsCar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (cars.length > 0) {
      const fetchedCars = cars.find((car) => car._id === id);
      if (fetchedCars) {
        setDetailsCar(fetchedCars);
      } else {
        setDetailsCar(null);
      }
    }
  }, [cars, id]);

  const handlePay = (pay, time) => {
    let newTime;
    setValue(pay);
    if (time === "day") {
      newTime = 24;
    } else if (time === "week") {
      newTime = 24 * 7;
    } else {
      newTime = 3;
    }
    setTime(newTime);
  };

  const onClose = () => {
    navigate("/consumer/bookings");
  };

  const handlePayment = async (value, id, time) => {
    providePayment(value, id, time);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl relative overflow-hidden">
        {/* Decorative header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close payment modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Rental Payment
        </h2>
        <p className="text-center text-gray-500 mb-6">Select your preferred rental duration</p>

        {/* Payment Method Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setPaymentMethod("upi")}
            className={`flex-1 py-3 px-4 rounded-md text-base font-medium transition-all ${
              paymentMethod === "upi"
                ? "bg-white shadow-md text-blue-600"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Choose Rental Period
          </button>
        </div>

        {/* UPI Payment Section */}
        {paymentMethod === "upi" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  pay: detailsCar?.dailyRate,
                  color: "from-purple-500 to-purple-600",
                  time: "day",
                  label: "Daily",
                  icon: "🕒"
                },
                {
                  pay: (detailsCar?.dailyRate * 3).toFixed(2),
                  color: "from-sky-500 to-sky-600",
                  time: "3 days",
                  label: "3 Days",
                  icon: "📅"
                },
                {
                  pay: (detailsCar?.dailyRate * 7 * 0.9).toFixed(2),
                  color: "from-green-500 to-green-600",
                  time: "week",
                  label: "Weekly",
                  icon: "🗓️"
                },
              ].map((option) => (
                <button
                  key={option.time}
                  onClick={() => handlePay(option.pay, option.time)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer bg-gradient-to-b ${option.color} hover:shadow-lg transition-all duration-300 text-white h-32`}
                >
                  <span className="text-2xl mb-1">{option.icon}</span>
                  <span className="text-xl font-bold mb-1">₹{option.pay}</span>
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>

            {value && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Selected option:</span>
                  <span className="font-medium text-gray-800">
                    {time === 24 ? "Daily" : time === 24 * 7 ? "Weekly" : "3 Days"}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-lg text-blue-600">₹{value}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pay Button */}
        <button
          className={`w-full mt-6 py-4 rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            value 
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:from-blue-600 hover:to-blue-800" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => value && handlePayment(value, id, time)}
          disabled={!value}
        >
          {value ? `Pay ₹${value}` : "Select a rental period"}
        </button>

        {/* Car details summary if a car is selected */}
        {detailsCar && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Selected Vehicle</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">{detailsCar.name || "Vehicle"}</p>
                <p className="text-sm text-gray-500">Base rate: ₹{detailsCar.dailyRate}/day</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;