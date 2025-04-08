import React, { useEffect, useState } from "react";
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import CustomSwitch from "../../../components/common/CustomSwitch";
import axiosInstance from "../../../services";
import { ModalBrand } from "./ModalBrand";
import { ModalCollection } from "./ModalCollection";
import { SubModalCollection } from "./SubModalCollection";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const BrandList = () => {
  const [brandData, setBrandData] = useState([]);
  const [brandDetails, setBrandDetails] = useState({});
  const [brandName, setBrandName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelName, setModelName] = useState("");
  const [modelDesc, setModelDesc] = useState("");
  const [modelDetails, setModelDetails] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modelData, setModelData] = useState([]);
  const [isModalVisibleBrand, setModalVisibleBrand] = useState(false);
  const [isModalVisibleCollection, setModalVisibleCollection] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [switchState, setSwitchState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchChange = (name, index) => (e) => {
    const dynamicKey = `${name}${index}`;
    setSwitchState((prev) => ({
      ...prev,
      [dynamicKey]: e.target.checked,
    }));
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand?.brand);
    setBrandDetails(brand);
    setSelectedCollection(null);
    setSelectedModel(null);
  };

  const handleCollectionClick = (collection) => {
    setCollectionDetails(collection);
    setSelectedCollection(collection?.model_no);
    setSelectedModel(null);
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
      setIsLoading(true);
      const updatedBrand = {
        brand: value,
        active: brandDetails?.active,
      };
      const response = await axiosInstance.put(
        `watchBrands?id=${brandDetails?.id}`,
        updatedBrand
      );
      toast.success("Brand updated successfully!");
      getBrandList();
      closeModalBrand();
    } catch (error) {
      toast.error("Failed to update brand.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBrandList = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `watchBrands?records_per_page=${50}`
      );
      setBrandData(response?.payload?.data);
    } catch (error) {
      toast.error("Failed to fetch brand list.");
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBrandList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBrandAdd = async () => {
    try {
      setIsLoading(true);
      const newBrandValue = {
        brand: brandName,
      };
      const response = await axiosInstance.post(`watchBrands`, newBrandValue);
      toast.success("Brand added successfully!");
      setBrandName("");
      getBrandList();
    } catch (error) {
      toast.error("Failed to add brand.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCollectionList = async () => {
    try {
      setIsLoading(true);
      const searchValue = JSON.stringify({ brand_id: brandDetails?.id });
      const response = await axiosInstance.get(
        `/watchModel?page=${1}&records_per_page=${25}&search=${searchValue}`
      );
      setCollectionData(response?.payload?.data);
    } catch (error) {
      toast.error("Failed to fetch collections.");
      console.log("errrorr", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBrand) {
      getCollectionList();
    }
  }, [selectedBrand]);

  const newCollectionValue = {
    brand_id: brandDetails?.id,
    model_no: collectionName,
    active: true,
  };
  const handleCollectionAdd = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `watchModel`,
        newCollectionValue
      );
      toast.success("Collection added successfully!");
      getCollectionList();
      setCollectionName("");
    } catch (error) {
      toast.error("Failed to add collection.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollectionSubmit = async (value) => {
    try {
      setIsLoading(true);
      const updatedCollection = {
        brand_id: collectionDetails?.brand_id,
        model_no: value,
        serial_no: value,
        active: true,
      };
      const response = await axiosInstance.put(
        `watchModel?id=${collectionDetails?.id}`,
        updatedCollection
      );
      toast.success("Collection updated successfully!");
      getCollectionList();
      closeModalCollection();
    } catch (error) {
      toast.error("Failed to update collection.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModelList = async () => {
    try {
      setIsLoading(true);
      const searchValue = JSON.stringify({ model_id: collectionDetails?.id });
      const response = await axiosInstance.get(
        `watchSerialNo?page=${1}&records_per_page=${50}&search=${searchValue}`
      );
      setModelData(response?.payload?.data);
    } catch (error) {
      toast.error("Failed to fetch models.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCollection) {
      getModelList();
    }
  }, [selectedCollection]);

  const handleAddModel = async () => {
    try {
      setIsLoading(true);
      const newModelValue = {
        model_id: collectionDetails?.id,
        serial_no: modelName,
        serial_desc: modelDesc,
        active: true,
      };
      const response = await axiosInstance.post(`watchSerialNo`, newModelValue);
      toast.success("Model added successfully!");
      getModelList();
      setModelName("");
      setModelDesc("");
    } catch (error) {
      toast.error("Failed to add model.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelSubmit = async (serialDesc, serialNo) => {
    try {
      setIsLoading(true);
      const newModelValue = {
        serial_desc: serialDesc,
        serial_no: serialNo,
        active: true,
      };
      const response = await axiosInstance.put(
        `watchSerialNo?id=${modelDetails?.id}`,
        newModelValue
      );
      toast.success("Model updated successfully!");
      getModelList();
      closeModal();
    } catch (error) {
      toast.error("Failed to update model.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:p-6 min-h-[83vh]">
      {isLoading && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 justify-center items-center">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4 text-white">
        Brands, Collections, and Models
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {/* Box 1: Brands */}
        <div className="bg-[#1E252B] p-4 rounded-lg h-[700px] overflow-hidden">
          <div className="flex justify-between flex-col md:flex-row">
            <h2 className="text-xl font-semibold text-white mb-4">Brands</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Type brand"
                className="flex-grow p-2 rounded-l-lg"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
              <button
                onClick={handleBrandAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
              >
                Add
              </button>
            </div>
          </div>
          <ul className="h-[630px] overflow-y-scroll">
            {brandData?.map((brand, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${
                  selectedBrand === brand?.brand
                    ? "bg-black text-white"
                    : "bg-gray-800 text-white"
                }`}
                onClick={(e) => {
                  handleBrandClick(brand);
                }}
              >
                <span>{brand.brand}</span>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-yellow-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaEdit
                      size={25}
                      onClick={() => {
                        openModalBrand(`${brand?.brand}`);
                        setBrandDetails(brand);
                      }}
                    />
                  </button>
                  <div onClick={(e) => e.stopPropagation()}>
                    <CustomSwitch
                      name={`brandActive${brand?.id}`}
                      checked={
                        switchState[`brandActive${brand?.id}`] ?? brand?.active
                      }
                      onChange={handleSwitchChange("brandActive", brand?.id)}
                    />
                  </div>
                  <button className="text-white">
                    <FaArrowCircleRight
                      size={25}
                      color={`${
                        selectedBrand === brand?.active ? "#FCA31E" : "white"
                      }`}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Box 2: Collections */}
        {selectedBrand && (
          <div className="bg-[#1E252B] p-4 rounded-lg h-[700px] overflow-hidden">
            <div className="flex justify-between flex-col md:flex-row">
              <div>
                <IoCloseCircleOutline
                  color="white"
                  size={20}
                  onClick={(e) => {
                    setSelectedCollection(null);
                    setSelectedBrand(null);
                  }}
                />
                <h2 className="text-xl font-semibold text-white mb-4">
                  Collections
                </h2>
              </div>
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Type collection"
                  className="flex-grow p-2 rounded-l-lg"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
                <button
                  onClick={handleCollectionAdd}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                >
                  Add
                </button>
              </div>
            </div>
            <ul className="h-[620px] overflow-y-scroll">
              {collectionData?.map((collection, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${
                    selectedCollection === collection.model_no
                      ? "bg-black text-white"
                      : "bg-gray-800 text-white"
                  }`}
                  onClick={() => handleCollectionClick(collection)}
                >
                  <span>{collection?.model_no}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-yellow-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaEdit
                        size={25}
                        onClick={() => {
                          openModalCollection(`${collection?.model_no}`);
                          setCollectionDetails(collection);
                        }}
                      />
                    </button>
                    <div onClick={(e) => e.stopPropagation()}>
                      <CustomSwitch
                        name={`collectionActive${collection?.id}`}
                        checked={
                          switchState[`collectionActive${collection?.id}`] ??
                          collection?.model_no
                        }
                        onChange={handleSwitchChange(
                          "collectionActive",
                          collection?.id
                        )}
                      />
                    </div>
                    <button className="text-white">
                      <FaArrowCircleRight
                        size={25}
                        color={`${
                          selectedCollection === collection.model_no
                            ? "#FCA31E"
                            : "white"
                        }`}
                      />
                    </button>
                  </div>
                </li>
              ))}
              {!selectedBrand && (
                <p className="text-white">
                  Select a brand to view collections.
                </p>
              )}
            </ul>
          </div>
        )}

        {/* Box 3: Models */}
        {selectedCollection && (
          <div className="bg-[#1E252B] p-4 rounded-lg h-[700px] overflow-hidden">
            <div className="flex justify-between  flex-wrap">
              <div>
                <IoCloseCircleOutline
                  color="white"
                  size={20}
                  onClick={() => setSelectedCollection(null)}
                />
                <h2 className="text-xl font-semibold text-white mb-4">
                  Models
                </h2>
              </div>
              <div className="flex mb-4 max-2xl:flex-wrap max-2xl:gap-[10px]">
                <input
                  type="text"
                  placeholder="Type model"
                  className="flex-grow p-2 rounded-l-lg mr-[1px]"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Reference"
                  className="flex-grow p-2"
                  value={modelDesc}
                  onChange={(e) => setModelDesc(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleAddModel();
                    // setModelDetails(model)
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                >
                  Add
                </button>
              </div>
            </div>
            <ul className="h-[620px] overflow-y-scroll">
              {modelData?.map((model, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${
                    selectedModel === model?.serial_no
                      ? "bg-black text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  <div>
                    <p>
                      {index + 1}. {model?.serial_desc}{" "}
                    </p>
                    <span>{model?.serial_no}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-yellow-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaEdit
                        size={25}
                        onClick={() => {
                          openModal(`${model?.serial_no}`);
                          setModelDetails(model);
                        }}
                      />
                    </button>
                    <div onClick={(e) => e.stopPropagation()}>
                      <CustomSwitch
                        name={`modelActive${model?.id}`}
                        checked={
                          switchState[`modelActive${model?.id}`] ??
                          model?.active
                        }
                        onChange={handleSwitchChange("modelActive", model?.id)}
                      />
                    </div>
                  </div>
                </li>
              ))}
              {!selectedCollection && (
                <p className="text-white">
                  Select a collection to view models.
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
      <ModalBrand
        isModalVisibleBrand={isModalVisibleBrand}
        content={modalContent}
        onClose={closeModalBrand}
        handleBrandModalSubmit={handleBrandModalSubmit}
        brandDetails={brandDetails}
        setModalVisibleBrand={setModalVisibleBrand}
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
  );
};

export default BrandList;
