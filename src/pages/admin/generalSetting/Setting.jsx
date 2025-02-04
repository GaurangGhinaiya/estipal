import React, { useState } from "react";
import TextInputField from "../../../components/common/TextInputField";
import CustomSwitch from "../../../components/common/CustomSwitch";
import Merchantcommissionplan from "./Merchantcommissionplan";
import ResponseTimeLimits from "./ResponseTimeLimits";

const Settings = () => {
  const [isEditable, setIsEditable] = useState(false);

  const [emailList, setEmailList] = useState([
    {
      name: "email1",
      label: "Email 1",
      isActive: true,
      switchName: "isActive1",
    },
    {
      name: "email2",
      label: "Email 2",
      isActive: true,
      switchName: "isActive2",
    },
    {
      name: "email3",
      label: "Email 3",
      isActive: false,
      switchName: "isActive3",
    },
    {
      name: "email4",
      label: "Email 4",
      isActive: true,
      switchName: "isActive4",
    },
  ]);

  const handleSwitchChange = (index) => {
    const updatedList = [...emailList];
    updatedList[index].isActive = !updatedList[index].isActive;
    setEmailList(updatedList);
  };

  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px]">
      <div className="">
        <div className="flex sm:flex-row flex-col gap-[14px] sm:items-center justify-between mb-[15px]">
          <h1 className="text-[22px] sm:text-[28px] text-white font-medium">
            General Settings
          </h1>
          <div className="flex space-x-4">
            {!isEditable ? (
              <button
                onClick={() => setIsEditable(true)}
                className="bg-[#3C8DBC] text-white text-[16px] font-normal px-[28px] py-[8px] sm:px-[40px] sm:py-[10px] rounded-full"
              >
                Edit
              </button>
            ) : (
              <>
                {" "}
                <button className="bg-[#00A65A] text-white text-[16px] font-normal px-[28px] py-[8px] sm:px-[40px] sm:py-[10px] rounded-full">
                  Save
                </button>
                <button
                  onClick={() => setIsEditable(false)}
                  className="bg-gray-300 text-gray-800 text-[16px] font-normal px-[28px] py-[8px] sm:px-[40px] sm:py-[10px] rounded-full"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[25px] w-full lg:w-[70%]">
          <div className="w-full sm:w-1/2">
            <TextInputField
              rightTextValue=""
              type="email"
              placeholder="Enter email"
              label="Email"
              name="email"
              //   value=""
              readOnly={!isEditable}
              bgColor={"#1e252b"}
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-[15px]">
            <TextInputField
              rightTextValue=""
              type="password"
              placeholder="New password"
              label="Password"
              name="password"
              //   value=""
              readOnly={!isEditable}
              bgColor={"#1e252b"}
            />
            <TextInputField
              rightTextValue=""
              type="password"
              placeholder="Re-type password"
              label=""
              name="reTypePassword"
              //   value=""
              readOnly={!isEditable}
              bgColor={"#1e252b"}
            />
          </div>
        </div>
      </div>
      <h1 className="text-[22px] sm:text-[28px] pt-[16px] text-white font-medium mb-2">
        Secondary email recepients (BCC)
      </h1>
      {emailList?.map((email, index) => (
        <div
          key={index}
          className="w-full lg:w-[70%] pr-[12.5px] flex sm:flex-row flex-col items-end sm:items-center gap-[10px] sm:gap-[25px] mb-[15px]"
        >
          <div className="w-full sm:w-1/2">
            <TextInputField
              rightTextValue=""
              type="text"
              placeholder={`Enter ${email.label.toLowerCase()}`}
              label={email.label}
              name={email.name}
              readOnly={!isEditable}
              bgColor="#1e252b"
            />
          </div>
          <CustomSwitch
            name={email.switchName}
            checked={email.isActive}
            onChange={() => handleSwitchChange(index)}
          />
        </div>
      ))}
      <h1 className="text-[22px] sm:text-[28px] text-white font-medium mb-2 my-[22px]">
        Response time limits
      </h1>
      <ResponseTimeLimits />
      <h1 className="text-[22px] sm:text-[28px] text-white font-medium mb-2 my-[22px]">
        Estimator commission (default setting)
      </h1>
      <div className="bg-[#1E252B] p-6 rounded-lg w-full mb-[15px]">
        <div className="space-y-6 text-white">
          <SettingRow title="Estimator commission" value="10" unit="%" />
        </div>
      </div>

      <h1 className="text-[22px] sm:text-[28px] text-white font-medium mb-2 my-[22px]">
        Merchant commission plan (default setting)
      </h1>
      <Merchantcommissionplan isEditable={isEditable} />
    </div>
  );
};

const SettingRow = ({ title, value, unit }) => {
  return (
    <div className="flex items-center w-full justify-between lg:justify-start">
      <span className="text-sm font-medium w-[45%]">{title}</span>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          className="w-[70px] flex items-center justify-center text-center px-2 py-1 bg-gray-700 text-[#FFA13C] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-[#3c8dbc]"
        />
        <span>{unit}</span>
      </div>
    </div>
  );
};

export default Settings;
