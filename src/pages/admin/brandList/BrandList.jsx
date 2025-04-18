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
  const [iSEditBrandDetailsData, setISEditBrandDetailsData] = useState({});
  const [brandName, setBrandName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});
  const [iSEditCollectionData, setISEditCollectionData] = useState({});
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelName, setModelName] = useState("");
  const [modelDesc, setModelDesc] = useState("");
  const [modelDetails, setModelDetails] = useState({});
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
    setISEditBrandDetailsData({});
  };

  const openModalCollection = (content) => {
    setModalContent(content);
    setModalVisibleCollection(true);
  };

  const closeModalCollection = () => {
    setModalVisibleCollection(false);
    setModalContent("");
    setISEditCollectionData({});
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
    setModelDetails({});
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

  const handleBrandSubmit = async (value) => {
    if (value == "") {
      toast.error("Brand is required!");
      return;
    }

    const isEdit = !!iSEditBrandDetailsData?.id;

    try {
      setIsLoading(true);

      const brandData = {
        brand: value,
        ...(isEdit && { active: iSEditBrandDetailsData.active }),
      };

      const response = isEdit
        ? await axiosInstance.put(
            `watchBrands?id=${iSEditBrandDetailsData.id}`,
            brandData
          )
        : await axiosInstance.post(`watchBrands`, brandData);

      toast.success(`Brand ${isEdit ? "updated" : "added"} successfully!`);

      if (!isEdit) {
        setBrandName("");
      }

      getBrandList();
      setISEditBrandDetailsData({});

      if (isEdit) {
        closeModalBrand();
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message === "brand is required.") {
        toast.error(message);
      } else {
        toast.error(message || `Failed to ${isEdit ? "update" : "add"} brand.`);
      }
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

  const handleCollectionSave = async (value) => {
    if (value == "") {
      toast.error("Collection is required!");
      return;
    }
    const isEdit = !!iSEditCollectionData?.id;

    try {
      setIsLoading(true);

      const payload = isEdit
        ? {
            brand_id: iSEditCollectionData.brand_id,
            model_no: value,
            serial_no: value,
            active: true,
          }
        : newCollectionValue;

      const response = isEdit
        ? await axiosInstance.put(
            `watchModel?id=${iSEditCollectionData?.id}`,
            payload
          )
        : await axiosInstance.post(`watchModel`, payload);

      toast.success(`Collection ${isEdit ? "updated" : "added"} successfully!`);

      getCollectionList();
      setISEditCollectionData({});

      if (isEdit) {
        closeModalCollection();
      } else {
        setCollectionName("");
      }
    } catch (error) {
      const message = error?.response?.data?.message;

      if (message === "model_no is required.") {
        toast.error("Collection is required!");
      } else {
        toast.error(
          message || `Failed to ${isEdit ? "update" : "add"} collection.`
        );
      }

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

  const handleModelSave = async (serialDesc, serialNo) => {
    if (serialNo == "") {
      toast.error("Model type is required!");
      return;
    }
    if (serialDesc == "") {
      toast.error("Reference is required!");
      return;
    }

    const isEdit = !!modelDetails?.id;

    try {
      setIsLoading(true);

      const payload = isEdit
        ? {
            serial_no: serialNo,
            serial_desc: serialDesc,
            active: true,
          }
        : {
            model_id: collectionDetails?.id,
            serial_no: serialNo,
            serial_desc: serialDesc,
            active: true,
          };

      const response = isEdit
        ? await axiosInstance.put(
            `watchSerialNo?id=${modelDetails.id}`,
            payload
          )
        : await axiosInstance.post(`watchSerialNo`, payload);

      toast.success(`Model ${isEdit ? "updated" : "added"} successfully!`);

      getModelList();

      if (isEdit) {
        closeModal();
      } else {
        setModelName("");
        setModelDesc("");
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (!isEdit && message === "serial_no is required.") {
        toast.error("Model type is required!");
      } else if (!isEdit && message === "serial_desc is required.") {
        toast.error("Reference is required!");
      } else {
        toast.error(message || `Failed to ${isEdit ? "update" : "add"} model.`);
      }
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
                onClick={() => handleBrandSubmit(brandName)}
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
                        setISEditBrandDetailsData(brand);
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
                  onClick={() => handleCollectionSave(collectionName)}
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
                          setISEditCollectionData(collection);
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
                    handleModelSave(modelDesc, modelName);
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
        onClose={closeModalBrand}
        handleBrandModalSubmit={handleBrandSubmit}
        iSEditBrandDetailsData={iSEditBrandDetailsData}
      />
      <ModalCollection
        isModalVisibleCollection={isModalVisibleCollection}
        onClose={closeModalCollection}
        handleCollectionSubmit={handleCollectionSave}
        iSEditCollectionData={iSEditCollectionData}
      />
      <SubModalCollection
        isVisible={isModalVisible}
        content={modalContent}
        onClose={closeModal}
        modelDetails={modelDetails}
        handleModelSubmit={handleModelSave}
      />
    </div>
  );
};

export default BrandList;
