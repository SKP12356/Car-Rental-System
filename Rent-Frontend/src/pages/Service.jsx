import React, { useContext } from "react";
import SearchBox from "../components/SearchBox";
import Card from "../components/Card";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";

const Service = () => {
  const { searchedCars } = useContext(CarContext);
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Services
          </h1>
          <p className="text-lg text-gray-600">
            Enhance your rental experience with these premium offerings
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Rental Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <span className="text-indigo-600 text-xl">🚗</span>
              </div>
              <h2 className="text-xl font-semibold">Rental Services</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="mr-2">🗓️</span>
                <span>Long-Term Rentals</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🏎️</span>
                <span>Luxury Vehicles</span>
              </li>
              <li className="flex items-center">
                {/* <span className="mr-2">🛫</span> */}
                {/* <span>Airport Services</span> */}
              </li>
            </ul>
          </div>

          {/* Add-Ons */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="text-green-600 text-xl">✨</span>
              </div>
              <h2 className="text-xl font-semibold">Add-Ons</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                {/* <span className="mr-2">🧒</span>
                <span>Child Seats</span> */}
              </li>
              <li className="flex items-center">
                {/* <span className="mr-2">📡</span>
                <span>WiFi Hotspots</span> */}
              </li>
              <li className="flex items-center">
                <span className="mr-2">⛽</span>
                <span>Fuel Packages</span>
              </li>
            </ul>
          </div>

          {/* Membership */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <span className="text-purple-600 text-xl">💎</span>
              </div>
              <h2 className="text-xl font-semibold">Membership</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="mr-2">🔄</span>
                <span>Subscription Plans</span>
              </li>
              {/* <li className="flex items-center">
                <span className="mr-2">🏆</span>
                <span>Loyalty Rewards</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🏢</span>
                <span>Corporate Programs</span>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Emergency Services */}
        <div className="bg-red-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Emergency & Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-2xl">🆘</span>
              </div>
              <h3 className="font-medium mb-1">24/7 Roadside Assistance</h3>
              <p className="text-sm text-gray-600">Call: (555) 123-HELP</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-2xl">🏥</span>
              </div>
              <h3 className="font-medium mb-1">Insurance Partners</h3>
              <p className="text-sm text-gray-600">Quick claims processing</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-2xl">📍</span>
              </div>
              <h3 className="font-medium mb-1">Nearest Service Centers</h3>
              <p className="text-sm text-gray-600">Find help nearby</p>
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="bg-indigo-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Summer Special: 20% Off Weekly Rentals
          </h2>
          <p className="mb-4">
            Book before June 30th and save on your next adventure
          </p>
          <Link to="/consumer/offers">
            <button className="bg-white text-indigo-600 font-medium py-2 px-6 rounded-md cursor-pointer"
            >
              View Offers
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Service;
