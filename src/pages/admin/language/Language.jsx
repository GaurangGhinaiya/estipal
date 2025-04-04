import React, { useEffect, useState } from "react";
import CustomSwitch from "../../../components/common/CustomSwitch";
import Translation from "./Translation";
import axiosInstance from "../../../services";
import { Modal, Box, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ClipLoader } from "react-spinners";

const Language = () => {
  const [languageSettings, setLanguageSettings] = useState([]);
  const [languageGroupList, setLanguageGroupList] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [selectedGroupsId, setSelectedGroupsId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [languagesSettingsResponse, languageGroupsResponse] =
        await Promise.all([
          axiosInstance.get("/languagesSetting"),
          axiosInstance.get("/languagesGroups"),
        ]);
      setLanguageSettings(languagesSettingsResponse?.payload?.data || []);
      setLanguageGroupList(languageGroupsResponse?.payload?.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLanguages = async (groupId) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/languages?show_all=true&search=${JSON.stringify({
          group_id: groupId,
        })}`
      );
      setLanguagesData(response?.payload?.data || []);
    } catch (error) {
      console.error("Error fetching languages", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleConfirm = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (selectedIndex !== null) {
      const updatedSettings = [...languageSettings];
      const updatedLanguage = updatedSettings[selectedIndex];
      updatedLanguage.enable = updatedLanguage.enable ? 0 : 1;

      setIsLoading(true);
      try {
        await axiosInstance.put(
          `/languagesSetting?id=${updatedLanguage.id}`,
          updatedLanguage
        );
        setLanguageSettings(updatedSettings);
        setIsModalOpen(false);
        setSelectedIndex(null);
      } catch (error) {
        console.error("Error updating language:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleOptionClick = (option) => {
    setSelectedGroupsId(option);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedGroupsId?.id) {
      fetchLanguages(selectedGroupsId.id);
    }
  }, [selectedGroupsId]);

  const updateItem = async (updatedItem) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/languages?id=${updatedItem?.id}`, updatedItem);
      setLanguagesData((prevData) =>
        prevData.map((item) =>
          item?.id === updatedItem.id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Error updating language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px] min-h-[100vh]">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <ClipLoader color="#fba020" size={50} />
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="text-[22px] sm:text-[32px] text-white font-medium mb-4">
            Languages
          </h1>

          <div className="w-full mb-[35px]">
            {languageSettings.map((language, index) => (
              <div
                className="w-full flex items-center gap-[25px] mb-[15px]"
                key={index}
              >
                <div className="w-[70%] lg:w-[20%] bg-[#1E252B] py-[8px] px-3 rounded-lg">
                  <div className="text-white text-[14px] font-medium px-[15px]">
                    {language?.full_name}
                  </div>
                </div>
                <CustomSwitch
                  name="isActive"
                  checked={language?.enable}
                  onChange={() => handleToggleConfirm(index)}
                />
              </div>
            ))}
          </div>

          <div className="relative w-full">
            <button
              onClick={toggleDropdown}
              className="w-full bg-[#1E252B] text-[#fba020] py-3 px-4 rounded-lg flex justify-between items-center"
            >
              <span className="text-center w-full">
                {selectedGroupsId ? selectedGroupsId?.name : "Choose a group"}
              </span>
              <span
                className={`transform transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {isOpen && (
              <ul className="absolute w-full bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-700 rounded-b-md">
                {languageGroupList.map((option) => (
                  <li
                    key={option?.id}
                    onClick={() => handleOptionClick(option)}
                    className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${
                      selectedGroupsId?.id === option?.id
                        ? "bg-blue-600 text-white"
                        : "text-black"
                    }`}
                  >
                    {option?.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedGroupsId && (
            <>
              <h1 className="text-[22px] sm:text-[32px] text-white font-medium mb-4 mt-[25px]">
                Translation
              </h1>
              <div>
                {languagesData.map((item) => (
                  <Translation
                    key={item?.id}
                    item={item}
                    updateItem={updateItem}
                  />
                ))}
              </div>
            </>
          )}

          {/* Modal */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "#1E252B",
                boxShadow: 24,
                py: 2,
                borderRadius: 2,
              }}
            >
              <div
                onClick={handleCloseModal}
                className="flex justify-end pr-[16px] pb-[16px] cursor-pointer"
              >
                <CloseIcon className="text-white font-semibold" />
              </div>
              <div className="text-white text-center text-[18px] font-medium px-6">
                Are you sure you want to change the language status?
              </div>
              <Divider className="!border-white" />
              <Box
                mt={2}
                display="flex"
                sx={{ px: "16px" }}
                justifyContent="flex-end"
                gap={1.5}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmToggle}
                >
                  Confirm
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Language;
