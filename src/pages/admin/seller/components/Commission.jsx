import React, { useEffect, useState } from "react";
import TextInputField from "../../../../components/common/TextInputField";
import { convertCommissionData } from "../function/convertCommissionData";

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
    if (sellerData?.commission) {
      const ConvertCommission = convertCommissionData(sellerData?.commission);
      if (ConvertCommission?.length > 0) {
        const transformedData = ConvertCommission?.map((item) => ({
          from: isEditable
            ? item?.from
            : item?.from
            ? `${sellerData?.currency} ${item?.from}`
            : null,
          to: isEditable
            ? item?.to
            : item?.to
            ? `${sellerData?.currency} ${item?.to}`
            : null,
          commission: item.commission ? Number(item.commission) : null,
        }));
        setCommissionData(transformedData);
      }
    }
  }, [sellerData, isEditable]);

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
                rightTextValue={
                  isEditable ? `(${sellerData?.currency ?? "USD"})` : ""
                }
                type={isEditable ? "number" : "text"}
                placeholder=""
                label="From"
                name="from"
                value={row?.from}
                readOnly={!isEditable}
                bgColor={staffUser ? "#ffffff" : "#283641"}
                border={staffUser ? "1px solid white" : "none"}
                visibility={row?.from !== null ? "visible" : "hidden"}
                onChange={(e) =>
                  handleChange(index, "from", parseInt(e.target.value))
                }
                className="mb-[15px] text-black dark:text-white"
              />

              <TextInputField
                rightTextValue={
                  isEditable ? `(${sellerData?.currency ?? "USD"})` : ""
                }
                type={isEditable ? "number" : "text"}
                placeholder=""
                label="To"
                name="to"
                value={row?.to}
                readOnly={!isEditable}
                bgColor={staffUser ? "#ffffff" : "#283641"}
                border={staffUser ? "1px solid black" : "none"}
                visibility={row?.to !== null ? "visible" : "hidden"}
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
                visibility={row?.commission !== null ? "visible" : "hidden"}
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
