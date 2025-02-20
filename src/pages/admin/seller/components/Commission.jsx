import React, { useEffect, useState } from "react";
import TextInputField from "../../../../components/common/TextInputField";

const CommissionPlan = (props) => {
  const {
    isEditable,
    staffUser,
    sellerData,
    commissionData,
    setCommissionData,
  } = props;

  const handleChange = (index, field, value) => {
    const newData = [...commissionData];
    newData[index][field] = value;
    setCommissionData(newData);
  };

  useEffect(() => {
    if (sellerData?.commission_plan?.length > 0) {
      const transformedData = sellerData?.commission_plan?.map((item) => ({
        from: item?.from ? Number(item?.from?.replace("USD ", "")) : null,
        to: item?.to ? Number(item?.to?.replace("USD ", "")) : null, // Handle empty string
        commission: Number(item.commission) ?? null,
      }));
      setCommissionData(transformedData);
    }
  }, [sellerData?.commission_plan]);

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
          {commissionData?.map((row, index) => (
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
                value={row?.from}
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
                value={row?.to}
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
                value={row?.commission}
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
