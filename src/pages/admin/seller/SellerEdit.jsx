import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput, {
  formatPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import CustomSwitch from "../../../components/common/CustomSwitch";
import TextInputField from "../../../components/common/TextInputField";
import currency from "../../../constant/currency.json";
import axiosInstance from "../../../services";
import { fetchCountryList, fetchStateList } from "../../../utils/apiUtils";
import CommissionPlan from "./components/Commission";

const SellerEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [sellerData, setSellerData] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectPhoneCountry, setSelectPhoneCountry] = useState("IN");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectCountry, setSelectCountry] = useState("IN");
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogLoading, setConfirmDialogLoading] = useState(false);

  const [formData, setFormData] = useState({
    active: false,
    cmp_name: "",
    bank_name: "",
    logistics_address: "",
    bank_account: "",
    account_number: "",
    bank_swift: "",
    unique_id: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    username: "",
    cnt_code: "",
    cnt_no: "",
    currency: "",
    payment_tier: 0,
    created_on: "",
    seller_logo: null,
    companyLogoPreview: "",
  });
  const [commissionData, setCommissionData] = useState([]);

  const [commissionObject, setCommissionObject] = useState({});

  useEffect(() => {
    const transformCommissionData = () => {
      const transformedData = {
        br1: {
          price_range: [commissionData[0]?.from, commissionData[0]?.to],
          value: commissionData[0]?.commission,
        },
        br2: {
          price_range: [commissionData[1]?.from, commissionData[1]?.to],
          value: commissionData[1]?.commission,
        },
        br3: {
          price_range: [commissionData[2]?.from, commissionData[2]?.to],
          value: commissionData[2]?.commission,
        },
        br4: {
          price_range: [commissionData[3]?.from, commissionData[3]?.to],
          value: commissionData[3]?.commission,
        },
        br5: {
          price_range: [commissionData[4]?.from, commissionData[4]?.to],
          value: commissionData[4]?.commission,
        },
        br6: {
          price_range: [commissionData[5]?.from, commissionData[5]?.to],
          value: commissionData[5]?.commission,
        },
        br7: {
          price_range: [commissionData[6]?.from],
          value: commissionData[6]?.commission,
        },
      };
      setCommissionObject(transformedData);
    };

    transformCommissionData();
  }, [commissionData]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryData = await fetchCountryList();
        setCountries(countryData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if (selectCountry) {
      const fetchStatesData = async () => {
        try {
          const stateData = await fetchStateList(selectCountry);
          setStates(stateData);
        } catch (error) {
          console.error("Failed to fetch states:", error);
        }
      };
      fetchStatesData();
    }
  }, [selectCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const formattedPhone = formatPhoneNumber(phone);
    const dialCode = getCountryCallingCode(selectPhoneCountry);

    setFormData((prev) => ({
      ...prev,
      cnt_code: dialCode,
      cnt_no: formattedPhone,
    }));
  }, [phone, selectPhoneCountry]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        seller_logo: file,
        companyLogoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData((prev) => ({ ...prev, country, state: "" }));
    setSelectCountry(country);
  };

  const getDetailById = async () => {
    try {
      const response = await axiosInstance.get(`/sellers/detail?id=${id}`);
      const seller = response?.payload?.data;
      setSellerData(seller);

      setFormData((prevFormData) => ({
        ...prevFormData,
        ...seller,
        companyLogoPreview: seller?.seller_logo,
        unique_id: `SCA${seller?.id}`,
        address: seller?.address,
        created_on: moment.unix(seller?.created_on).format("MMM DD,YYYY"),
      }));

      setPhone(`+${seller?.cnt_code} ${seller?.cnt_no}`);
      setSelectCountry(seller?.country);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDetailById();
  }, []);

  const handleStateChange = (e) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }));
  };

  const save = async () => {
    setLoading(true);

    const formDataToSend = new FormData();

    // const formattedCommissionData = commissionData?.map((item) => ({
    //   from: `USD ${item?.from}`,
    //   to: item?.to !== null ? `USD ${item?.to}` : "",
    //   commission: String(item?.commission),
    // }));

    const sendData = { ...formData };

    Object.keys(sendData).forEach((key) => {
      if (
        key !== "seller_logo" &&
        key !== "companyLogoPreview" &&
        key !== "commission" &&
        key !== "commission_plan" &&
        formData[key]
      ) {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.seller_logo) {
      formDataToSend.append("seller_logo", formData.seller_logo);
    }

    if (commissionObject) {
      formDataToSend.append("commission", JSON.stringify(commissionObject));
    }

    try {
      const response = await axiosInstance["put"](
        `/sellers?id=${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 200) {
        const message = "Estimator updated successfully!";
        toast.success(message);
        navigate("/admin/staff/staff_user");
      }
    } catch (error) {
      console.log("error: ", error);
      if (error?.response?.data?.payload?.error) {
        toast.error(error?.response?.data?.payload?.error);
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmResetPassword = async () => {
    setConfirmDialogOpen(false);
    setConfirmDialogLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/sellers/forgetPassword`,
        {
          email: sellerData?.email,
        }
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setConfirmDialogLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setConfirmDialogLoading(false);
    }
  };

  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center">
          <h3 className="w-[100px] text-white text-[24px]">Profile</h3>
          <div className="flex items-center gap-2">
            <div className="bg-[#11c71d] rounded-[100%] w-[15px] h-[15px]"></div>
            <p className="text-white">Online</p>
          </div>
        </div>

        <div className="flex gap-4">
          {isEditable ? (
            <>
              <LoadingButton
                loading={loading}
                variant="contained"
                className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
                onClick={save}
              >
                Save
              </LoadingButton>
              <Button
                variant="contained"
                className="!bg-[#ffff] !text-black !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
                onClick={() => setIsEditable(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              className="!bg-[#3c8dbc] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => setIsEditable(true)}
            >
              Edit Merchant
            </Button>
          )}

          <LoadingButton
            loading={confirmDialogLoading}
            variant="contained"
            className="!bg-[#fea31e] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
            onClick={handleResetPasswordClick}
          >
            Reset Password
          </LoadingButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-[35px]">
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() =>
              navigate(`/admin/watch_details/watch_history/?seller_id=${id}`)
            }
          >
            View watches history
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() =>
              navigate(`/admin/analysis/revenue_analysis/seller/${id}`)
            }
          >
            View revenue analysis
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() =>
              navigate(`/admin/analysis/performance_analysis/seller/${id}`)
            }
          >
            View performance analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-[35px]">
        <div className="">
          <TextInputField
            rightTextValue=""
            type="text"
            label="Active"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            component={
              <div className="w-full flex justify-end">
                <CustomSwitch
                  disabled={!isEditable}
                  checked={formData.active}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      active: e.target.checked,
                    }));
                  }}
                />
              </div>
            }
          />
          <TextInputField
            value={formData.cmp_name}
            rightTextValue=""
            type="text"
            label="Company"
            name="cmp_name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bank_name}
            rightTextValue=""
            type="text"
            label="Bank Name"
            name="bank_name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.logistics_address}
            name="logistics_address"
            rightTextValue=""
            type="text"
            label="Bank Address"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bank_account}
            name="bank_account"
            rightTextValue=""
            type="text"
            label="Bank Account Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.account_number}
            name="account_number"
            rightTextValue=""
            type="text"
            label="Account Number"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bank_swift}
            name="bank_swift"
            rightTextValue=""
            type="text"
            label="Swift code/IBAN"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            label="Company Logo"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            component={
              <div className="flex justify-end w-full">
                <div className="w-fit">
                  {isEditable && (
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="w-full bg-transparent border-none outline-none ml-2 text-white placeholder-gray-400 text-right"
                    />
                  )}
                  <div>
                    {formData.companyLogoPreview && (
                      <div className="mt-2">
                        <img
                          src={formData?.companyLogoPreview}
                          alt="Uploaded Logo"
                          className="w-[100px] object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            }
          />
        </div>
        <div className="">
          <TextInputField
            rightTextValue=""
            value={formData.unique_id}
            name="unique_id"
            type="text"
            label="ID"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.first_name}
            name="first_name"
            rightTextValue=""
            type="text"
            label="First Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.last_name}
            name="last_name"
            type="text"
            label="Last Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.address}
            name="address"
            type="text"
            label="Street Address"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.city}
            name="city"
            type="text"
            label="City"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            label="Country"
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            onChange={handleChange}
            component={
              <div className="flex w-full justify-end">
                {/* {isEditable ? ( */}
                <select
                  name="country"
                  id="country"
                  className="bg-[#1e252b] max-sm:w-[100px]"
                  style={{ textAlignLast: "right" }}
                  value={formData.country}
                  disabled={!isEditable}
                  onChange={handleCountryChange}
                >
                  <option disabled selected>
                    Open to select country
                  </option>
                  {countries?.map((item, index) => (
                    <option value={item?.iso} key={index}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                {/* ) : (<p>{formData.country}</p> */}
                {/* )} */}
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            value={formData.zip}
            name="zip"
            type="text"
            label="Zip/Postal Code"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            label="State/Province"
            placeholder="State/Province"
            bgColor="#1e252b"
            className="mb-[15px] text-black dark:text-white"
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="state"
                    id="state"
                    className="bg-[#1e252b] max-sm:w-[100px]"
                    style={{ textAlignLast: "right" }}
                    value={formData.state}
                    onChange={handleStateChange}
                    disabled={!isEditable}
                  >
                    <option disabled value="">
                      Open to select state
                    </option>
                    {states.map((item) => (
                      <option key={item?.id} value={item?.state}>
                        {item?.state}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.state}</p>
                )}
              </div>
            }
          />
        </div>
        <div className="">
          <TextInputField
            rightTextValue=""
            value={formData.payment_tier}
            label="Tier"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <>
                {isEditable ? (
                  <div className="flex flex-col w-full">
                    <div className="flex items-center !cursor-pointer mb-1">
                      <input
                        type="radio"
                        id="tier1"
                        name="tier"
                        className="mr-2 !cursor-pointer"
                        checked={formData.payment_tier == 1}
                        onChange={() =>
                          setFormData({ ...formData, payment_tier: 1 })
                        }
                      />
                      <label
                        for="tier1"
                        className="text-white !font-normal !cursor-pointer !mb-0"
                      >
                        Tier 1: before shipping the watch
                      </label>
                    </div>
                    <div className="flex items-center !cursor-pointer">
                      <input
                        type="radio"
                        id="tier2"
                        name="tier"
                        className="mr-2 !cursor-pointer"
                        checked={formData.payment_tier == 2}
                        onChange={() =>
                          setFormData({ ...formData, payment_tier: 2 })
                        }
                      />
                      <label
                        for="tier2"
                        className="text-white !font-normal !cursor-pointer !mb-0"
                      >
                        Tier 2: after shipping the watch
                      </label>
                    </div>
                  </div>
                ) : (
                  <p className="text-right w-full text-[#fea31e]">
                    Tier {formData.payment_tier}
                  </p>
                )}
              </>
            }
          />
          <TextInputField
            rightTextValue=""
            value={formData.email}
            name="email"
            type="text"
            label="Email"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.username}
            name="username"
            type="text"
            label="Username"
            readOnly
            bgColor={"#1e252b"}
            className="mb-[15px] "
            onChange={handleChange}
            inputClassName="cursor-not-allowed"
          />
          <TextInputField
            rightTextValue=""
            value={formData.cnt_no}
            name="mobileNumber"
            type="text"
            label="Mobile Number"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            onChange={handleChange}
            component={
              <div className="flex justify-end w-full">
                {isEditable ? (
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    countryCallingCodeEditable={false}
                    className="mt-1 block w-auto rounded-md p-3 max-sm:flex-wrap"
                    placeholder="Enter phone number"
                    style={{
                      backgroundColor: "#1e252b",
                    }}
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                    }}
                    onCountryChange={(v) => setSelectPhoneCountry(v)}
                  />
                ) : (
                  <p>{phone}</p>
                )}
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            label="Currency of Trading"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            onChange={handleChange}
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="currency"
                    id="currency"
                    className="bg-[#1e252b]"
                    style={{ textAlignLast: "right" }}
                    value={formData.currency}
                    readOnly={!isEditable}
                    onChange={handleChange}
                  >
                    {currency.map((item, index) => (
                      <option value={item?.value} key={index}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.currency}</p>
                )}
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            value={formData.created_on}
            name="created_on"
            type="text"
            label="Sign up Date"
            readOnly={true}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>
      </div>

      <CommissionPlan
        isEditable={isEditable}
        commissionData={commissionData}
        setCommissionData={setCommissionData}
        sellerData={sellerData}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        handleClose={() => setConfirmDialogOpen(false)}
        handleConfirm={handleConfirmResetPassword}
        title="Confirm Reset Password"
        content="Are you sure you want to reset the password?"
      />
    </div>
  );
};

export default SellerEdit;
