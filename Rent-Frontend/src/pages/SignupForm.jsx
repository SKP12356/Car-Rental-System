import React, { useContext } from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { CarContext } from "../store/carStore";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const SignupForm = () => {
  const { registerUser, userType } = useContext(CarContext);
  const [err, setErr] = useState(null);
  const [imageShow, setImageShow] = useState(null); // to show image preview
  const [showPass, setShowPass] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const imgRef = useRef();
  const fName = useRef();
  const lName = useRef();
  const uName = useRef();
  const mail = useRef();
  const mobile = useRef();
  const passcode = useRef();
  const confPassword = useRef();

  const show =
    userType === "host" ? (
      <></>
    ) : (
      <>
        <Link
          to="/host/signup"
          className="inline-flex justify-center py-2 px-6 border-none rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
        >
          Join as Host
        </Link>
      </>
    );

  const onhandleSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    const image = imgRef.current.files[0];
    const firstName = fName.current.value;
    const secName = lName.current.value;
    const userName = uName.current.value;
    const email = mail.current.value;
    const phone = mobile.current.value;
    const password = passcode.current.value;
    const confirmPassword = confPassword.current.value;
    const data = await registerUser(
      image,
      firstName,
      secName,
      userName,
      email,
      phone,
      password,
      confirmPassword
    );
    // console.log(data);
    setLoad(false);
    if (data?.user) {
      navigate(`/user/emailotp/${data?.user._id}`);
      // toast.success(data.message)
    } else {
      setErr(data);
      // console.log(data.message)
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageShow(imageUrl);
    }
  };

  const handlePass = () => {
    setShowPass(!showPass);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  // const handleGitHubLogin = () => {
  //   window.location.href = "http://localhost:3000/auth/github";
  // };

  return (
    <>
      {load === false ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                Create Account
              </h2>
              <p className="text-gray-500">
                Join our community in just a few steps
              </p>
            </div>

            {err && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                <p className="font-medium">{err}</p>
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={(event) => onhandleSubmit(event)}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                    {imageShow ? (
                      <img
                        className="h-full w-full object-cover"
                        src={imageShow}
                        alt="Profile preview"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-indigo-100 p-2 rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <label className="block w-full">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    ref={imgRef}
                    onChange={(event) => handleImage(event)}
                    className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100
                  border border-gray-300 rounded-full"
                    accept="image/*"
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  JPEG, PNG or JPG (MAX. 2MB)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    ref={fName}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    ref={lName}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">@</span>
                  </div>
                  <input
                    type="text"
                    ref={uName}
                    placeholder="johndoe"
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    ref={mail}
                    placeholder="you@example.com"
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    ref={mobile}
                    placeholder="+91 (555) 123-4567"
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    ref={passcode}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={handlePass}
                    className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {showPass ? <BiShow size={20} /> : <BiHide size={20} />}
                  </button>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Use at least 8 characters with letters and numbers
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  ref={confPassword}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center">{show}</div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  to={userType === "host" ? "/logout" : "/user/login"}
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SignupForm;
