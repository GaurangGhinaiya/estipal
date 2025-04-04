import { useEffect, useState } from "react";
import axiosInstance from "../../../services";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export const SubModalCollection = ({
  isVisible,
  content,
  onClose,
  handleModelSubmit,
  modelDetails,
}) => {
  const [serialDesc, setSerialDesc] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setSerialDesc(e.target.value);
  const handleInputNoChange = (e) => setSerialNo(e.target.value);

  const getModelDetailsById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `watchSerialNo/detail?id=${modelDetails?.id}`
      );
      setSerialDesc(response?.payload?.data?.serial_desc);
      setSerialNo(response?.payload?.data?.serial_no);
    } catch (error) {
      console.error("Error fetching model details:", error);
      toast.error("Failed to load model details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      getModelDetailsById();
    }
  }, [modelDetails?.id, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#283641] text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Model</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-lg hover:text-red-700"
          >
            &times;
          </button>
        </div>
        {loading ? (
          <div className="flex fixed top-0 bottom-0 right-0 left-0 justify-center items-center">
            <ClipLoader color="#000000" size={50} />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Modal Number"
                value={serialNo}
                onChange={handleInputNoChange}
                className="w-full bg-[#283641] text-white p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Reference Description"
                value={serialDesc}
                onChange={handleInputChange}
                className="w-full p-2 bg-[#283641] text-white border rounded-lg"
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
                  setLoading(true);
                  handleModelSubmit(serialDesc, serialNo);
                  if (!isVisible) {
                    setLoading(false);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
