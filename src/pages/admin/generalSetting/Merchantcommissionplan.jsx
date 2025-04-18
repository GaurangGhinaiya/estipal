import React, { useEffect } from "react";
import TextInputField from "../../../components/common/TextInputField";
import { convertCommissionData } from "../seller/function/convertCommissionData";

const Merchantcommissionplan = ({
  isEditable,
  setCommissionData,
  commissionData,
  data,
  setData,
  staffUser,
  currency,
}) => {
  const handleChange = (index, field, value) => {
    const newData = [...commissionData];
    newData[index][field] = value;
    setCommissionData(newData);
  };

  useEffect(() => {
    if (data?.commission_plan) {
      const ConvertCommission = convertCommissionData(data?.commission_plan);
      if (
        ConvertCommission?.length > 0 &&
        JSON.stringify(commissionData) !==
          JSON.stringify(
            ConvertCommission.map((item) => ({
              from: isEditable
                ? item?.from
                : item?.from
                ? `${currency} ${item?.from}`
                : null,
              to: isEditable
                ? item?.to
                : item?.to
                ? `${currency} ${item?.to}`
                : null,
              commission: item.commission ? Number(item.commission) : null,
            }))
          )
      ) {
        const transformedData = ConvertCommission.map((item) => ({
          from: isEditable
            ? item?.from
            : item?.from
            ? `${currency} ${item?.from}`
            : 0,
          to: isEditable ? item?.to : item?.to ? `${currency} ${item?.to}` : 0,
          commission: item.commission ? Number(item.commission) : 0,
        }));
        setCommissionData(transformedData);
      }
    }
  }, [data?.commission_plan, isEditable, currency]);

  return (
    <div className="bg-[#1E252B] p-6 rounded-lg w-full mb-[15px]">
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
                  isEditable ? `(${data?.userDetail?.currency ?? "USD"})` : ""
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
                  isEditable ? `(${data?.userDetail?.currency ?? "USD"})` : ""
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

      <div className="space-y-6 text-white">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium">
            Seller profit sharing when 'Be partner with Estipal' is selected
          </span>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={data?.seller_partner_commision}
              readOnly={!isEditable}
              className="w-[70px] flex items-center justify-center text-center px-2 py-1 bg-gray-700 text-[#FFA13C] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-[#3c8dbc]"
              onChange={(e) =>
                setData({ ...data, seller_partner_commision: e.target.value })
              }
            />
            <span>{"%"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchantcommissionplan;
