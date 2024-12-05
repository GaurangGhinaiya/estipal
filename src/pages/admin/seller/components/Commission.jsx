import React, { useState } from "react";
import TextInputField from "../../../../components/common/TextInputField";

const CommissionPlan = (props) => {
  const { isEditable } = props;
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
    <div>
      <h3 className="text-[24px] text-white mb-2">Commission Plan</h3>
      <div
        className="bg-[#1E252B] p-6 rounded-lg w-full mb-[15px]"
        style={{ border: "1px solid #ccc" }}
      >
        <div className="w-full">
          {commissionData.map((row, index) => (
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-[25px]">
              <TextInputField
                rightTextValue="(USD)"
                type="number"
                placeholder=""
                label="From"
                name="from"
                value={row.from}
                readOnly={!isEditable}
                bgColor={"#283641"}
                onChange={(e) =>
                  handleChange(index, "from", parseInt(e.target.value))
                }
                className="mb-[15px]"
              />

              <TextInputField
                rightTextValue="(USD)"
                type="number"
                placeholder=""
                label="To"
                name="to"
                value={row.to}
                readOnly={!isEditable}
                bgColor={"#283641"}
                onChange={(e) =>
                  handleChange(index, "to", parseInt(e.target.value))
                }
                className="mb-[15px]"
              />

              <TextInputField
                rightTextValue="%"
                type="number"
                placeholder=""
                label="Commission"
                name="to"
                value={row.commission}
                readOnly={!isEditable}
                bgColor={"#283641"}
                onChange={(e) =>
                  handleChange(index, "commission", parseInt(e.target.value))
                }
                className="mb-[15px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommissionPlan;
