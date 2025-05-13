import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../store/carStore";
import toast from "react-hot-toast";

const PhoneOtp = () => {
  const { phoneotpResend, addPhoneOtp, user } = useContext(CarContext);
  const [timeLeft, setTimeLeft] = useState(120);
  const otpRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  const sendOtp = async () => {
    const otp = otpRef.current.value;
    console.log(otp);
    const data = await addPhoneOtp(id, otp);
    console.log(data);
    if (data?.message) {
      toast.success(data?.message);
      if (user) {
        navigate("/consumer/vehicles");
      } else {
        navigate("/user/login");
      }
    } else {
      toast.error("Wrong otp entered / otp expired");
    }
  };

  const handleResend = async () => {
    const data = await phoneotpResend(id);
    if (data?.message) {
      toast.success(data?.message);
    } else {
      toast.error("Something wrong happened");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md border border-blue-100 transition-all hover:shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full shadow-inner">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Mobile Verification
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter the verification code sent to your message inbox
        </p>

        <div className="relative mb-6">
          <input
            type="text"
            ref={otpRef}
            className="w-full border-2 border-gray-300 p-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-medium tracking-widest text-center"
            placeholder="Enter verification code"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>
        </div>

        <button
          onClick={sendOtp}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md flex items-center justify-center cursor-pointer mb-4"
        >
          <span className="mr-2">Verify Code</span>
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
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        <div className="mt-6 text-center">
          {/* <div className="text-gray-500 mb-3 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Code expires in </span>
            <span className="font-medium text-indigo-600 ml-1">{formatTime(timeLeft)}</span>
          </div> */}

          <button
            disabled={timeLeft > 0}
            onClick={handleResend}
            className={`text-sm font-medium py-2 px-4 rounded-lg transition ${
              timeLeft > 0
                ? "bg-gray-100 text-gray-400"
                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            } cursor-pointer`}
          >
            {timeLeft > 0
              ? `Resend in ${formatTime(timeLeft)}`
              : "Resend verification code"}
          </button>
        </div>

        {/* <div className="mt-6 text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Need help? Contact support
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default PhoneOtp;
