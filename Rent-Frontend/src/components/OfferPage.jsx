import React, { useContext } from "react";
import { CarContext } from "../store/carStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OfferPage = () => {
  const navigate = useNavigate()
  const { history } = useContext(CarContext);
  console.log(history?.length);
  const formattedDate = new Date(Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const dateArr = formattedDate.split(",");
  console.log(dateArr[0]);

  const copyTextToClipboard = (e) => {
    const button = e.currentTarget;
    const offerCode = button
      .closest(".offer-item")
      ?.querySelector(".offer-code");
    const code = offerCode.textContent.trim();
    navigator.clipboard
      .writeText(code)
      .then(() => {
        button.textContent = "Copied!";
        setTimeout(() => {
          button.textContent = "Copy Code";
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleNav = (code) => {
    navigate(`/consumer/vehicles?coupen=${code}`)
  }

  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Book now and get 25% off on weekend rentals!",
      code: "WEEKEND25",
      image:
        "data:image/jpeg;base64,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",
      validTill:
        dateArr[0] === "Sunday" || dateArr[0] === "Saturday"
          ? `${formattedDate}`
          : "",
      active:
        dateArr[0] === "Sunday" || dateArr[0] === "Saturday" ? true : false,
    },
    {
      id: 2,
      title: "First Time Renter",
      description: "Get ₹500 off on your first booking!",
      code: "FIRST500",
      image:
        "data:image/jpeg;base64,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",
      validTill: "May 15, 2025",
      active: history?.length === 0 ? true : false,
    },
    {
      id: 3,
      title: "Long Ride Discount",
      description: "Flat 20% off on bookings above 3 days!",
      code: "LONG20",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNAJdBeuqRpLoNNITBW-9vdIOV3uqbQVoq3Q&s",
      validTill: "May 31, 2025",
      active: true,
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
            Exclusive Offers
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600 font-light">
            Unlock premium deals for your next adventure
          </p>

          {/* <div className="mt-8 max-w-md mx-auto">
            <div className="relative bg-white rounded-full shadow-md p-1 flex">
              <input 
                type="text" 
                placeholder="Enter promo code" 
                className="w-full pl-4 pr-32 py-3 rounded-full focus:outline-none text-gray-700"
              />
              <button className="absolute right-1 top-1 bg-blue-600 text-white rounded-full px-6 py-3 hover:bg-blue-700 transition-colors duration-300 font-medium">
                Apply
              </button>
            </div>
          </div> */}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                    {offer.code}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {offer.title}
                </h2>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Valid till
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {offer.validTill}
                    </span>
                  </div>
                  <div className="offer-item">
                    <div className="offer-code hidden">{offer.code}</div>
                    <button
                      onClick={copyTextToClipboard}
                      className={`${
                        offer.active
                          ? "text-blue-600 hover:text-blue-800"
                          : "text-gray-600 hover:text-gray-800"
                      } font-medium text-sm flex items-center ${
                        offer.active ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      disabled={offer.active ? false : true}
                    >
                      Copy Code
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleNav(offer.code)}
                  className={`w-full bg-gradient-to-r ${
                    offer.active
                      ? "bg-blue-600 hover:bg-blue-800"
                      : "bg-gray-600 hover:bg-gray-800"
                  }  text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:translate-y-0 shadow-md hover:shadow-lg ${
                    offer.active ? "cursor-pointer" : "cursor-no-drop"
                  }`}
                  disabled={offer.active ? false : true}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Can't find what you're looking for?</h3>
          <button className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300">
            View All Promotions
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OfferPage;
