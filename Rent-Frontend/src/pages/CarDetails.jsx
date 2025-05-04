import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const CarDetails = () => {
  const { cars, addFavouriteCar, addBookedCars, userType, user, carDetails } =
    useContext(CarContext);
  const [detailsCar, setDetailsCar] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const detailsCar = await carDetails(id);
      setDetailsCar(detailsCar);
    };
    fetchDetails();
  }, [id]);

  if (!detailsCar) {
    return <Loader />;
  }

  let detailsCarFeatures = detailsCar?.features;
  const featureArray = detailsCarFeatures?.split(",");

  const handleClick = (id) => {
    if (userType === "user") {
      addFavouriteCar(id);
    } else {
      navigate("/user/signup");
    }
  };

  const handleBook = (id) => {
    if (userType === "user") {
      addBookedCars(id);
    } else {
      navigate("/user/signup");
    }
  };

  // Calculate weekly rate with 10% discount
  const weeklyRate = (detailsCar?.dailyRate * 7 * 0.9).toFixed(2);
  // Calculate 3-day estimate
  const estimatedTotal = detailsCar?.dailyRate * 3;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800 bg-gray-50">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link to="/cars" className="hover:text-blue-600">
          Cars
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700 font-medium">
          {detailsCar?.make} {detailsCar?.model}
        </span>
      </div>

      {/* Header with availability badge */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-4xl font-bold tracking-tight">
              {detailsCar?.year} {detailsCar?.make} {detailsCar?.model}
            </h1>
            <span
              className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                detailsCar?.status === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {detailsCar?.status === "available" ? "Available" : "Unavailable"}
            </span>
          </div>
          <p className="text-lg text-gray-500 mt-1">
            {detailsCar?.type} • {detailsCar?.color} •{" "}
            {detailsCar?.licensePlate}
          </p>
        </div>

        {/* Host profile preview */}
        <div className="mt-4 md:mt-0 flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <img
            src={`http://localhost:3000/${detailsCar?.host.image}`}
            alt={detailsCar?.host.fullName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="ml-3">
            <p className="text-xs text-gray-500 font-medium">HOSTED BY</p>
            {detailsCar?.host._id === user?._id ? (
              <p className="font-medium">You</p>
            ) : (
              <Link
                to={`/profile/${detailsCar?._id}`}
                className="font-medium hover:text-blue-600 transition"
              >
                {detailsCar?.host.fullName}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Image Gallery (improved) */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-xl overflow-hidden shadow-md border bg-white h-96 flex items-center justify-center group relative">
          <img
            src={`http://localhost:3000/${detailsCar?.image[0]}`}
            alt={`${detailsCar?.make} ${detailsCar?.model}`}
            className="w-full h-full object-cover transition group-hover:scale-105 duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end">
            <p className="text-white p-4 font-medium text-lg">Main View</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden shadow-md border bg-white h-44 flex items-center justify-center group relative"
            >
              <img
                src={`http://localhost:3000/${detailsCar?.image[i]}`}
                alt={`${detailsCar?.make} ${detailsCar?.model}`}
                className="w-full h-full object-cover transition group-hover:scale-105 duration-300"
              />
              {/* <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition"></div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons - Moved up for better UX */}
      <div className="bg-white rounded-xl shadow-md p-6 border mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <div className="text-3xl font-bold text-blue-700">
            ${detailsCar?.dailyRate}
            <span className="text-lg font-normal text-gray-500">/day</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Weekly discount applied for longer rentals
          </div>
        </div>
        {userType !== "host" && (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to={
                userType === "user"
                  ? `/user/payment/${detailsCar?._id}`
                  : "/user/signup"
              }
              className="w-full sm:w-auto"
            >
              <button
                className={`w-full ${
                  detailsCar?.status === "unavailable"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-3 px-8 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition flex items-center justify-center`}
                disabled={detailsCar?.status === "unavailable"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Now
              </button>
            </Link>
            <button
              className="w-full sm:w-auto bg-white border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition flex items-center justify-center"
              onClick={() => handleClick(detailsCar?._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Save to Favorites
            </button>
          </div>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Specs */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm md:text-base">
              {[
                ["Make", detailsCar?.make],
                ["Model", detailsCar?.model],
                ["Year", detailsCar?.year],
                ["Type", detailsCar?.type],
                ["Color", detailsCar?.color],
                ["License Plate", detailsCar?.licensePlate],
                ["Fuel Type", detailsCar?.fuelType],
                ["Transmission", detailsCar?.transmission],
                ["Seats", detailsCar?.seats],
                ["Doors", detailsCar?.doors],
                ["Mileage", `${detailsCar?.mileage} miles`],
              ].map(([label, value]) => (
                <div key={label} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p className="font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing + Features */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-blue-600"
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
              Pricing
            </h2>
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span>Daily Rate</span>
                <span className="font-bold">${detailsCar?.dailyRate}/day</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span>Weekly Rate</span>
                <span className="font-bold">
                  ${weeklyRate}/week
                  <span className="text-green-600 text-xs block text-right">
                    10% discount
                  </span>
                </span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex justify-between font-bold text-lg p-3 bg-blue-50 rounded-lg text-blue-800">
                  <span>Estimated Total</span>
                  <span>
                    ${estimatedTotal}{" "}
                    <span className="text-sm font-normal">(3 days)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-blue-600"
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
              Features
            </h2>
            <ul className="space-y-2 grid grid-cols-1 gap-2">
              {Array.isArray(featureArray) ? (
                featureArray.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg"
                  >
                    <span className="mr-2 flex items-center justify-center h-5 w-5 bg-green-100 text-green-600 rounded-full">
                      ✓
                    </span>
                    {feature.trim()}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic p-3 bg-gray-50 rounded-lg">
                  No features listed
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-md p-6 border mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-blue-600"
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
          Description
        </h2>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
          {detailsCar?.description ||
            "No description provided for this vehicle."}
        </p>
      </div>

      {/* Additional information */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Need more information?
        </h2>
        <p className="text-blue-700 mb-4">
          Contact the host or our support team for additional details about this
          vehicle.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white border border-blue-200 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 focus:outline-none transition flex items-center justify-center cursor-no-drop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Message Host
          </button>
          <button className="bg-white border border-blue-200 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 focus:outline-none transition flex items-center justify-center cursor-no-drop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
            Call Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
