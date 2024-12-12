import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../services';

export const ModalBrand = ({ brandDetails, isModalVisibleBrand, content, onClose, handleBrandModalSubmit }) => {
    const [inputValue, setInputValue] = useState(content);
  
    const handleInputChange = (e) => setInputValue(e.target.value);
  
    const getBrandDetailsById = async () => {
      try {
        const response = await axiosInstance.get(`watchBrands/detail?id=${brandDetails?.id}`)
        setInputValue(response?.payload?.data?.brand)
      } catch (error) {
        console.log("error", error)
      }
    }
  
    useEffect(() => {
      if (isModalVisibleBrand) {
        getBrandDetailsById();
      }
    }, [brandDetails?.id, isModalVisibleBrand]);
  
    // If modal is not visible, render nothing
    if (!isModalVisibleBrand) return null;
  
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Brand</h2>
            <button
              onClick={onClose}
              className="text-red-500 font-bold text-lg hover:text-red-700"
            >
              &times;
            </button>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Type something..."
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleBrandModalSubmit(inputValue);
                // setInputValue("");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };