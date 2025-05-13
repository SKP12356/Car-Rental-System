import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-96 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center p-6 rounded-2xl">
        <div className="relative mx-auto mb-8">
          {/* Outer spinning circle */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 opacity-30"></div>
          
          {/* Inner spinning circle - opposite direction */}
          <div className="absolute top-1 left-1 animate-spin rounded-full h-14 w-14 border-r-4 border-l-4 border-indigo-500 opacity-70" style={{ animationDirection: 'reverse' }}></div>
          
          {/* Center dot */}
          <div className="absolute top-6 left-6 h-4 w-4 rounded-full bg-indigo-600"></div>
        </div>
        
        <p className="text-xl font-medium text-gray-700 tracking-wide">
          Loading
          <span className="inline-block animate-pulse">.</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '300ms' }}>.</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '600ms' }}>.</span>
        </p>
        
        {/* <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your data</p> */}
      </div>
    </div>
  );
};

export default Loader;