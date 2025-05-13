import React, { useContext } from "react";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BookCard = ({ vehicles }) => {
  const { deleteBookedCars } = useContext(CarContext);

  const handleRemove = (id) => {
    deleteBookedCars(id);
    toast.error("Removed from bookings")
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => {
        const featureArray = vehicle.bookId.features?.split(",");
        return (
          <div
            key={vehicle._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col"
          >
            {/* Vehicle Image with Gradient Overlay */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={`http://localhost:3000/${vehicle.bookId.image[0]}`}
                alt={`${vehicle.bookId.make} ${vehicle.bookId.model}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute top-3 right-3">
                <span className="bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-full text-sm shadow-md">
                  ${vehicle.bookId.dailyRate}/day
                </span>
              </div>
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white text-xl font-bold drop-shadow-md">
                  {vehicle.bookId.make} {vehicle.bookId.model}
                </h3>
                <p className="text-gray-100 text-sm mt-0.5 drop-shadow-md">
                  {vehicle.bookId.year} • {vehicle.bookId.vehicleType}
                </p>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                {/* Status Badge */}
                <div className="flex justify-end mb-2">
                  <span
                    className={`${
                      vehicle.bookId.status === "unavailable" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    } text-xs px-2.5 py-1 rounded-full font-medium`}
                  >
                    {vehicle.bookId.status === "unavailable" ? "Booked" : "Completed"}
                  </span>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">⛽</span>
                    <span className="font-medium text-gray-800">{vehicle.bookId.fuelType}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">🔄</span>
                    <span className="font-medium text-gray-800">{vehicle.bookId.transmission}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">👥</span>
                    <span className="font-medium text-gray-800">{vehicle.bookId.seats} seats</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">📏</span>
                    <span className="font-medium text-gray-800">{vehicle.bookId.mileage} mi</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1.5">FEATURES</p>
                  <div className="flex flex-wrap gap-1.5">
                    {featureArray?.slice(0, 4).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                      >
                        {feature.trim()}
                      </span>
                    ))}
                    {featureArray?.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                        +{featureArray.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Link 
                  className="flex-1" 
                  to={`/user/payment/${vehicle._id}`}
                >
                  <button
                    className={`w-full py-2 px-3 rounded-lg font-medium text-sm ${
                      vehicle.bookId.status === "unavailable"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    } transition-colors`}
                    disabled={vehicle.bookId.status === "unavailable"}
                  >
                    Book Again
                  </button>
                </Link>
                <button
                  className="py-2 px-3 bg-red-400 text-black rounded-lg font-medium text-sm hover:bg-red-500 transition-colors cursor-pointer"
                  onClick={() => handleRemove(vehicle._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookCard;