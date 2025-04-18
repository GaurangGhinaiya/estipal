import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const ModalBrand = ({
  iSEditBrandDetailsData,
  isModalVisibleBrand,
  onClose,
  handleBrandModalSubmit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setInputValue(e.target.value);

  useEffect(() => {
    if (iSEditBrandDetailsData?.brand) {
      setInputValue(iSEditBrandDetailsData?.brand);
    }
  }, [iSEditBrandDetailsData?.brand, isModalVisibleBrand]);

  if (!isModalVisibleBrand) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-[16px]">
      <div className="bg-[#283641] text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Brand</h2>
          <button
            onClick={() => {
              onClose();
            }}
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
            className="w-full p-2 border rounded-lg bg-[#283641] text-white"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              await handleBrandModalSubmit(inputValue);
              setLoading(false);
            }}
            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 flex items-center"
          >
            Update{" "}
            {loading && (
              <span className="ml-2 mt-2">
                <ClipLoader color="#ffffff" size={20} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
