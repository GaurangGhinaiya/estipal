import React, { useEffect, useState } from 'react';
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import CustomSwitch from '../../../components/common/CustomSwitch';
import axiosInstance from '../../../services';

const ModalBrand = ({ brandDetails, isModalVisibleBrand, content, onClose, handleBrandModalSubmit }) => {
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

const ModalCollection = ({ collectionDetails, isModalVisibleCollection, content, onClose, handleCollectionSubmit }) => {
  const [inputValue, setInputValue] = useState(content);

  const getCollectionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(`watchModel/detail?id=${collectionDetails?.id}`)
      setInputValue(response?.payload?.data?.model_no)
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleInputChange = (e) => setInputValue(e.target.value);

  useEffect(() => {
    if (isModalVisibleCollection) {
      getCollectionDetailsById();
    }
  }, [collectionDetails?.id, isModalVisibleCollection]);

  // If modal is not visible, render nothing
  if (!isModalVisibleCollection) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Collection</h2>
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
              handleCollectionSubmit(inputValue);
              setInputValue("");
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

const SubModalCollection = ({ isVisible, content, onClose, handleModelSubmit, modelDetails }) => {
  const [inputValue, setInputValue] = useState(content);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const getModelDetailsById = async () => {
    try {
      const response = await axiosInstance.get(`watchSerialNo/detail?id=${modelDetails?.id}`)
      setInputValue(response?.payload?.data?.serial_no + "-" + response?.payload?.data?.serial_desc)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (isVisible) {
      getModelDetailsById();
    }
  }, [modelDetails?.id, isVisible]);

  // If modal is not visible, render nothing
  if (!isVisible) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Model</h2>
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
              handleModelSubmit(inputValue);
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

const BrandList = () => {

  const [brandData, setBrandData] = useState([])
  const [brandDetails, setBrandDetails] = useState({})
  const [brandName, setBrandName] = useState("")
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState([])
  const [collectionDetails, setCollectionDetails] = useState({})
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelName, setModelName] = useState("")
  const [modelDetails, setModelDetails] = useState("")
  const [modalContent, setModalContent] = useState("");
  const [modelData, setModelData] = useState([]);
  const [isModalVisibleBrand, setModalVisibleBrand] = useState(false);
  const [isModalVisibleCollection, setModalVisibleCollection] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [switchState, setSwitchState] = useState({});

  const handleSwitchChange = (name, index) => (e) => {
    const dynamicKey = `${name}${index}`;
    setSwitchState((prev) => ({
      ...prev,
      [dynamicKey]: e.target.checked,
    }));
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand?.brand);
    setBrandDetails(brand)
    setSelectedCollection(null); // Reset collection selection when a new brand is selected
    setSelectedModel(null); // Reset model selection
  };

  const handleCollectionClick = (collection) => {
    setCollectionDetails(collection)
    setSelectedCollection(collection?.model_no);
    setSelectedModel(null); // Reset model selection
  };

  const openModalBrand = (content) => {
    setModalContent(content);
    setModalVisibleBrand(true);
  };

  const closeModalBrand = () => {
    setModalVisibleBrand(false);
    setModalContent("");
  };

  const openModalCollection = (content) => {
    setModalContent(content);
    setModalVisibleCollection(true);
  };

  const closeModalCollection = () => {
    setModalVisibleCollection(false);
    setModalContent("");
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const handleBrandModalSubmit = async (value) => {
    try {
      const updatedBrand = {
        "brand": value,
        "active": brandDetails?.active
      }
      const response = await axiosInstance.put(`watchBrands?id=${brandDetails?.id}`, updatedBrand);
      getBrandList();
      closeModalBrand();
    } catch (error) {
      console.log("error", error)
    }
  };

  const getBrandList = async () => {
    try {
      const response = await axiosInstance.get(`watchBrands?records_per_page=${50}`)
      setBrandData(response?.payload?.data)
    } catch (error) {
      console.log("error")
    }
  }

  useEffect(() => {
    getBrandList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBrandAdd = async () => {
    try {
      const newBrandValue = {
        "brand": brandName
      }
      const response = await axiosInstance.post(`watchBrands`, newBrandValue);
      setBrandName("")
      getBrandList();
    } catch (error) {
      console.log("error", error)
    }
  }

  const getCollectionList = async () => {
    try {
      const searchValue = JSON.stringify({ brand_id: brandDetails?.id });
      const response = await axiosInstance.get(`/watchModel?page=${1}&records_per_page=${25}&search=${searchValue}`)
      setCollectionData(response?.payload?.data)
    } catch (error) {
      console.log("errrorr", error)
    }
  }

  useEffect(() => {
    if (selectedBrand) {
      getCollectionList()
    }
  }, [selectedBrand])

  const newCollectionValue = {
    "brand_id": brandDetails?.id,
    "model_no": collectionName,
    "active": true
  }
  const handleCollectionAdd = async () => {
    try {

      const response = await axiosInstance.post(`watchModel`, newCollectionValue);
      getCollectionList();
      setCollectionName("")
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleCollectionSubmit = async (value) => {
    try {
      const updatedCollection = {
        "brand_id": collectionDetails?.brand_id,
        "model_no": value,
        "serial_no": value,
        "active": true
      }
      const response = await axiosInstance.put(`watchModel?id=${collectionDetails?.id}`, updatedCollection);
      getCollectionList();
      closeModalCollection();
    } catch (error) {
      console.log("error", error)
    }
  }


  const getModelList = async () => {
    try {
      const searchValue = JSON.stringify({ model_id: collectionDetails?.id });
      const response = await axiosInstance.get(`watchSerialNo?page=${1}&records_per_page=${50}&search=${searchValue}`)
      setModelData(response?.payload?.data)

    } catch (error) {
      console.log("error", error);
    }

  }

  useEffect(() => {
    if (selectedCollection) {
      getModelList();
    }
  }, [selectedCollection])


  const handleAddModel = async () => {

    try {
      const newModelValue = {
        "brand_id": modelDetails?.brand_id,
        "model_id": collectionDetails?.id,
        "serial_no": modelName,
        "serial_desc": modelName,
        "active": true
      }
      const response = await axiosInstance.post(`watchSerialNo`, newModelValue);
      getModelList();
      setModelName("")
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleModelSubmit = async (value) => {
    try {
      const newModelValue = {
        "brand_id": modelDetails?.brand_id,
        "model_id": modelDetails?.model_id,
        "serial_no": value,
        "active": true
      }
      const response = await axiosInstance.put(`watchSerialNo?id=${modelDetails?.id}`, newModelValue);
      console.log("response", response);
      getModelList();
      closeModal();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (

    <div className="p-6 min-h-[83vh]">
      <h1 className="text-2xl font-bold mb-4 text-white">Brands, Collections, and Models</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {/* Box 1: Brands */}
        <div className="bg-[#1E252B] p-4 rounded-lg h-[700px] overflow-hidden">
          <div className='flex justify-between flex-col md:flex-row'>
            <h2 className="text-xl font-semibold text-white mb-4">Brands</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Type brand"
                className="flex-grow p-2 rounded-l-lg"
                onChange={(e) => setBrandName(e.target.value)}
              />
              <button onClick={handleBrandAdd} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                Add
              </button>
            </div>
          </div>
          <ul className='h-[630px] overflow-y-scroll'>
            {brandData?.map((brand, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${selectedBrand === brand?.brand ? "bg-black text-white" : "bg-gray-800 text-white"
                  }`}
                onClick={(e) => {
                  handleBrandClick(brand)
                }}
              >
                <span>{brand.brand}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-yellow-500" onClick={(e) => e.stopPropagation()}>
                    <FaEdit size={25} onClick={() => {
                      openModalBrand(`${brand?.brand}`)
                      setBrandDetails(brand)
                    }} />
                  </button>
                  <div onClick={(e) => e.stopPropagation()}>
                    <CustomSwitch
                      name={`brandActive${brand?.id}`}
                      checked={switchState[`brandActive${brand?.id}`] ?? brand?.active}
                      onChange={handleSwitchChange("brandActive", brand?.id)}
                    />
                  </div>
                  <button className="text-white">
                    <FaArrowCircleRight size={25} color={`${selectedBrand === brand?.active ? "#FCA31E" : "white"}`} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Box 2: Collections */}
        {selectedBrand && <div className="bg-[#1E252B] p-4 rounded-lg h-[700px] overflow-hidden">
          <div className='flex justify-between flex-col md:flex-row'>
            <div>
              <IoCloseCircleOutline color='white' size={20} onClick={(e) => {
                setSelectedCollection(null)
                setSelectedBrand(null)
              }} />
              <h2 className="text-xl font-semibold text-white mb-4">Collections</h2>
            </div>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Type collection"
                className="flex-grow p-2 rounded-l-lg"
                onChange={(e) => setCollectionName(e.target.value)}
              />
              <button onClick={handleCollectionAdd} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                Add
              </button>
            </div>
          </div>
          <ul className='h-[620px] overflow-y-scroll'>
            {collectionData?.map((collection, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${selectedCollection === collection.model_no ? "bg-black text-white" : "bg-gray-800 text-white"
                  }`}
                onClick={() => handleCollectionClick(collection)}
              >
                <span>{collection?.model_no}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-yellow-500" onClick={(e) => e.stopPropagation()}>
                    <FaEdit size={25} onClick={() => {
                      openModalCollection(`${collection?.model_no}`)
                      setCollectionDetails(collection)
                    }} />
                  </button>
                  <div onClick={(e) => e.stopPropagation()}>
                    <CustomSwitch
                      name={`collectionActive${collection?.id}`}
                      checked={switchState[`collectionActive${collection?.id}`] ?? collection?.model_no}
                      onChange={handleSwitchChange("collectionActive", collection?.id)}
                    />
                  </div>
                  <button className="text-white">
                    <FaArrowCircleRight size={25} color={`${selectedCollection === collection.model_no ? "#FCA31E" : "white"}`} />
                  </button>
                </div>
              </li>
            ))}
            {!selectedBrand && <p className="text-white">Select a brand to view collections.</p>}
          </ul>
        </div>}

        {/* Box 3: Models */}
        {selectedCollection && <div className="bg-[#1E252B] p-4 rounded-lg h-[700px] overflow-hidden">
          <div className='flex justify-between flex-col md:flex-row'>
            <div>
              <IoCloseCircleOutline color='white' size={20} onClick={() => setSelectedCollection(null)} />
              <h2 className="text-xl font-semibold text-white mb-4">Models</h2>
            </div>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Type model"
                className="flex-grow p-2 rounded-l-lg"
                onChange={(e) => setModelName(e.target.value)}
              />
              <button onClick={() => {
                handleAddModel()
                // setModelDetails(model)
              }} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                Add
              </button>
            </div>
          </div>
          <ul className='h-[620px] overflow-y-scroll'>
            {modelData?.map((model, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${selectedModel === model?.serial_no ? "bg-black text-white" : "bg-gray-800 text-white"
                  }`}
              >
                <span>{model?.serial_no} - ${model?.serial_desc}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-yellow-500" onClick={(e) => e.stopPropagation()}>
                    <FaEdit size={25} onClick={() => {
                      openModal(`${model?.serial_no}`)
                      setModelDetails(model)
                    }} />
                  </button>
                  <div onClick={(e) => e.stopPropagation()}>
                    <CustomSwitch
                      name={`modelActive${model?.id}`}
                      checked={switchState[`modelActive${model?.id}`] ?? model?.active}
                      onChange={handleSwitchChange("modelActive", model?.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
            {!selectedCollection && <p className="text-white">Select a collection to view models.</p>}
          </ul>
        </div>}
      </div>
      <ModalBrand
        isModalVisibleBrand={isModalVisibleBrand}
        content={modalContent}
        onClose={closeModalBrand}
        handleBrandModalSubmit={handleBrandModalSubmit}
        brandDetails={brandDetails}
      />
      <ModalCollection
        isModalVisibleCollection={isModalVisibleCollection}
        content={modalContent}
        onClose={closeModalCollection}
        handleCollectionSubmit={handleCollectionSubmit}
        collectionDetails={collectionDetails}
      />
      <SubModalCollection
        isVisible={isModalVisible}
        content={modalContent}
        onClose={closeModal}
        modelDetails={modelDetails}
        handleModelSubmit={handleModelSubmit}
      />
    </div>
  )
}

export default BrandList