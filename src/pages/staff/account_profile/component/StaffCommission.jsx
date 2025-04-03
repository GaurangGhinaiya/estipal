import React, { useEffect, useState } from "react";
import { convertCommissionData } from "../../../admin/seller/function/convertCommissionData";
import TextInputField from "../../../../components/common/TextInputField";
import { useTranslation } from "react-i18next";

const StaffCommission = (props) => {
    const {
        isEditable,
        userRole,
        sellerData,
        commissionData,
        setCommissionData,
    } = props;
    const { t } = useTranslation();

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
                    commission: item?.commission ? Number(item?.commission) : null,
                }));
                setCommissionData(transformedData);
            }
        }
    }, [sellerData, isEditable]);

    return (
        <div className="px-0 sm:px-[20px] ">
            <h3 className="text-[24px] dark:text-[#ffff] text-black mb-2">
                {t("COMMISSIONPLAN")}:
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
                                    `(${sellerData?.currency ?? "USD"})`
                                }
                                type={isEditable ? "number" : "text"}
                                label={t("FROM")}
                                name="from"
                                value={row?.from}
                                readOnly={!isEditable}
                                disabled={true}
                                bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
                                border={"1px solid white"}
                                visibility={row?.from !== null ? "visible" : "hidden"}
                                onChange={(e) =>
                                    handleChange(index, "from", parseInt(e.target.value))
                                }
                                className="mb-[15px] text-black dark:text-white"
                            />

                            <TextInputField
                                rightTextValue={
                                    `(${sellerData?.currency ?? "USD"})`
                                }
                                type={isEditable ? "number" : "text"}
                                label={t("TO")}
                                name="to"
                                value={row?.to}
                                readOnly={!isEditable}
                                disabled={true}
                                bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
                                border={"1px solid black"}
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
                                label={t("COMMISSION")}
                                name="commission"
                                value={row?.commission}
                                readOnly={!isEditable}
                                disabled={true}
                                bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
                                border={"1px solid black"}
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

export default StaffCommission;
