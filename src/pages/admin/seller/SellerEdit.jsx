import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextInputField from "../../../components/common/TextInputField";
import CustomSwitch from "../../../components/common/CustomSwitch";
import countries from "../../../constant/country.json";
import currency from "../../../constant/currency.json";
import { stateApi } from "../../../api/stateApi";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountryCallingCode } from "react-phone-number-input";
import CommissionPlan from "./components/Commission";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services";
import moment from "moment";

const SellerEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [sellerData, setSellerData] = useState();
  const [isEditable, setIsEditable] = useState(false);
  // const [states, setStates] = useState([]);
  // const [selectCountry, setSelectCountry] = useState("IN");
  // const [phone, setPhone] = useState("IN");

  const [formData, setFormData] = useState({
    active: false,
    company: "",
    bankName: "",
    bankAddress: "",
    bankAccountName: "",
    accountNumber: "",
    swiftCode: "",
    id: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    username: "",
    dial: "",
    mobileNumber: "",
    currency: "",
    tier: "",
    signUpDate: "",
    companyLogo: null,
    companyLogoPreview: "",
  });

  console.log("formData: ", formData);

  // useEffect(() => {
  //   const formatNumber = formatPhoneNumber(phone);
  //   const dial = getCountryCallingCode(selectCountry);
  // }, [phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload for the logo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        companyLogo: file,
        companyLogoPreview: URL.createObjectURL(file),
      });
    }
  };

  const getDetailById = async () => {
    try {
      const response = await axiosInstance.get(`/sellers/detail?id=${id}`);
      const seller = response?.payload?.data;
      setSellerData(seller);

      setFormData((prevFormData) => ({
        ...prevFormData,
        active: seller?.active,
        email: seller?.email,
        username: seller?.username,
        currency: seller?.currency,
        firstName: seller?.first_name,
        lastName: seller?.last_name,
        bankName: seller?.bank_name,
        bankAddress: seller?.bank_address,
        bankAccountName: seller?.bank_account,
        accountNumber: seller?.account_number,
        swiftCode: seller?.bank_swift,
        companyLogoPreview: seller?.seller_logo,
        id: `SCA${seller?.id}`,
        streetAddress: seller?.address,
        city: seller?.city,
        country: seller?.country,
        zipCode: seller?.zip,
        state: seller?.state,
        tier: `Tier ${seller?.payment_tier}`,
        mobileNumber: `+${seller?.cnt_code} ${seller?.cnt_no}`,
        signUpDate: moment.unix(seller?.created_on).format("MMM DD,YYYY"),
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDetailById();
  }, []);

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
              <Button
                variant="contained"
                className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
                onClick={() => setIsEditable(false)}
              >
                Save
              </Button>
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

          <Button
            variant="contained"
            className="!bg-[#fea31e] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
          >
            Reset Password
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-[35px]">
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() => navigate("/admin/watch_details/watch_history")}
          >
            View watches history
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() => navigate("/admin/analysis/revenue_analysis/admin")}
          >
            View revenue analysis
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() => navigate("/admin/watch_details/watch_history")}
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
            value={formData.company}
            rightTextValue=""
            type="text"
            label="Company"
            name="company"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bankName}
            rightTextValue=""
            type="text"
            label="Bank Name"
            name="bankName"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bankAddress}
            name="bankAddress"
            rightTextValue=""
            type="text"
            label="Bank Address"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bankAccountName}
            name="bankAccountName"
            rightTextValue=""
            type="text"
            label="Bank Account Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.accountNumber}
            name="accountNumber"
            rightTextValue=""
            type="text"
            label="Account Number"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.swiftCode}
            name="swiftCode"
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
            value={formData.id}
            name="id"
            type="text"
            label="ID"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.firstName}
            name="firstName"
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
            value={formData.lastName}
            name="lastName"
            type="text"
            label="Last Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.streetAddress}
            name="streetAddress"
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
            className="mb-[15px]"
            onChange={handleChange}
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
                    onChange={handleChange}
                  >
                    <option disabled selected>
                      Open to select country
                    </option>
                    {countries.map((item, index) => (
                      <option value={item.code}>{item.name}</option>
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
            value={formData.zipCode}
            name="zipCode"
            type="text"
            label="Zip/Postal Code"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.state}
            name="state"
            type="text"
            label="State/Province"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <TextInputField
            rightTextValue=""
            value={formData.tier}
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
                        checked={formData.tier == "Tier 1"}
                        onChange={() => setFormData({ ...formData, tier: 1 })}
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
                        checked={formData.tier == "Tier 2"}
                        onChange={() => setFormData({ ...formData, tier: 2 })}
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
                    {formData.tier}
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
            value={formData.mobileNumber}
            name="mobileNumber"
            type="text"
            label="Mobile Number"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
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
                    value={formData.mobileNumber}
                    onChange={(value) => {
                      setFormData({ ...formData, mobileNumber: value });
                    }}
                  />
                ) : (
                  <p>{formData.mobileNumber}</p>
                )}
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            label="Currency of Trading"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
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
                      <option value={item.value}>{item.name}</option>
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
            value={formData.signUpDate}
            name="signUpDate"
            type="text"
            label="Sign up Date"
            readOnly={true}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>
      </div>

      <CommissionPlan isEditable={isEditable} />
    </div>
  );
};

export default SellerEdit;
