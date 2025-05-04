import React, { useContext } from "react";
import { MdFavorite } from "react-icons/md";
import { CarContext } from "../store/carStore";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ vehicles }) => {
  const {
    userType,
    addFavouriteCar,
    addBookedCars,
    getDetailsCar,
    deleteFavouriteCars,
    cars,
    user,
    favCars,
    favourite,
    setFavourite,
  } = useContext(CarContext);
  const navigate = useNavigate();
  console.log(cars);
  console.log(favCars);

  // const handleClick = (id) => {
  //   if (favourite === false) {
  //     addFavouriteCar(id);
  //   } else {
  //     deleteFavouriteCars(id);
  //   }
  //   setFavourite(!favourite);
  // };

  const addFav = (id) => {
    addFavouriteCar(id);
  };

  const deleteFav = (id) => {
    deleteFavouriteCars(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => {
        const isFavourite = favCars.find((car) => car._id === vehicle._id);
        console.log(isFavourite);
        // {
        //   isFavourite ? setFavourite(true) : setFavourite(false);
        // }
        let features = vehicle.features;
        const featureArray = features?.split(",");

        return (
          <div
            key={vehicle._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
          >
            {/* Vehicle Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={`http://localhost:3000/${vehicle.image[0]}`}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              {/* Favorite Button */}
              <div className="absolute top-3 left-3">
                <Link
                  to={
                    userType === "user" ? "/consumer/vehicles" : "/user/signup"
                  }
                >
                  <button
                    onClick={
                      isFavourite
                        ? () => deleteFav(vehicle._id)
                        : () => addFav(vehicle._id)
                    }
                    className={`rounded-full p-2 transform hover:scale-110 transition-all duration-300`}
                  >
                    {userType === "user" ? (
                      <MdFavorite
                        className={`text-4xl ${
                          isFavourite ? "text-pink-500" : "text-white"
                        } `}
                      />
                    ) : (
                      ""
                    )}
                  </button>
                </Link>
              </div>

              {/* Price Badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-blue-500 text-white font-medium px-3 py-1.5 rounded-full shadow-md text-sm">
                  ${vehicle.dailyRate}/day
                </span>
              </div>

              {/* Vehicle Name on Image */}
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white text-xl font-bold drop-shadow-md">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-gray-100 text-sm drop-shadow-md">
                  {vehicle.year} • {vehicle.vehicleType}
                </p>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                {/* Status Badge */}
                <div className="flex justify-end mb-3">
                  <span
                    className={`${
                      vehicle.status === "unavailable"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    } text-xs px-2.5 py-1 rounded-full font-medium`}
                  >
                    {vehicle.status === "unavailable"
                      ? "Unavailable"
                      : "Available"}
                  </span>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-2 my-3 text-sm">
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">⛽</span>
                    <span className="font-medium text-gray-800">
                      {vehicle.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">🔄</span>
                    <span className="font-medium text-gray-800">
                      {vehicle.transmission}
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">👥</span>
                    <span className="font-medium text-gray-800">
                      {vehicle.seats} seats
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 mr-2">📏</span>
                    <span className="font-medium text-gray-800">
                      {vehicle.mileage} mi
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1.5">
                    FEATURES
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {featureArray?.slice(0, 4).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                      >
                        {feature.trim()}
                      </span>
                    ))}
                    {featureArray && featureArray.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                        +{featureArray.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Host Information */}
                <div className="flex items-center gap-2 mt-3 p-2 bg-gray-50 rounded-lg">
                  <img
                    src={`http://localhost:3000/${vehicle.host.image}`}
                    alt={vehicle.host.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {vehicle.host?._id === user?._id
                      ? "You"
                      : `${vehicle.host.fullName}`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/user/vehicles/${vehicle._id}/details`}
                  className={`${
                    userType === "user" ? "flex-1" : ""
                  } py-2.5 px-4 bg-green-500 text-gray-800 rounded-lg font-medium text-center hover:bg-green-600 transition-colors ${
                    userType === "user" ? "" : "w-full"
                  }`}
                >
                  View Details
                </Link>
                <Link
                  to={
                    userType === "user"
                      ? `/user/payment/${vehicle._id}`
                      : "/user/signup"
                  }
                  className="flex-1"
                >
                  {userType === "user" ? (
                    <button
                      className={`w-full py-2.5 px-4 rounded-lg font-medium ${
                        vehicle.status === "unavailable"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      } transition-colors`}
                      disabled={vehicle.status === "unavailable"}
                    >
                      Book Now
                    </button>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
