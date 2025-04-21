import React, { useEffect } from "react";
import TextInputField from "../../../../components/common/TextInputField";
import { convertCommissionData } from "../../../admin/seller/function/convertCommissionData";

import { translate } from "../../../../language";

const StaffCommission = (props) => {
  const { isEditable, commissionData, setCommissionData, staffData } = props;

  useEffect(() => {
    if (staffData?.commission) {
      const ConvertCommission = convertCommissionData(staffData?.commission);
      if (ConvertCommission?.length > 0) {
        const transformedData = ConvertCommission?.map((item) => ({
          from: isEditable
            ? item?.from
            : item?.from
            ? `${staffData?.currency} ${item?.from}`
            : null,
          to: isEditable
            ? item?.to
            : item?.to
            ? `${staffData?.currency} ${item?.to}`
            : null,
          commission: item?.commission ? Number(item?.commission) : null,
        }));
        setCommissionData(transformedData);
      }
    }
  }, [staffData, isEditable]);

  return (
    <div className="px-[20px] ">
      <h3 className="text-[24px] dark:text-[#ffff] text-black mb-2">
        {translate("COMMISSIONPLAN")}
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
                rightTextValue={`(${staffData?.currency ?? "USD"})`}
                type={isEditable ? "number" : "text"}
                label={translate("FROM")}
                name="from"
                value={row?.from}
                readOnly={!isEditable}
                disabled={true}
                bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
                border={"1px solid white"}
                visibility={row?.from !== null ? "visible" : "hidden"}
                className="mb-[15px] text-black dark:text-white"
              />

              <TextInputField
                rightTextValue={`(${staffData?.currency ?? "USD"})`}
                type={isEditable ? "number" : "text"}
                label={translate("TO")}
                name="to"
                value={row?.to}
                readOnly={!isEditable}
                disabled={true}
                bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
                border={"1px solid black"}
                visibility={row?.to !== null ? "visible" : "hidden"}
                className="mb-[15px] text-black dark:text-white"
              />

              <TextInputField
                rightTextValue="%"
                type="number"
                placeholder=""
                label={translate("COMMISSION")}
                name="commission"
                value={row?.commission}
                readOnly={!isEditable}
                disabled={true}
                bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
                border={"1px solid black"}
                visibility={row?.commission !== null ? "visible" : "hidden"}
                className="mb-[15px] text-black dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffCommission;
