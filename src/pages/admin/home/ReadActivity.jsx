import React from "react";

const ReadActivity = () => {
  return (
    <div className="mx-auto p-[15px]">
      <h1 className="text-center text-xl font-semibold mb-4">
        Message History - ID W10015 : Rolex, Daytona, Stainless Steel - Bracelet
        (116500)
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <img
            src="https://placehold.co/300x500"
            alt="Rolex Daytona Stainless Steel Watch"
            className="w-64 h-auto mx-auto md:mx-0"
          />
        </div>
        <div className="md:ml-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-400">ID</p>
              <p>W10015</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-400">Brand</p>
              <p>Rolex</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-400">Collection</p>
              <p>Daytona</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-400">Model</p>
              <p>Stainless Steel - Bracelet (116500)</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-400">Serial Number</p>
              <p>43141331</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-gray-400">Estimate</p>
              <p className="text-green-500">USD 18,500.00</p>
            </div>
          </div>
          <div className="mt-4 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              View Watch Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadActivity;
