import { useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { IoDocument } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import { FaCartArrowDown } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { BookA, ShieldCheck } from 'lucide-react';
import Header from "./Header"
import { CarContext } from "../store/carStore";

const Sidebar = () => {
  let nav, name, image;
  const { logout, userType, user } = useContext(CarContext);
  const [pos, setPos] = useState("-left-100");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [margin, setMargin] = useState("ml-0");

  if (userType === "host") {
    name = <p className="font-semibold text-lg">{user.fullName}</p>;
    image = (
      <img
        src={`http://localhost:3000/${user.image}`}
        alt="user"
        className="w-full h-full object-cover rounded-full"
      />
    );
    nav = (
      <>
        <li className="mx-3 my-1">
          <Link
            to="/host/earnings"
            onClick={() => setActiveTab("Earnings")}
            className={`px-4 py-3 flex items-center rounded-xl transition-all duration-300 ${
              activeTab === "Earnings"
                ? "bg-white text-indigo-800 shadow-md"
                : "text-white hover:bg-indigo-700/40"
            }`}
          >
            {/* <MdPendingActions className={activeTab === "Earnings" ? "text-indigo-600" : "text-indigo-300"} /> */}
            <ShieldCheck className={activeTab === "Earnings" ? "text-indigo-600" : "text-indigo-300"} />
            <span className="ml-2 font-medium">Earnings</span>
          </Link>
        </li>
        <li className="mx-3 my-1">
          <Link
            to="/host/history"
            onClick={() => setActiveTab("History")}
            className={`px-4 py-3 flex items-center rounded-xl transition-all duration-300 ${
              activeTab === "History"
                ? "bg-white text-indigo-800 shadow-md"
                : "text-white hover:bg-indigo-700/40"
            }`}
          >
            <BookA className="text-l" />
            <span className="ml-3 font-medium">Bookings</span>
          </Link>
        </li>
      </>
    );
  } else if (userType === "user") {
    name = (
      <p className="font-semibold text-lg">
        {user.firstName + " " + user.secName}
      </p>
    );
    image = (
      <img
        src={`http://localhost:3000/${user.image}`}
        alt="user"
        className="w-full h-full object-cover rounded-full"
      />
    );
    nav = (
      <>
        <li className="mx-3 my-1">
          <Link
            to="/user/favourites"
            onClick={() => setActiveTab("Favorites")}
            className={`px-4 py-3 flex items-center rounded-xl transition-all duration-300 ${
              activeTab === "Favorites"
                ? "bg-white text-indigo-800 shadow-md"
                : "text-white hover:bg-indigo-700/40"
            }`}
          >
            <GrFavorite className={activeTab === "Favorites" ? "text-indigo-600" : "text-indigo-300"} />
            <span className="ml-3 font-medium">Favorites</span>
          </Link>
        </li>

        <li className="mx-3 my-1">
          <Link
            to="/user/documents"
            onClick={() => setActiveTab("Documents")}
            className={`px-4 py-3 flex items-center rounded-xl transition-all duration-300 ${
              activeTab === "Documents"
                ? "bg-white text-indigo-800 shadow-md"
                : "text-white hover:bg-indigo-700/40"
            }`}
          >
            <IoDocument className={activeTab === "Documents" ? "text-indigo-600" : "text-indigo-300"} />
            <span className="ml-3 font-medium">Documents</span>
          </Link>
        </li>

        <li className="mx-3 my-1">
          <Link
            to="/consumer/payments"
            onClick={() => setActiveTab("Payments & Invoice")}
            className={`px-4 py-3 flex items-center rounded-xl transition-all duration-300 ${
              activeTab === "Payments & Invoice"
                ? "bg-white text-indigo-800 shadow-md"
                : "text-white hover:bg-indigo-700/40"
            }`}
          >
            <RiSecurePaymentFill className={activeTab === "Payments & Invoice" ? "text-indigo-600" : "text-indigo-300"} />
            <span className="ml-3 font-medium">Payments & Invoice</span>
          </Link>
        </li>
      </>
    );
  } else {
    name = <p className="font-semibold text-lg">No User</p>;
    nav = <></>;
  }

  const showSidebar = (status) => {
    if (status === false) {
      setPos("");
      setMargin("ml-64");
    } else {
      setPos("-left-100");
      setMargin("ml-0");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - full height with enhanced design */}
      <div
        className={`w-64 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white flex-shrink-0 fixed ${pos} h-full z-10 shadow-xl transition-all duration-300 ease-in-out`}
      >
        {/* Logo with improved spacing and style */}
        <div className="p-6 border-b border-indigo-700/30">
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            DriveEase Rentals
          </h1>
        </div>

        {/* User Profile with modern styling */}
        <div className="p-5 flex items-center border-b border-indigo-700/30">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg overflow-hidden border-2 border-indigo-400/30">
            {image}
          </div>
          <div className="ml-4">
            {name}
            <p className="text-xs text-indigo-200 font-medium opacity-70">
              {userType === "host" ? "Vehicle Host" : userType === "user" ? "Member" : "Guest"}
            </p>
          </div>
        </div>

        {/* Navigation Menu with improved design */}
        <nav className="mt-8">
          <ul className="space-y-1">
            <li className="mx-3 my-1">
              <Link
                to={userType ? "/consumer/dashboard" : "user/login"}
                onClick={() => setActiveTab("Dashboard")}
                className={`px-4 py-3 flex items-center rounded-xl transition-all duration-300 ${
                  activeTab === "Dashboard"
                    ? "bg-white text-indigo-800 shadow-md"
                    : "text-white hover:bg-indigo-700/40"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${activeTab === "Dashboard" ? "text-indigo-600" : "text-indigo-300"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="ml-3 font-medium">Dashboard</span>
              </Link>
            </li>
            
            {nav}
          </ul>
        </nav>

        {/* Bottom Settings - with improved styling */}
        <div className="absolute bottom-0 w-full p-6 border-t border-indigo-700/30 bg-indigo-900/30 backdrop-blur-sm">
          <Link
            to={userType ? "/settings" : "user/login"}
            className="flex items-center text-indigo-200 hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="ml-2 font-medium">Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Content - offset by sidebar width with smooth transition */}
      <div
        className={`flex-1 ${margin} overflow-y-auto transition-all duration-300 ease-in-out`}
      >
        <Header showSidebar={showSidebar}></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Sidebar;