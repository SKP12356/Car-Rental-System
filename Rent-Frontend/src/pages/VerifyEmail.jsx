import React, { useContext, useRef } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CarContext } from "../store/carStore";

const VerifyEmail = () => {
  const { sendmail } = useContext(CarContext);
  const navigate = useNavigate()
  const emailRef = useRef();
  const handleEmail = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const data = await sendmail(email);
    console.log(data);
    const id = data?.user._id || data?.host._id
    navigate(`/user/emailotp-password/${id}`)
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Mail className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-500 text-center mt-2">
            Enter your email and we'll send you an otp to verify your account
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => handleEmail(event)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                ref={emailRef}
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm"
          >
            Reset Password
          </button>

          <div className="text-center mt-4">
            <Link
              to="/user/login"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Return to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
