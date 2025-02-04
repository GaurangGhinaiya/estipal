import React, { useState } from "react";
import TextInputField from "../../../../components/common/TextInputField";

const CommissionPlan = (props) => {
  const { isEditable, staffUser } = props;
  const [commissionData, setCommissionData] = useState([
    { from: 1000, to: 5000, commission: 14 },
    { from: 5000, to: 10000, commission: 13 },
    { from: 10000, to: 20000, commission: 12 },
    { from: 20000, to: 30000, commission: 11 },
    { from: 30000, to: 40000, commission: 10 },
    { from: 40000, to: 50000, commission: 9 },
    { from: 50000, to: null, commission: 8 },
  ]);

  const handleChange = (index, field, value) => {
    const newData = [...commissionData];
    newData[index][field] = value;
    setCommissionData(newData);
  };
  return (
    <div className="px-0 sm:px-[20px] ">
      <h3 className="text-[24px] dark:text-[#ffff] text-black mb-2">
        Commission Plan
      </h3>
      <div
        className="dark:bg-[#1E252B] bg-[#F8F8F8] p-6 rounded-lg w-full mb-[15px]"
        style={{ border: "1px solid #ccc" }}
      >
        <div className="w-full ">
          {commissionData.map((row, index) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-3 lg:gap-[25px]"
              key={index}
            >
              <TextInputField
                rightTextValue="(USD)"
                type="number"
                placeholder=""
                label="From"
                name="from"
                value={row.from}
                readOnly={!isEditable}
                bgColor={staffUser ? "#ffffff" : "#283641"}
                border={staffUser ? "1px solid white" : "none"}
                onChange={(e) =>
                  handleChange(index, "from", parseInt(e.target.value))
                }
                className="mb-[15px] text-black dark:text-white"
              />

              <TextInputField
                rightTextValue="(USD)"
                type="number"
                placeholder=""
                label="To"
                name="to"
                value={row.to}
                readOnly={!isEditable}
                bgColor={staffUser ? "#ffffff" : "#283641"}
                border={staffUser ? "1px solid black" : "none"}
                onChange={(e) =>
                  handleChange(index, "to", parseInt(e.target.value))
                }
                className="mb-[15px] text-black dark:text-white"
              />

              <TextInputField
                rightTextValue="%"
                type="number"
                placeholder=""
                label="Commission"
                name="to"
                value={row.commission}
                readOnly={!isEditable}
                bgColor={staffUser ? "#ffffff" : "#283641"}
                border={staffUser ? "1px solid black" : "none"}
                onChange={(e) =>
                  handleChange(index, "commission", parseInt(e.target.value))
                }
                className="mb-[15px] text-black dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommissionPlan;
