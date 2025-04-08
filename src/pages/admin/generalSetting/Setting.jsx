import React, { useEffect, useState } from "react";
import TextInputField from "../../../components/common/TextInputField";
import CustomSwitch from "../../../components/common/CustomSwitch";
import Merchantcommissionplan from "./Merchantcommissionplan";
import ResponseTimeLimits from "./ResponseTimeLimits";
import axiosInstance from "../../../services";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { ClipLoader } from "react-spinners";

const Settings = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [currency, setCurrency] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/adminUserSetting/detail`);

      const val = {
        commission_plan: response?.payload?.estCommission,
        email: response?.payload?.userDetail?.email,
        est_commission: response?.payload?.userDetail?.est_commission,
        staff_expire_time:
          response?.payload?.adminManagementResponseTimes?.rows.find(
            (item) => item.manage_user_id === "staff"
          )?.add_response_time || "N/A",
        admin_assign_time:
          response?.payload?.adminManagementResponseTimes?.rows.find(
            (item) => item.manage_user_id === "super_admin_action"
          )?.add_response_time || "N/A",
        quotation_expire_time:
          response?.payload?.adminManagementResponseTimes?.rows.find(
            (item) => item.manage_user_id === "quotation"
          )?.add_response_time || "N/A",
        est_expire_time:
          response?.payload?.adminManagementResponseTimes?.rows.find(
            (item) => item.manage_user_id === "est"
          )?.add_response_time || "N/A",
        staff_reminder:
          response?.payload?.adminManagementResponseTimes?.rows.find(
            (item) => item.manage_user_id === "staff_reminder"
          )?.add_response_time || "N/A",
        staff_every_hour_reminder:
          response?.payload?.adminManagementResponseTimes?.rows.find(
            (item) => item.manage_user_id === "staff_every_hour_reminder"
          )?.add_response_time || "N/A",
        seller_partner_commision:
          response?.payload?.adminManagementResponseTimes?.rows.find(
            (item) => item.manage_user_id === "seller_partnership_commision"
          )?.add_response_time || "N/A",
        support_email:
          response?.payload?.secondaryEmails?.secondary_email_1?.email,
        support_email_2:
          response?.payload?.secondaryEmails?.secondary_email_2?.email,
        support_email_3:
          response?.payload?.secondaryEmails?.secondary_email_3?.email,
        support_email_4:
          response?.payload?.secondaryEmails?.secondary_email_4?.email,
        check_1: response?.payload?.secondaryEmails?.secondary_email_1?.active,
        check_2: response?.payload?.secondaryEmails?.secondary_email_2?.active,
        check_3: response?.payload?.secondaryEmails?.secondary_email_3?.active,
        check_4: response?.payload?.secondaryEmails?.secondary_email_4?.active,
        estimate_response_limit:
          response?.payload?.adminEstimatorsResponseTime?.rows[0]
            ?.estimator_response_time,
        new_password: "",
        retype_password: "",
      };

      setData(val);
      setCurrency(response?.payload?.userDetail?.currency || "USD");
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [commissionData, setCommissionData] = useState([]);

  const [commissionObject, setCommissionObject] = useState({});

  useEffect(() => {
    const transformCommissionData = () => {
      const transformedData = {
        br1: {
          price_range: [
            parseFloat(commissionData[0]?.from) || 0,
            parseFloat(commissionData[0]?.to) || 0,
          ],
          value: parseFloat(commissionData[0]?.commission) || 0,
        },
        br2: {
          price_range: [
            parseFloat(commissionData[1]?.from) || 0,
            parseFloat(commissionData[1]?.to) || 0,
          ],
          value: parseFloat(commissionData[1]?.commission) || 0,
        },
        br3: {
          price_range: [
            parseFloat(commissionData[2]?.from) || 0,
            parseFloat(commissionData[2]?.to) || 0,
          ],
          value: parseFloat(commissionData[2]?.commission) || 0,
        },
        br4: {
          price_range: [
            parseFloat(commissionData[3]?.from) || 0,
            parseFloat(commissionData[3]?.to) || 0,
          ],
          value: parseFloat(commissionData[3]?.commission) || 0,
        },
        br5: {
          price_range: [
            parseFloat(commissionData[4]?.from) || 0,
            parseFloat(commissionData[4]?.to) || 0,
          ],
          value: parseFloat(commissionData[4]?.commission) || 0,
        },
        br6: {
          price_range: [
            parseFloat(commissionData[5]?.from) || 0,
            parseFloat(commissionData[5]?.to) || 0,
          ],
          value: parseFloat(commissionData[5]?.commission) || 0,
        },
        br7: {
          price_range: [parseFloat(commissionData[6]?.from) || 0],
          value: parseFloat(commissionData[6]?.commission) || 0,
        },
      };
      setCommissionObject(transformedData);
    };

    transformCommissionData();
  }, [commissionData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/adminUserSetting`, {
        ...data,
        commission_plan: commissionObject,
      });
      if (response?.status === 200) {
        fetchData();
        toast.success("Settings updated successfully!");
        setIsEditable(false);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-[10px] sm:px-[45px] py-[20px]">
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
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
                  onClick={handleSubmit}
                >
                  Save
                </LoadingButton>
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
              value={data?.email}
              readOnly={!isEditable}
              bgColor={"#1e252b"}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-[15px]">
            <TextInputField
              rightTextValue=""
              type="password"
              placeholder="New password"
              label="Password"
              name="password"
              autoComplete={false}
              value={data?.new_password}
              readOnly={!isEditable}
              bgColor={"#1e252b"}
              onChange={(e) =>
                setData({ ...data, new_password: e.target.value })
              }
            />
            <TextInputField
              rightTextValue=""
              type="password"
              placeholder="Re-type password"
              label=""
              name="reTypePassword"
              autoComplete={false}
              value={data?.retype_password}
              readOnly={!isEditable}
              bgColor={"#1e252b"}
              onChange={(e) =>
                setData({ ...data, retype_password: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <h1 className="text-[22px] sm:text-[28px] pt-[16px] text-white font-medium mb-2">
        Secondary email recepients (BCC)
      </h1>

      <div className="w-full lg:w-[70%] pr-[12.5px] flex sm:flex-row flex-col items-end sm:items-center gap-[10px] sm:gap-[25px] mb-[15px]">
        <div className="w-full sm:w-1/2">
          <TextInputField
            rightTextValue=""
            type="text"
            placeholder={`Enter Email 1`}
            value={data?.support_email}
            label="Email 1"
            name="email1"
            readOnly={!isEditable}
            bgColor="#1e252b"
            onChange={(e) =>
              setData({ ...data, support_email: e.target.value })
            }
          />
        </div>
        <CustomSwitch
          name={"isActive1"}
          disabled={!isEditable}
          checked={data?.check_1}
          onChange={(e) => setData({ ...data, check_1: e.target.checked })}
        />
      </div>
      <div className="w-full lg:w-[70%] pr-[12.5px] flex sm:flex-row flex-col items-end sm:items-center gap-[10px] sm:gap-[25px] mb-[15px]">
        <div className="w-full sm:w-1/2">
          <TextInputField
            rightTextValue=""
            type="text"
            placeholder={`Enter Email 1`}
            value={data?.support_email_2}
            label="Email 1"
            name="email1"
            readOnly={!isEditable}
            bgColor="#1e252b"
            onChange={(e) =>
              setData({ ...data, support_email_2: e.target.value })
            }
          />
        </div>
        <CustomSwitch
          name={"isActive1"}
          disabled={!isEditable}
          checked={data?.check_2}
          onChange={(e) => setData({ ...data, check_2: e.target.checked })}
        />
      </div>
      <div className="w-full lg:w-[70%] pr-[12.5px] flex sm:flex-row flex-col items-end sm:items-center gap-[10px] sm:gap-[25px] mb-[15px]">
        <div className="w-full sm:w-1/2">
          <TextInputField
            rightTextValue=""
            type="text"
            placeholder={`Enter Email 1`}
            value={data?.support_email_3}
            label="Email 1"
            name="email1"
            readOnly={!isEditable}
            bgColor="#1e252b"
            onChange={(e) =>
              setData({ ...data, support_email_3: e.target.value })
            }
          />
        </div>
        <CustomSwitch
          name={"isActive1"}
          disabled={!isEditable}
          checked={data?.check_3}
          onChange={(e) => setData({ ...data, check_3: e.target.checked })}
        />
      </div>
      <div className="w-full lg:w-[70%] pr-[12.5px] flex sm:flex-row flex-col items-end sm:items-center gap-[10px] sm:gap-[25px] mb-[15px]">
        <div className="w-full sm:w-1/2">
          <TextInputField
            rightTextValue=""
            type="text"
            placeholder={`Enter Email 1`}
            value={data?.support_email_4}
            label="Email 1"
            name="email1"
            readOnly={!isEditable}
            bgColor="#1e252b"
            onChange={(e) =>
              setData({ ...data, support_email_4: e.target.value })
            }
          />
        </div>
        <CustomSwitch
          name={"isActive1"}
          disabled={!isEditable}
          checked={data?.check_4}
          onChange={(e) => setData({ ...data, check_4: e.target.checked })}
        />
      </div>

      <h1 className="text-[22px] sm:text-[28px] text-white font-medium mb-2 my-[22px]">
        Response time limits
      </h1>
      <ResponseTimeLimits
        data={data}
        isEditable={isEditable}
        setData={setData}
      />
      <h1 className="text-[22px] sm:text-[28px] text-white font-medium mb-2 my-[22px]">
        Estimator commission (default setting)
      </h1>
      <div className="bg-[#1E252B] p-6 rounded-lg w-full mb-[15px]">
        <div className="space-y-6 text-white">
          <div className="flex items-center w-full justify-between lg:justify-start">
            <span className="text-sm font-medium w-[45%]">
              Estimator commission
            </span>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={data?.est_commission}
                isEditable={!isEditable}
                onChange={(e) =>
                  setData({ ...data, est_commission: e.target.value })
                }
                className="w-[70px] flex items-center justify-center text-center px-2 py-1 bg-gray-700 text-[#FFA13C] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-[#3c8dbc]"
              />
              <span>%</span>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-[22px] sm:text-[28px] text-white font-medium mb-2 my-[22px]">
        Merchant commission plan (default setting)
      </h1>
      <Merchantcommissionplan
        isEditable={isEditable}
        commissionData={commissionData}
        setCommissionData={setCommissionData}
        data={data}
        setData={setData}
        currency={currency}
      />

      {loading && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 justify-center items-center">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
    </div>
  );
};

export default Settings;
