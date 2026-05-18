import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <div className="text-center max-w-lg">
        {/* Animated/Styled 404 Number */}
        <h1 className="text-9xl font-black text-indigo-600 animate-bounce">
          404
        </h1>
        
        {/* Error Message */}
        <p className="text-2xl font-bold text-gray-800 mt-4 md:text-3xl">
          Uh-oh! Page not found.
        </p>
        
        <p className="text-gray-500 mt-2">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <a
            href="/"
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;