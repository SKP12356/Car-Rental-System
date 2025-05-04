import React from "react";

const offers = [
  {
    id: 1,
    title: "Weekend Special",
    description: "Book now and get 25% off on weekend rentals!",
    code: "WEEKEND25",
    image: "https://source.unsplash.com/featured/?car,luxury",
    validTill: "April 30, 2025",
  },
  {
    id: 2,
    title: "First Time Renter",
    description: "Get ₹500 off on your first booking!",
    code: "FIRST500",
    image: "https://source.unsplash.com/featured/?car,suv",
    validTill: "May 15, 2025",
  },
  {
    id: 3,
    title: "Long Ride Discount",
    description: "Flat 20% off on bookings above 3 days!",
    code: "LONG20",
    image: "https://source.unsplash.com/featured/?car,roadtrip",
    validTill: "May 31, 2025",
  },
];

const OfferPage = () => {
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
          
          <div className="mt-8 max-w-md mx-auto">
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
          </div>
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
                    <span className="text-xs font-medium text-gray-500 uppercase">Valid till</span>
                    <span className="text-sm font-semibold text-gray-800">{offer.validTill}</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                    Copy Code
                  </button>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:translate-y-0 shadow-md hover:shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Can't find what you're looking for?</h3>
          <button className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300">
            View All Promotions
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;