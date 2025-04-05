
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[600px] w-full border-2 border-gray-300 rounded-md bg-black">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-white">Loading animation...</p>
    </div>
  );
};

export default LoadingScreen;
