import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="text-xl font-medium text-gray-600">
          Loading car details...
        </p>
      </div>
    </div>
  );
};

export default Loader;
