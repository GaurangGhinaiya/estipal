import React, { useState } from "react";
import CommissionPlan from "../../admin/seller/components/Commission";
import TextInputField from "../../../components/common/TextInputField";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CustomSwitch from "../../../components/common/CustomSwitch";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countries from "../../../constant/country.json";
import currency from "../../../constant/currency.json";

const AccountProfile = () => {
  const userRole = localStorage.getItem("userRole");
  const styles = {
    input: {
      backgroundColor: userRole === "staff" ? "#FFFFFF" : "#1e252b", // Style for the input
    },
    countrySelect: {
      backgroundColor: userRole === "staff" ? "#ffffff" : "#1e252b", // Style for the country select
      color: userRole === "staff" ? "black" : "white",
    },
  };

  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

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
    currency: "USD",
    tier: "",
    signUpDate: "",
    companyLogo: null,
    companyLogoPreview: "",
  });

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
  return (
    <div className="mx-auto pb-[15px]">
      <div className="px-0 sm:px-[20px] pt-6 flex justify-between flex-wrap gap-2 bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <div className="flex items-center">
          <h3 className="text-[24px] font-medium px-0 sm:px-[15px] font-sans dark:text-white text-black">
            Account Profile
          </h3>
        </div>
        {isEditable ? (
          <div className="flex gap-4">
            <Button
              variant="contained"
              className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => navigate("/admin/staff/staff_user")}
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
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="contained"
              className="!bg-[#367FA9] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => setIsEditable(true)}
            >
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      <div className="px-0 sm:px-[20px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full gap-4 my-[35px]">
        <div className="">
          <TextInputField
            rightTextValue=""
            type="text"
            label="Active"
            readOnly={!isEditable}
            //   value=""
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            component={
              <div className="w-full flex justify-end">
                <CustomSwitch
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
            placeholder="Company"
            readOnly={!isEditable}
            name="company"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.bankName}
            rightTextValue=""
            type="text"
            label="Bank Name"
            placeholder="Bank Name"
            name="bankName"
            readOnly={!isEditable}
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
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
            placeholder="Bank Address"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
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
            placeholder="Bank Account Name"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
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
            placeholder="Account Number"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
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
            placeholder="Swift code/IBAN"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            label="Company Logo"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            readOnly={!isEditable}
            className="mb-[15px]"
            component={
              <div className="flex justify-end w-full">
                <div className="w-fit">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full bg-transparent border-none outline-none ml-2 dark:text-white text-black placeholder-gray-400 text-right"
                  />

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
            placeholder="ID"
            readOnly={!isEditable}
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.firstName}
            name="firstName"
            rightTextValue=""
            type="text"
            label="First Name"
            placeholder="First Name"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.lastName}
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            readOnly={!isEditable}
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.streetAddress}
            name="streetAddress"
            type="text"
            label="Street Address"
            placeholder="Street Address"
            readOnly={!isEditable}
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
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
            readOnly={!isEditable}
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            label="Country"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            readOnly={!isEditable}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <div className="flex w-full justify-end">
                <select
                  name="country"
                  id="country"
                  className="dark:bg-[#1e252b] bg-[#F8F8F8] max-sm:w-[100px]"
                  style={{ textAlignLast: "right" }}
                  value={formData.country}
                  onChange={handleChange}
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
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            value={formData.zipCode}
            name="zipCode"
            type="text"
            label="Zip/Postal Code"
            placeholder="Zip/Postal Code"
            readOnly={!isEditable}
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
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
            placeholder="State/Province"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>

        <div className="">
          <TextInputField
            rightTextValue=""
            value={formData.tier}
            label="Seller Receives estipal payment"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            readOnly={!isEditable}
            className="mb-[15px]"
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
                      checked={formData.tier == "Tier 1"}
                      onChange={() =>
                        setFormData({ ...formData, tier: "Tier 1" })
                      }
                    />
                    <label
                      for="tier1"
                      class="dark:text-white text-black !font-normal !cursor-pointer !mb-0"
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
                      checked={formData.tier == "Tier 2"}
                      onChange={() =>
                        setFormData({ ...formData, tier: "Tier 2" })
                      }
                    />
                    <label
                      for="tier2"
                      class="dark:text-white text-black !font-normal !cursor-pointer !mb-0"
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
            readOnly={!isEditable}
            placeholder="Email"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            rightTextValue=""
            value={formData.mobileNumber}
            name="mobileNumber"
            type="text"
            label="Mobile Number"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            readOnly={!isEditable}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <div className="flex justify-end w-full">
                <PhoneInput
                  international
                  defaultCountry="GB"
                  countryCallingCodeEditable={false}
                  inputStyle={styles.input} // Apply input styles
                  countrySelectProps={{
                    style: styles.countrySelect, // Apply country select styles
                  }}
                  className="mt-1 block w-auto rounded-md p-3 max-sm:flex-wrap"
                  placeholder="Enter phone number"
                  style={{
                    backgroundColor: userRole === "staff" ? "#F8F8F8" : "#1e252b",
                  }}
                  value={formData.mobileNumber}
                  onChange={(value) => {
                    setFormData({ ...formData, mobileNumber: value });
                  }}
                />
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            label="Currency of Trading"
            bgColor={userRole === "staff" ? "#ffffff" : "#1e252b"}
            border={userRole === "staff" ? "1px solid black" : "none"}
            readOnly={!isEditable}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <div className="flex w-full justify-end">
                <select
                  name="currency"
                  id="currency"
                  className="dark:bg-[#1e252b] bg-[#F8F8F8]"
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

      <CommissionPlan isEditable={isEditable} userRole={userRole} />
    </div>
  );
};

export default AccountProfile;
