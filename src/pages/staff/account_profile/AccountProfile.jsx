import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import TextInputField from "../../../components/common/TextInputField";
import countries from "../../../constant/country.json";
import { fetchStateList } from "../../../utils/apiUtils";
import StaffCommission from "./component/StaffCommission";

const AccountProfile = () => {
  const userRole = localStorage.getItem("userRole");
  const { t } = useTranslation();
  const styles = {
    input: {
      backgroundColor: userRole === "staff" ? "#FFFFFF" : "#1e252b",
    },
    countrySelect: {
      backgroundColor: userRole === "staff" ? "#ffffff" : "#1e252b",
      color: userRole === "staff" ? "black" : "white",
    },
  };

  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [commissionData, setCommissionData] = useState([
    { from: 1005, to: 5000, commission: 14 },
    { from: 5000, to: 10000, commission: 13 },
    { from: 10000, to: 20000, commission: 12 },
    { from: 20000, to: 30000, commission: 11 },
    { from: 30000, to: 40000, commission: 10 },
    { from: 40000, to: 50000, commission: 9 },
    { from: 50000, to: null, commission: 8 },
  ]);

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
    address: "",
    city: "",
    state: "",
    zip: "",
    state: "",
    email: "",
    username: "",
    dial: "",
    mobileNumber: "",
    currency: "USD",
    tier: "",
    signUpDate: "",
    companyLogo: null,
    companyLogoPreview: "",
  });
  const [states, setStates] = useState([]);
  const [selectCountry, setSelectCountry] = useState("IN");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData((prev) => ({ ...prev, country, state: "" }));
    setSelectCountry(country);
  };

  const handleStateChange = (e) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }));
  };


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


  return (
    <div className="mx-auto pb-[15px]">
      <div className="px-0 sm:px-[20px] pt-8 flex justify-between flex-wrap gap-2 bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <div className="flex items-center">
          <h3 className="text-[30px] font-medium px-0 sm:px-[15px] font-sans dark:text-white text-black">
            {t("ACCOUNTPROFILE")}
          </h3>
        </div>
        {isEditable ? (
          <div className="flex gap-4">
            <Button
              variant="contained"
              className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => {
                navigate("/admin/panel/account")
                setIsEditable(false)
              }}
            >
              {t("SAVE")}
            </Button>
            <Button
              variant="contained"
              className="!bg-[#ffff] !text-black !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => setIsEditable(false)}
            >
              {t("CANCEL")}
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="contained"
              className="!bg-[#367FA9] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => setIsEditable(true)}
            >
              {t("EDITPROFILE")}
            </Button>
          </div>
        )}
      </div>

      <div className="px-0 sm:px-[20px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full gap-4 my-[35px]">
        <div className="">
          <TextInputField
            value={formData?.company}
            type="text"
            label={`${t("COMAPNY")}`}
            placeholder={`${t("COMAPNY")}`}
            readOnly={!isEditable}
            name="company"
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.bankName}
            type="text"
            label={`${t("BANKNAME")}`}
            placeholder={`${t("BANKNAME")}`}
            name="bankName"
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.bankAddress}
            name="bankAddress"
            type="text"
            label={`${t("BANKADDRESS")}`}
            readOnly={!isEditable}
            placeholder={`${t("BANKADDRESS")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.bankAccountName}
            name="bankAccountName"
            type="text"
            label={`${t("BANKACCOUNTNAME")}`}
            readOnly={!isEditable}
            placeholder={`${t("BANKACCOUNTNAME")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.accountNumber}
            name="accountNumber"
            type="text"
            label={`${t("ACCOUNTNUMBER")}`}
            readOnly={!isEditable}
            placeholder={`${t("ACCOUNTNUMBER")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.swiftCode}
            name="swiftCode"
            type="text"
            label={`${t("SWIFTCODEIBAN")}`}
            readOnly={!isEditable}
            placeholder={`${t("SWIFTCODEIBAN")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <div className="flex justify-between items-start w-full" style={
            {
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px"

            }
          }>
            <div className="w-[35%]">
              <TextInputField
                label={`${t("COMPANYLOGO")}`}
              />
            </div>

            {isEditable ?
              <div className="flex justify-end w-full py-2">
                <div className="w-fit">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full bg-transparent border-none outline-none ml-2 dark:text-white text-black placeholder-gray-400 text-right whitespace-pre-wrap"
                  />

                  <div>
                    {formData?.companyLogoPreview ? (
                      <div className="mt-2">
                        <img
                          src={formData?.companyLogoPreview}
                          alt="Uploaded Logo"
                          className="w-[100px] object-cover rounded"
                        />
                      </div>
                    ) : ""}
                  </div>
                </div>
              </div>
              :
              <div className="flex items-start justify-end w-full pb-2 px-2">
                {formData?.companyLogoPreview ? (
                  <div className="mt-2">
                    <img
                      src={formData?.companyLogoPreview}
                      alt="Uploaded Logo"
                      className="w-[100px] object-cover rounded"
                    />
                  </div>
                ) : ""}
              </div>
            }
          </div>
        </div>
        <div className="">
          <TextInputField
            value={formData?.firstName}
            name="firstName"
            type="text"
            label={`${t("FIRSTNAME")}`}
            placeholder={`${t("FIRSTNAME")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.lastName}
            name="lastName"
            type="text"
            label={`${t("LASTNAME")}`}
            placeholder={`${t("LASTNAME")}`}
            readOnly={!isEditable}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.address}
            name="address"
            type="text"
            label={`${t("ADDRESS")}`}
            placeholder={`${t("ADDRESS")}`}
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.city}
            name="city"
            type="text"
            label={`${t("CITY")}`}
            placeholder={`${t("CITY")}`}
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            label={`${t("STATEPROVINCE")}`}
            placeholder={`${t("STATEPROVINCE")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="state"
                    id="state"
                    className="max-sm:w-[100px] "
                    style={{ textAlignLast: "right" }}
                    value={formData?.state}
                    readOnly={!isEditable}
                    onChange={handleStateChange}
                  >
                    <option disabled selected value={""}>
                      Open to select state
                    </option>
                    {states?.map((item) => (
                      <option key={item?.id} value={item?.state}>
                        {item?.state}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData?.state}</p>
                )}
              </div>
            }
          />


          <TextInputField
            value={formData?.zip}
            name="zip"
            type="text"
            label={`${t("ZIP")}`}
            placeholder={`${t("ZIP")}`}
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            label={`${t("COUNTRY")}`}
            placeholder={`${t("COUNTRY")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="country"
                    id="country"
                    className="max-sm:w-[100px]"
                    style={{ textAlignLast: "right" }}
                    value={formData?.country}
                    readOnly={!isEditable}
                    onChange={handleCountryChange}
                  >
                    <option disabled selected value={""}>
                      Open to select country
                    </option>
                    {countries.map((item, index) => (
                      <option value={item?.code} key={index}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData?.country}</p>
                )}
              </div>
            }
          />
        </div>

        <div className="">
          <TextInputField
            value={formData?.email}
            name="email"
            type="text"
            label={`${t("EMAIL")}`}
            readOnly={!isEditable}
            placeholder={`${t("EMAIL")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.username}
            name="username"
            type="text"
            label={`${t("USERNAME")}`}
            readOnly={!isEditable}
            placeholder={`${t("USERNAME")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            value={formData?.mobileNumber}
            name="mobileNumber"
            type="text"
            label={`${t("MOBILENUMBER")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            readOnly={!isEditable}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <>
                {
                  isEditable ?
                    <div className="staffAccount-profile flex justify-end w-full">
                      <PhoneInput
                        international
                        defaultCountry="US"
                        countryCallingCodeEditable={false}
                        inputStyle={styles.input}
                        countrySelectProps={{
                          style: styles?.countrySelect,
                        }}
                        className="mt-1 block w-auto rounded-md p-3 max-sm:flex-wrap"
                        placeholder="Enter phone number"
                        style={{
                          backgroundColor:
                            "#F8F8F8",
                        }}
                        value={formData?.mobileNumber}
                        onChange={(value) => {
                          setFormData({ ...formData, mobileNumber: value });
                        }}
                      />
                    </div> : <p></p>
                }
              </>
            }
          />
          <TextInputField
            value={"USD"}
            name="currency"
            type="text"
            label={`${t("CURRENCYOFTRADING")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
          />
          <TextInputField
            value={"April 24, 2023"}
            name="signUpDate"
            type="text"
            label={`${t("SIGNUPDATE")}`}
            readOnly={!isEditable}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            value={"Tier 1: before shipping the watch"}
            name="tier"
            type="text"
            label={`${t("TIERGROUP")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
          />

          <div className="flex justify-between items-start w-full" style={
            {
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px"

            }
          }>
            {/* Change Password Field */}
            <div className="w-[35%]">
              <TextInputField
                label={`${t("CHANGEPASSWORD")}`}
              />
            </div>

            <div className="">
              <TextInputField
                placeholder={`${t("NEWPASSWORD")}`}
                type="password"
                readOnly={!isEditable}
                className=""
              />

              {/* Confirm Password Field */}
              <TextInputField
                placeholder={`${t("CONFIRMPASSWORD")}`}
                type="password"
                readOnly={!isEditable}
                className="mb-[15px]"
              />
            </div>
          </div>

        </div>
      </div>

      <StaffCommission isEditable={isEditable} userRole={userRole} commissionData={commissionData} />
    </div>
  );
};

export default AccountProfile;
