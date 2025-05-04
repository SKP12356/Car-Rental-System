import React, { useContext } from "react";
import { MdFavorite } from "react-icons/md";
import { CarContext } from "../store/carStore";
import { Link, useNavigate } from "react-router-dom";

const PopularCard = ({ vehicles }) => {
  const { userType } = useContext(CarContext);
  const navigate = useNavigate();
  const { addFavouriteCar, addBookedCars, getDetailsCar } =
    useContext(CarContext);

  const handleClick = (id) => {
    // console.log("Button Clicked", id)
    addFavouriteCar(id);
  };

  // const handleBook = (id) => {
  //   addBookedCars(id);
  // };

  // const handleDetailsClick = (id) => {
  //   console.log("clicked");
  //   getDetailsCar(id);
  // };
  console.log(vehicles);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {vehicles.map((vehicle) => {
        let count = vehicle.count
        return vehicle.carDetails.map((vehicle) => {
          // console.log(vehicle.carDetails);
          // console.log(vehicle)
          let features = vehicle.features;
          const featureArray = features?.split(",");
          return (
            <div
              key={vehicle._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Vehicle Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`http://localhost:3000/${vehicle.image[0]}`}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  {/* <Link
                    to={
                      userType === "user"
                        ? "/consumer/vehicles"
                        : "/user/signup"
                    }
                  > */}
                    <button
                      onClick={() => handleClick(vehicle._id)}
                      className="text-sm text-pink-500 hover:text-pink-600 bg-white p-2 rounded-full shadow-md transform hover:scale-110 transition-all duration-300"
                    >
                      {count} <MdFavorite />
                      {/* liked by {count} */}
                    </button>
                  {/* </Link> */}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-600 text-white font-medium px-3 py-1.5 rounded-full shadow-md">
                    ${vehicle.dailyRate}/day
                  </span>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {vehicle.year} • {vehicle.vehicleType}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span
                      className={`${
                        vehicle.status === "unavailable"
                          ? "bg-red-100"
                          : "bg-green-100"
                      } ${
                        vehicle.status === "unavailable"
                          ? "text-red-800"
                          : "text-green-800"
                      } text-xs px-2 py-1 rounded-full font-medium`}
                    >
                      {vehicle.status === "unavailable"
                        ? "Unavailable"
                        : "Available"}
                    </span>
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-3 my-4 text-sm bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">⛽</span>
                    <span className="font-medium">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">🔄</span>
                    <span className="font-medium">{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">👥</span>
                    <span className="font-medium">{vehicle.seats} seats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">📏</span>
                    <span className="font-medium">{vehicle.mileage} mi</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {featureArray?.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5">
                  {/* <button
                  onClick={() => handleDetailsClick(vehicle.id)}
                  className="flex-1 py-2.5 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                > */}
                  <Link
                    to={`/user/vehicles/${vehicle._id}/details`}
                    className="flex-1 py-2.5 px-4 block w-full bg-green-500 rounded-lg"
                  >
                    Details
                  </Link>
                  {/* </button> */}
                  <Link
                    to={
                      userType === "user"
                        ? `/user/payment/${vehicle._id}`
                        : "/user/signup"
                    }
                  >
                    <button
                      // onClick={() => handleBook(vehicle.id)}
                      className={`flex-1 py-2.5 px-4 ${
                        vehicle.status === "unavailable"
                          ? "bg-gray-600"
                          : "bg-blue-600"
                      } text-white rounded-lg font-medium ${
                        vehicle.status === "unavailable"
                          ? ""
                          : "hover:bg-blue-700"
                      } transition-colors`}
                      disabled={vehicle.status === "unavailable" ? true : false}
                    >
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default PopularCard;
