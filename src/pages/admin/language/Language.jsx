import React, { useState } from "react";
import CustomSwitch from "../../../components/common/CustomSwitch";
import Translation from "./Translation";

const Language = () => {
  const languages = [
    { name: "English", enabled: true },
    { name: "Italiano", enabled: true },
    { name: "简体中文", enabled: true },
    { name: "Português", enabled: true },
    { name: "ภาษาไทย", enabled: false },
    { name: "Español", enabled: false },
    { name: "日本語", enabled: false },
    { name: "العربية", enabled: false },
    { name: "עברית", enabled: false },
    { name: "हिंदी", enabled: false },
  ];

  const [languageSettings, setLanguageSettings] = useState(languages);

  const toggleLanguage = (index) => {
    const updatedSettings = [...languageSettings];
    updatedSettings[index].enabled = !updatedSettings[index].enabled;
    setLanguageSettings(updatedSettings);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Activities",
    "Read Activity",
    "Watches History",
    "Watch Details",
    "Revenue Analysis",
    "Manage Users",
    "Account Profile",
    "Sidemenu",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px] min-h-[100vh]">
      <h1 className="text-[22px] sm:text-[32px] text-white font-medium mb-4">
        Languages
      </h1>
      <div className="w-full mb-[35px]">
        {languageSettings?.map((language, index) => (
          <div className="w-full flex items-center gap-[25px] mb-[15px]">
            <div className="w-[70%] lg:w-[20%] bg-[#1E252B] py-[8px] px-3 rounded-lg">
              <div
                key={index}
                className="text-white text-[14px] font-medium px-[15px]"
              >
                {language?.name}
              </div>
            </div>
            <div>
              <CustomSwitch
                name="isActive"
                checked={language?.enabled}
                onChange={() => toggleLanguage(index)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-full">
        {/* Dropdown Trigger */}
        <button
          onClick={toggleDropdown}
          className="w-full bg-[#1E252B] text-[#fba020] py-3 px-4 rounded-lg flex justify-between items-center"
        >
          <span className="text-center w-full">
            {selectedOption ? selectedOption : "Choose a group"}
          </span>
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
        {/* Dropdown Options */}
        {isOpen && (
          <ul className="absolute w-full bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-700 rounded-b-md">
            {options?.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${
                  selectedOption === option
                    ? "bg-blue-600 text-white"
                    : "text-black"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedOption !== "" && (
        <h1 className="text-[22px] sm:text-[32px] text-white font-medium mb-4 mt-[25px]">
          Translation
        </h1>
      )}

      {selectedOption !== "" && (
        <div>
          <Translation />
          <Translation />
          <Translation />
          <Translation />
          <Translation />
        </div>
      )}
    </div>
  );
};

export default Language;
