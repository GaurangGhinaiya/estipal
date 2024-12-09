import { Button } from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CustomSwitch from "../../../components/common/CustomSwitch";
import TextInputField from "../../../components/common/TextInputField";
import countries from "../../../constant/country.json";
import currency from "../../../constant/currency.json";
import CommissionPlan from "./components/Commission";
import { useNavigate } from "react-router-dom";

const SellerUserCreate = () => {
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
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center">
          <h3 className="text-[24px] font-medium px-0 sm:px-[15px] font-sans text-white">
            Add Merchant
          </h3>
        </div>

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
            name="company"
            bgColor={"#1e252b"}
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
            placeholder="Bank Address"
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
            placeholder="Bank Account Name"
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
            placeholder="Account Number"
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
            placeholder="First Name"
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
            placeholder="Last Name"
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
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <div className="flex w-full justify-end">
                <select
                  name="country"
                  id="country"
                  className="bg-[#1e252b] max-sm:w-[100px]"
                  style={{ textAlignLast: "right" }}
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option disabled selected value={""}>
                    Open to select country
                  </option>
                  {countries.map((item, index) => (
                    <option value={item.code}>{item.name}</option>
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
            placeholder="State/Province"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>

        <div className="">
          <TextInputField
            rightTextValue=""
            value={formData.tier}
            label="Seller Receives estipal payment"
            bgColor={"#1e252b"}
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
                      checked={formData.tier == "Tier 2"}
                      onChange={() =>
                        setFormData({ ...formData, tier: "Tier 2" })
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
            value={formData.mobileNumber}
            name="mobileNumber"
            type="text"
            label="Mobile Number"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <div className="flex justify-end w-full">
                <PhoneInput
                  international
                  defaultCountry="GB"
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
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            label="Currency of Trading"
            bgColor={"#1e252b"}
            className="mb-[15px]"
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
                    <option value={item.value}>{item.name}</option>
                  ))}
                </select>
              </div>
            }
          />
        </div>
      </div>

      <CommissionPlan isEditable={isEditable} />
    </div>
  );
};

export default SellerUserCreate;
