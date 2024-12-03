import React, { useEffect, useState } from 'react';
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import CustomSwitch from '../../../components/common/CustomSwitch';
import { IoCloseCircleOutline } from "react-icons/io5";



const brands = [
  {
    "brand_name": "BrandA",
    "activeBrand": true,
    "collections": [
      {
        "collection_name": "Urban Wear",
        "activeCollection": false,
        "models": [
          { "model_name": "UrbanX1", "price": 50, "activeModel": false },
          { "model_name": "UrbanX2", "price": 60, "activeModel": false }
        ]
      },
      {
        "collection_name": "Active Fit",
        "activeCollection": false,
        "models": [
          { "model_name": "ActivePro1", "price": 70, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandB",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Luxury Line",
        "activeCollection": false,
        "models": [
          { "model_name": "Luxe1", "price": 200, "activeModel": false },
          { "model_name": "Luxe2", "price": 250, "activeModel": false },
          { "model_name": "Luxe3", "price": 300, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandC",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Eco Series",
        "activeCollection": false,
        "models": [
          { "model_name": "EcoGreen1", "price": 40, "activeModel": false },
          { "model_name": "EcoGreen2", "price": 45, "activeModel": false }
        ]
      },
      {
        "collection_name": "Nature Collection",
        "activeCollection": false,
        "models": [
          { "model_name": "NatureX", "price": 50, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandD",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Adventure Gear",
        "activeCollection": false,
        "models": [
          { "model_name": "AdvX1", "price": 100, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandE",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Minimal",
        "activeCollection": false,
        "models": [
          { "model_name": "Min1", "price": 30, "activeModel": false },
          { "model_name": "Min2", "price": 35, "activeModel": false },
          { "model_name": "Min3", "price": 40, "activeModel": false }
        ]
      },
      {
        "collection_name": "Essential",
        "activeCollection": false,
        "models": [
          { "model_name": "Ess1", "price": 25, "activeModel": false }
        ]
      },
      {
        "collection_name": "Lightweight",
        "activeCollection": false,
        "models": [
          { "model_name": "Light1", "price": 20, "activeModel": false },
          { "model_name": "Light2", "price": 22, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandF",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Classic",
        "activeCollection": false,
        "models": [
          { "model_name": "ClassA", "price": 90, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandG",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Smart Series",
        "activeCollection": false,
        "models": [
          { "model_name": "Smart1", "price": 120, "activeModel": false },
          { "model_name": "Smart2", "price": 130, "activeModel": false }
        ]
      },
      {
        "collection_name": "Tech Advanced",
        "activeCollection": false,
        "models": [
          { "model_name": "TechA1", "price": 140, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandH",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Tech Gear",
        "activeCollection": false,
        "models": [
          { "model_name": "TechX1", "price": 150, "activeModel": false },
          { "model_name": "TechX2", "price": 160, "activeModel": false },
          { "model_name": "TechX3", "price": 170, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandI",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Vintage Line",
        "activeCollection": false,
        "models": [
          { "model_name": "VintageA", "price": 75, "activeModel": false }
        ]
      },
      {
        "collection_name": "Retro Series",
        "activeCollection": false,
        "models": [
          { "model_name": "RetroB", "price": 85, "activeModel": false },
          { "model_name": "RetroC", "price": 95, "activeModel": false }
        ]
      }
    ]
  },
  {
    "brand_name": "BrandJ",
    "activeBrand": false,
    "collections": [
      {
        "collection_name": "Performance Series",
        "activeCollection": false,
        "models": [
          { "model_name": "Perform1", "price": 140, "activeModel": false }
        ]
      }
    ]
  }
];


const ModalBrand = ({ isVisible, content, onClose, onSubmit }) => {
  // console.log("isvisible",isVisible,content)
  const [inputValue, setInputValue] = useState(content);

  if (!isVisible) return null;

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit</h2>
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
              onSubmit(inputValue);
              setInputValue("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
const ModalCollection = ({ isVisible, content, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    content && setInputValue(content)
  }, [content])

  if (!isVisible) return null;

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit</h2>
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
              onSubmit(inputValue);
              setInputValue("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
const SubModalCollection = ({ isVisible, content, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    content && setInputValue(content)
  }, [content])

  if (!isVisible) return null;

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit</h2>
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
              onSubmit(inputValue);
              setInputValue("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const BrandList = () => {

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [brandSwitch, setBrandSwitch] = useState(false)
  const [collectionSwitch, setCollectionSwitch] = useState(false)
  const [modelSwitch, setModelSwitch] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [switchState, setSwitchState] = useState({
    brandActive: true,
    collectionActive: false,
    modelActive: true,
  });

  const handleSwitchChange = (name) => (e) => {
    setSwitchState((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setSelectedCollection(null); // Reset collection selection when a new brand is selected
    setSelectedModel(null); // Reset model selection
  };

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    setSelectedModel(null); // Reset model selection
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const handleModalSubmit = (value) => {
    closeModal();
  };

  return (

    <div className="p-6 h-[83vh]">
      <h1 className="text-2xl font-bold mb-4 text-white">Brands, Collections, and Models</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Box 1: Brands */}
        <div className="bg-[#1E252B] p-4 rounded-lg">
          <div className='flex justify-between flex-col md:flex-row'>
            <h2 className="text-xl font-semibold text-white mb-4">Brands</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Type brand"
                className="flex-grow p-2 rounded-l-lg"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                Add
              </button>
            </div>
          </div>
          <ul>
            {brands.map((brand, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${selectedBrand === brand ? "bg-black text-white" : "bg-gray-800 text-white"
                  }`}
                onClick={(e) => {
                  handleBrandClick(brand)
                }}
              >
                <span>{brand.brand_name}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-yellow-500" onClick={(e) => e.stopPropagation()}>
                    <FaEdit size={25} onClick={() => openModal(`${brand.brand_name}`)} />
                  </button>
                  <CustomSwitch
                    name={`brandActive${index}`}
                    checked={brand?.activeBrand}
                    onChange={handleSwitchChange("brandActive")}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button className="text-white">
                    <FaArrowCircleRight size={25} color={`${selectedBrand === brand ? "#FCA31E" : "white"}`} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Box 2: Collections */}
        {selectedBrand && <div className="bg-[#1E252B] p-4 rounded-lg">
          <div className='flex justify-between'>
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
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                Add
              </button>
            </div>
          </div>
          <ul>
            {selectedBrand?.collections.map((collection, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${selectedCollection === collection ? "bg-black text-white" : "bg-gray-800 text-white"
                  }`}
                onClick={() => handleCollectionClick(collection)}
              >
                <span>{collection.collection_name}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-yellow-500" onClick={(e) => e.stopPropagation()}>
                    <FaEdit size={25} onClick={() => openModal(`${collection.collection_name}`)} />
                  </button>
                  <CustomSwitch
                    name="modelActive"
                    checked={collection?.activeCollection}
                    onChange={handleSwitchChange("modelActive")}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button className="text-white">
                    <FaArrowCircleRight size={25} color={`${selectedCollection === collection ? "#FCA31E" : "white"}`} />
                  </button>
                </div>
              </li>
            ))}
            {!selectedBrand && <p className="text-white">Select a brand to view collections.</p>}
          </ul>
        </div>}

        {/* Box 3: Models */}
        {selectedCollection && <div className="bg-[#1E252B] p-4 rounded-lg">
          <div className='flex justify-between'>
            <div>
              <IoCloseCircleOutline color='white' size={20} onClick={() => setSelectedCollection(null)} />
              <h2 className="text-xl font-semibold text-white mb-4">Models</h2>
            </div>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Type model"
                className="flex-grow p-2 rounded-l-lg"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                Add
              </button>
            </div>
          </div>
          <ul>
            {selectedCollection?.models.map((model, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 rounded-lg cursor-pointer ${selectedModel === model ? "bg-black text-white" : "bg-gray-800 text-white"
                  }`}
              >
                <span>{model.model_name} - ${model.price}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-yellow-500" onClick={(e) => e.stopPropagation()}>
                    <FaEdit size={25} onClick={() => openModal(`${model.model_name}`)} />
                  </button>
                  <CustomSwitch name="isActive" onClick={(e) => e.stopPropagation()} checked={model?.activeModel} onChange={(e) => { setModelSwitch(e.target.value) }} />
                 
                </div>
              </li>
            ))}
            {!selectedCollection && <p className="text-white">Select a collection to view models.</p>}
          </ul>
        </div>}
      </div>
      <ModalBrand
        isVisible={isModalVisible}
        content={modalContent}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
      <ModalCollection
        isVisible={isModalVisible}
        content={modalContent}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
      <SubModalCollection
        isVisible={isModalVisible}
        content={modalContent}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}

export default BrandList