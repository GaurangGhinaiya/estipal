import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput, {
  formatPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import CustomSwitch from "../../../components/common/CustomSwitch";
import TextInputField from "../../../components/common/TextInputField";
import currency from "../../../constant/currency.json";
import axiosInstance from "../../../services";
import {
  fetchCountryList,
  fetchNextSellerId,
  fetchStateList,
} from "../../../utils/apiUtils";
import CommissionPlan from "./components/Commission";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

const SellerUserCreate = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(true);
  const [phone, setPhone] = useState("");
  const [selectPhoneCountry, setSelectPhoneCountry] = useState("IN");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectCountry, setSelectCountry] = useState("IN");
  const [loading, setLoading] = useState(false);
  const [commissionData, setCommissionData] = useState([
    { from: 1005, to: 5000, commission: 14 },
    { from: 5000, to: 10000, commission: 13 },
    { from: 10000, to: 20000, commission: 12 },
    { from: 20000, to: 30000, commission: 11 },
    { from: 30000, to: 40000, commission: 10 },
    { from: 40000, to: 50000, commission: 9 },
    { from: 50000, to: null, commission: 8 },
  ]);
  const [active, setActive] = useState(false);
  const [localCompanyLogoPreview, setLocalCompanyLogoPreview] = useState(null);
  const [ip, setIp] = useState(null);

  const [formData, setFormData] = useState({
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
    currency: "USD",
    payment_tier: 1,
    created_on: "",
    seller_logo: "",
    companyLogoPreview: "",
    staff_notify_flag: 0,
    language: "en",
  });

  const [commissionObject, setCommissionObject] = useState({});

  useEffect(() => {
    const transformCommissionData = () => {
      const transformedData = {
        br1: {
          price_range: [commissionData[0].from, commissionData[0].to],
          value: commissionData[0].commission,
        },
        br2: {
          price_range: [commissionData[1].from, commissionData[1].to],
          value: commissionData[1].commission,
        },
        br3: {
          price_range: [commissionData[2].from, commissionData[2].to],
          value: commissionData[2].commission,
        },
        br4: {
          price_range: [commissionData[3].from, commissionData[3].to],
          value: commissionData[3].commission,
        },
        br5: {
          price_range: [commissionData[4].from, commissionData[4].to],
          value: commissionData[4].commission,
        },
        br6: {
          price_range: [commissionData[5].from, commissionData[5].to],
          value: commissionData[5].commission,
        },
        br7: {
          price_range: [commissionData[6].from],
          value: commissionData[6].commission,
        },
      };
      setCommissionObject(transformedData);
    };

    transformCommissionData();
  }, [commissionData]);

  const uploadImage = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData?.seller_logo);
    formDataToSend.append("type", 1);
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PUBLIC_BASE_URL}/file`,
        formDataToSend
      );
      if (response?.status === 200) {
        setLoading(false);
        return response?.data?.payload?.imageUrl;
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("http://ip-api.com/json");
        const data = await response.json();
        setIp(data.query);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIP();
  }, []);

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

  useEffect(() => {
    const loadId = async () => {
      try {
        const nextId = await fetchNextSellerId();
        setFormData((prev) => ({ ...prev, unique_id: nextId }));
      } catch (error) {
        console.error("Error fetching next estimator ID:", error);
      }
      setIsEditable(true);
    };

    loadId();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        seller_logo: file,
      });

      setLocalCompanyLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData((prev) => ({ ...prev, country, state: "" }));
    setSelectCountry(country);
  };

  const handleStateChange = (e) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }));
  };

  const validateForm = () => {
    const fieldNames = {
      cmp_name: "Company Name",
      bank_name: "Bank Name",
      logistics_address: "Bank Address",
      bank_account: "Bank Account Name",
      account_number: "Account Number",
      bank_swift: "Swift Code/IBAN",
      first_name: "First Name",
      last_name: "Last Name",
      address: "Street Address",
      city: "City",
      country: "Country",
      zip: "Zip/Postal Code",
      state: "State/Province",
      email: "Email",
      currency: "Currency of Trading",
    };

    for (const field in fieldNames) {
      if (!formData[field]) {
        toast.error(`${fieldNames[field]} field is required.`);
        return false;
      }
    }

    if (!phone) {
      toast.error("Please enter a valid Mobile Number.");
      return false;
    }

    return true;
  };

  const save = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "seller_logo" && key !== "companyLogoPreview") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData?.seller_logo?.name) {
      const ImageUrl = await uploadImage();
      ImageUrl && formDataToSend.append("seller_logo", ImageUrl);
    }

    formDataToSend.append("active", active);
    formDataToSend.append("ip", ip);

    if (commissionObject) {
      formDataToSend.append("commission", JSON.stringify(commissionObject));
    }

    try {
      const response = await axiosInstance["post"](`/sellers`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.status === 200) {
        const message = "Estimator added successfully!";
        toast.success(message);
        navigate("/admin/staff/staff_user");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-[10px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center">
          <h3 className="text-[24px] font-medium px-0 sm:px-[15px] font-sans text-white">
            Add Merchant
          </h3>
        </div>

        <div className="flex gap-4">
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
            onClick={() => navigate("/admin/staff/staff_user")}
          >
            Cancel
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
            bgColor={"#1e252b"}
            className="mb-[15px]"
            component={
              <div className="w-full flex justify-end">
                <CustomSwitch
                  checked={formData.active}
                  onChange={(e) => {
                    setActive(e.target.checked);
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
            placeholder="Company"
            name="cmp_name"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bank_name}
            rightTextValue=""
            type="text"
            label="Bank Name"
            placeholder="Bank Name"
            name="bank_name"
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
            placeholder="Bank Address"
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
            placeholder="Bank Account Name"
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
            placeholder="Account Number"
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
            placeholder="Swift code/IBAN"
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
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full bg-transparent border-none outline-none ml-2 text-white placeholder-gray-400 text-right"
                  />

                  <div>
                    {localCompanyLogoPreview && (
                      <div className="mt-2">
                        <img
                          src={localCompanyLogoPreview}
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
            readOnly={true}
            placeholder="ID"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
            inputClass="!cursor-not-allowed"
          />
          <TextInputField
            value={formData.first_name}
            name="first_name"
            rightTextValue=""
            type="text"
            label="First Name"
            placeholder="First Name"
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
            placeholder="Last Name"
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
            placeholder="Street Address"
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
            placeholder="City"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            label="Country"
            placeholder="Country"
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="country"
                    id="country"
                    className="bg-[#1e252b] max-sm:w-[100px]"
                    style={{ textAlignLast: "right" }}
                    value={formData.country}
                    readOnly={!isEditable}
                    onChange={handleCountryChange}
                  >
                    <option disabled selected value={""}>
                      Open to select country
                    </option>
                    {countries.map((item, index) => (
                      <option value={item?.iso} key={index}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.country}</p>
                )}
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            value={formData.zip}
            name="zip"
            type="text"
            label="Zip/Postal Code"
            placeholder="Zip/Postal Code"
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
            label="Seller Receives estipal payment"
            bgColor={"#1e252b"}
            className="mb-[15px] flex sm:flex-row flex-col !items-start sm:items-center"
            onChange={handleChange}
            component={
              <>
                <div class="flex flex-col w-[230px] ml-auto">
                  <div class="flex items-center !cursor-pointer mb-1">
                    <input
                      type="radio"
                      id="tier1"
                      name="tier"
                      class="mr-2 !cursor-pointer"
                      checked={formData.payment_tier == 1}
                      onChange={() =>
                        setFormData({ ...formData, payment_tier: 1 })
                      }
                    />
                    <label
                      for="tier1"
                      class="text-white !font-normal !cursor-pointer !mb-0"
                    >
                      Tier 1: before shipping the watch
                    </label>
                  </div>
                  <div class="flex items-center !cursor-pointer">
                    <input
                      type="radio"
                      id="tier2"
                      name="tier"
                      class="mr-2 !cursor-pointer"
                      checked={formData.payment_tier == 2}
                      onChange={() =>
                        setFormData({ ...formData, payment_tier: 2 })
                      }
                    />
                    <label
                      for="tier2"
                      class="text-white !font-normal !cursor-pointer !mb-0"
                    >
                      Tier 2: after shipping the watch
                    </label>
                  </div>
                </div>
              </>
            }
          />
          <TextInputField
            rightTextValue=""
            value={formData.email}
            name="email"
            type="text"
            label="Email"
            placeholder="Email"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            rightTextValue=""
            type="text"
            label="Mobile Number"
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
                    className="mt-1 block w-auto rounded-md p-3 max-sm:flex-wrap !bg-[#283641]"
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
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            onChange={handleChange}
            component={
              <div className="flex w-full justify-end">
                <select
                  name="currency"
                  id="currency"
                  className="bg-[#1e252b]"
                  style={{ textAlignLast: "right" }}
                  value={formData.currency}
                  onChange={handleChange}
                >
                  {currency.map((item, index) => (
                    <option value={item?.value} key={index}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            }
          />
        </div>
      </div>

      <CommissionPlan
        isEditable={isEditable}
        commissionData={commissionData}
        setCommissionData={setCommissionData}
      />
    </div>
  );
};

export default SellerUserCreate;
