/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import PhoneInput, {
  formatPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import TextInputField from "../../../components/common/TextInputField";
import { fetchCountryList, fetchStateList } from "../../../utils/apiUtils";
import StaffCommission from "./component/StaffCommission";
import axiosInstance from "../../../services";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { translate } from "../../../language";

const AccountProfile = () => {
  const userRole = localStorage.getItem("userRole");
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
  const [commissionData, setCommissionData] = useState([]);
  const [selectPhoneCountry, setSelectPhoneCountry] = useState("IN");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    active: false,
    cmp_name: "",
    bank_name: "",
    logistics_address: "",
    bank_account: "",
    account_number: "",
    bank_swift: "",
    id: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    state: "",
    email: "",
    username: "",
    dial: "",
    cnt_no: "",
    currency: "USD",
    payment_tier: 0,
    created_on: "",
    seller_logo: null,
    new_password: "",
    retype_password: "",
    companyLogoPreview: "",
  });
  console.log("formData: ", formData);

  const [staffData, setStaffData] = useState();
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [localCompanyLogoPreview, setLocalCompanyLogoPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const getDetailById = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/sellers/detail?id=${userData?.id}`
      );
      const staff = response?.payload?.data;
      setStaffData(staff);

      setFormData((prevFormData) => ({
        ...prevFormData,
        ...staff,
        companyLogoPreview: staff?.seller_logo,
        unique_id: `SCA${staff?.id}`,
        address: staff?.address,
        created_on: moment.unix(staff?.created_on).format("MMM DD,YYYY"),
        new_password: "",
        retype_password: "",
      }));

      setPhone(`+${staff?.cnt_code} ${staff?.cnt_no}`);
      setSelectCountry(staff?.country);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

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
        return response?.data?.payload?.imageUrl;
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    const formDataToSend = new FormData();

    const sendData = { ...formData };

    // Validate new_password fields
    if (formData?.new_password && !formData?.retype_password) {
      toast.error("Please add confirm your new new_password.");
      return;
    }

    if (formData?.new_password !== formData?.retype_password) {
      toast.error("New new_password and confirm new_password is not matched.");
      return;
    }

    Object.keys(sendData).forEach((key) => {
      if (key !== "companyLogoPreview" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData?.seller_logo?.name) {
      const ImageUrl = await uploadImage();
      ImageUrl && formDataToSend.append("seller_logo", ImageUrl);
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/sellers/editProfile`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 200) {
        // Clear new_password fields
        setFormData((prev) => ({
          ...prev,
          new_password: "",
          retype_password: "",
        }));
        const message = "Profile updated successfully!";
        toast.success(message);
        getDetailById();
        setIsEditable(false);
      } else {
        toast.error(response?.message || "Failed to update profile!");
      }
    } catch (error) {
      if (error?.response?.data?.payload?.error) {
        toast.error(error?.response?.data?.payload?.error);
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailById();
  }, [userData?.id]);

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

  return (
    <div className="mx-auto pb-[15px]">
      <div className="px-0 sm:px-[20px] pt-8 flex justify-between flex-wrap gap-2 bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <div className="flex items-center">
          <h3 className="text-[30px] font-medium px-0 sm:px-[15px] font-sans dark:text-white text-black">
            {translate("ACCOUNTPROFILE")}
          </h3>
        </div>
        {isEditable ? (
          <div className="flex gap-4">
            <LoadingButton
              loading={loading}
              variant="contained"
              className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => {
                save();
              }}
            >
              {translate("SAVE")}
            </LoadingButton>
            <Button
              variant="contained"
              className="!bg-[#ffff] !text-black !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => setIsEditable(false)}
            >
              {translate("CANCEL")}
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="contained"
              className="!bg-[#367FA9] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => setIsEditable(true)}
            >
              {translate("EDITPROFILE")}
            </Button>
          </div>
        )}
      </div>

      <div className="px-0 sm:px-[20px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full gap-4 my-[35px]">
        <div className="">
          <TextInputField
            value={formData?.cmp_name}
            type="text"
            label={`${translate("COMAPNY")}`}
            placeholder={`${translate("COMAPNY")}`}
            readOnly={!isEditable}
            name="cmp_name"
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.bank_name}
            type="text"
            label={`${translate("BANKNAME")}`}
            placeholder={`${translate("BANKNAME")}`}
            name="bank_name"
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.logistics_address}
            name="logistics_address"
            type="text"
            label={`${translate("BANKADDRESS")}`}
            readOnly={!isEditable}
            placeholder={`${translate("BANKADDRESS")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.bank_account}
            name="bank_account"
            type="text"
            label={`${translate("BANKACCOUNTNAME")}`}
            readOnly={!isEditable}
            placeholder={`${translate("BANKACCOUNTNAME")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.account_number}
            name="account_number"
            type="text"
            label={`${translate("ACCOUNTNUMBER")}`}
            readOnly={!isEditable}
            placeholder={`${translate("ACCOUNTNUMBER")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.bank_swift}
            name="bank_swift"
            type="text"
            label={`${translate("SWIFTCODEIBAN")}`}
            readOnly={!isEditable}
            placeholder={`${translate("SWIFTCODEIBAN")}`}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <div
            className="flex justify-between items-start w-full"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div className="w-[35%]">
              <TextInputField label={`${translate("COMPANYLOGO")}`} />
            </div>

            {isEditable ? (
              <div className="flex justify-end w-full py-2">
                <div className="w-fit">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".png, .jpg, .jpeg, .svg"
                    className="w-full bg-transparent border-none outline-none ml-2 dark:text-white text-black placeholder-gray-400 text-right whitespace-pre-wrap"
                  />

                  <div>
                    {formData?.companyLogoPreview || localCompanyLogoPreview ? (
                      <div className="mt-2">
                        <img
                          src={
                            localCompanyLogoPreview
                              ? localCompanyLogoPreview
                              : formData?.companyLogoPreview?.startsWith(
                                  "https://cdn.estipal.com/production"
                                )
                              ? formData?.companyLogoPreview
                              : `${process.env.REACT_APP_IMAGE_BASE_URL}/${formData?.companyLogoPreview}`
                          }
                          alt="Uploaded Logo"
                          className="w-[100px] object-cover rounded"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-end w-full pb-2 px-2">
                {formData?.companyLogoPreview ? (
                  <div className="mt-2">
                    <img
                      src={
                        formData?.companyLogoPreview?.startsWith(
                          "https://cdn.estipal.com/production"
                        )
                          ? formData?.companyLogoPreview
                          : `${process.env.REACT_APP_IMAGE_BASE_URL}/${formData?.companyLogoPreview}`
                      }
                      alt="Uploaded Logo"
                      className="w-[100px] object-cover rounded"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
        <div className="">
          <TextInputField
            value={formData?.first_name}
            name="first_name"
            type="text"
            label={`${translate("FIRSTNAME")}`}
            placeholder={`${translate("FIRSTNAME")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.last_name}
            name="last_name"
            type="text"
            label={`${translate("LASTNAME")}`}
            placeholder={`${translate("LASTNAME")}`}
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
            label={`${translate("ADDRESS")}`}
            placeholder={`${translate("ADDRESS")}`}
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
            label={`${translate("CITY")}`}
            placeholder={`${translate("CITY")}`}
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            label={`${translate("STATEPROVINCE")}`}
            placeholder={`${translate("STATEPROVINCE")}`}
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
            label={`${translate("ZIP")}`}
            placeholder={`${translate("ZIP")}`}
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            label={`${translate("COUNTRY")}`}
            placeholder={`${translate("COUNTRY")}`}
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
                    {countries?.map((item, index) => (
                      <option value={item?.iso} key={index}>
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
            label={`${translate("EMAIL")}`}
            readOnly={!isEditable}
            placeholder={`${translate("EMAIL")}`}
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
            label={`${translate("USERNAME")}`}
            readOnly={!isEditable}
            placeholder={`${translate("USERNAME")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          {/* <TextInputField
            value={formData?.cnt_no}
            name="cnt_no"
            type="text"
            label={`${translate("MOBILENUMBER")}`}
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
                        value={phone}
                        onChange={(value) => {
                          setPhone(value);
                        }}
                      />
                    </div> : <p></p>
                }
              </>
            }
          /> */}
          <TextInputField
            value={formData.cnt_no}
            name="cnt_no"
            type="text"
            label={`${translate("MOBILENUMBER")}`}
            bgColor={"#ffffff"}
            border={"1px solid #E5E7EB"}
            readOnly={!isEditable}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <div className="flex justify-end w-full">
                {isEditable ? (
                  <div className="staffAccount-profile flex justify-end w-full">
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      countryCallingCodeEditable={false}
                      className="mt-1 block w-auto rounded-md p-3 max-sm:flex-wrap"
                      placeholder="Enter phone number"
                      style={{
                        backgroundColor: "#F8F8F8",
                      }}
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                      }}
                      onCountryChange={(v) => {
                        if (v) {
                          setSelectPhoneCountry(v);
                        } else {
                          setSelectPhoneCountry("IN");
                        }
                      }}
                    />
                  </div>
                ) : (
                  <p>{phone}</p>
                )}
              </div>
            }
          />
          <TextInputField
            value={"USD"}
            name="currency"
            type="text"
            label={`${translate("CURRENCYOFTRADING")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData?.created_on}
            name="created_on"
            type="text"
            label={`${translate("SIGNUPDATE")}`}
            readOnly={!isEditable}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          {/* <TextInputField
            value={"Tier 1: before shipping the watch"}
            name="tier"
            type="text"
            label={`${translate("TIERGROUP")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
          /> */}
          <TextInputField
            value={
              formData?.payment_tier === 1
                ? "Tier 1: Seller receives Estipal payment before shipping the watch"
                : "Tier 2: after shipping the watch"
            }
            label="Tier group"
            readOnly={!isEditable}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid #E5E7EB"}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <>
                <p className="text-end w-full text-black">
                  {formData?.payment_tier === 1
                    ? "Tier 1: Seller receives Estipal payment before shipping the watch"
                    : "Tier 2: after shipping the watch"}
                </p>
              </>
            }
          />

          <div
            className="flex justify-between items-start w-full"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            {/* Change Password Field */}
            <div className="w-[35%] p-[18px]">
              <p className="text-sm dark:text-white text-black font-medium m-0 whitespace-nowrap min-w-[100px]">{`${translate(
                "CHANGEPASSWORD"
              )}`}</p>
            </div>

            <div className="">
              <TextInputField
                placeholder={`${translate("NEWPASSWORD")}`}
                type="password"
                readOnly={!isEditable}
                name="new_password"
                value={formData?.new_password}
                className=""
                onChange={handleChange}
              />

              {/* Confirm Password Field */}
              <TextInputField
                placeholder={`${translate("CONFIRMPASSWORD")}`}
                type="password"
                value={formData?.retype_password}
                readOnly={!isEditable}
                name="retype_password"
                onChange={handleChange}
                className="mb-[15px]"
              />
            </div>
          </div>
        </div>
      </div>

      <StaffCommission
        isEditable={isEditable}
        userRole={userRole}
        commissionData={commissionData}
        setCommissionData={setCommissionData}
        staffData={staffData}
      />
    </div>
  );
};

export default AccountProfile;
