import React, { useEffect, useState } from "react";
import TextInputField from "../../../../components/common/TextInputField";
import { convertCommissionData } from "../function/convertCommissionData";

const CommissionPlan = (props) => {
  const {
    isEditable,
    userRole,
    sellerData,
    commissionData,
    setCommissionData,
  } = props;

  const handleChange = (index, field, value) => {
    const newData = [...commissionData];
    newData[index][field] = value === "" ? 0 : value;
    setCommissionData(newData);
  };

  useEffect(() => {
    if (sellerData?.commission) {
      const ConvertCommission = convertCommissionData(sellerData?.commission);
      if (ConvertCommission?.length > 0) {
        const transformedData = ConvertCommission?.map((item) => ({
          from: isEditable
            ? item?.from || item?.from === 0
              ? Number(item?.from)
              : null
            : item?.from || item?.from === 0
            ? `${sellerData?.currency} ${item?.from}`
            : null,
          to: isEditable
            ? item?.to || item?.to === 0
              ? Number(item?.to)
              : null
            : item?.to || item?.to === 0
            ? `${sellerData?.currency} ${item?.to}`
            : null,
          commission:
            item.commission || item?.commission === 0
              ? Number(item.commission)
              : null,
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
              <div>
                {row?.from !== null && (
                  <TextInputField
                    rightTextValue={
                      isEditable ? `(${sellerData?.currency ?? "USD"})` : ""
                    }
                    type={isEditable ? "number" : "text"}
                    placeholder=""
                    label={
                      index === commissionData.length - 1 ? "Over" : "From"
                    }
                    name="from"
                    value={row?.from}
                    readOnly={!isEditable}
                    bgColor={userRole === "staff" ? "#ffffff" : "#283641"}
                    border={userRole === "staff" ? "1px solid white" : "none"}
                    onChange={(e) =>
                      handleChange(index, "from", parseInt(e.target.value))
                    }
                    className="mb-[15px] text-black dark:text-white"
                  />
                )}
              </div>

              <div>
                {row?.to !== null && (
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
                    bgColor={userRole === "staff" ? "#ffffff" : "#283641"}
                    border={userRole === "staff" ? "1px solid black" : "none"}
                    onChange={(e) =>
                      handleChange(index, "to", parseInt(e.target.value))
                    }
                    className="mb-[15px] text-black dark:text-white"
                  />
                )}
              </div>

              <div>
                {row?.commission !== null && (
                  <TextInputField
                    rightTextValue="%"
                    type="number"
                    placeholder=""
                    label="Commission"
                    name="to"
                    value={row?.commission}
                    readOnly={!isEditable}
                    bgColor={userRole === "staff" ? "#ffffff" : "#283641"}
                    border={userRole === "staff" ? "1px solid black" : "none"}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "commission",
                        parseInt(e.target.value)
                      )
                    }
                    className="mb-[15px] text-black dark:text-white"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommissionPlan;
