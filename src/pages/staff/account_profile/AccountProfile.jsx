/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [commissionData, setCommissionData] = useState([]);
  const [selectPhoneCountry, setSelectPhoneCountry] = useState("IN");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    active: false,
    cmp_name: "",
    bank_name: "",
    bank_address: "",
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
    companyLogo: null,
    companyLogoPreview: "",
  });
  const [staffData, setStaffData] = useState();
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));

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

  const getDetailById = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/sellers/detail?id=${userData?.id}`
      );
      const staff = response?.payload?.data;
      console.log("staff: ", staff);
      setStaffData(staff);

      setFormData((prevFormData) => ({
        ...prevFormData,
        ...staff,
        companyLogoPreview: staff?.seller_logo,
        unique_id: `SCA${staff?.id}`,
        address: staff?.address,
        created_on: moment.unix(staff?.created_on).format("MMM DD,YYYY"),
      }));

      setPhone(`+${staff?.cnt_code} ${staff?.cnt_no}`);
      setSelectCountry(staff?.country);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const save = async () => {
    setLoading(true);

    const formDataToSend = new FormData();

    const sendData = { ...formData };

    Object.keys(sendData).forEach((key) => {
      if (
        key !== "companyLogoPreview" &&
        formData[key]
      ) {
        formDataToSend.append(key, formData[key]);
      }
    });

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
        const message = "Profile updated successfully!";
        toast.success(message);
        getDetailById();
        setIsEditable(false);
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
            {t("ACCOUNTPROFILE")}
          </h3>
        </div>
        {isEditable ? (
          <div className="flex gap-4">
            <Button
              variant="contained"
              className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={() => {
                save();
                navigate("/admin/panel/account");
                setIsEditable(false);
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
            value={formData?.cmp_name}
            type="text"
            label={`${t("COMAPNY")}`}
            placeholder={`${t("COMAPNY")}`}
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
            label={`${t("BANKNAME")}`}
            placeholder={`${t("BANKNAME")}`}
            name="bank_name"
            readOnly={!isEditable}
            bgColor={"#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData?.bank_address}
            name="bank_address"
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
            value={formData?.bank_account}
            name="bank_account"
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
            value={formData?.account_number}
            name="account_number"
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
            value={formData?.bank_swift}
            name="bank_swift"
            type="text"
            label={`${t("SWIFTCODEIBAN")}`}
            readOnly={!isEditable}
            placeholder={`${t("SWIFTCODEIBAN")}`}
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
              <TextInputField label={`${t("COMPANYLOGO")}`} />
            </div>

            {isEditable ? (
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
                      src={formData?.companyLogoPreview}
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
            label={`${t("FIRSTNAME")}`}
            placeholder={`${t("FIRSTNAME")}`}
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

          {/* <TextInputField
            value={formData?.cnt_no}
            name="cnt_no"
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
            label={`${t("MOBILENUMBER")}`}
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
            label={`${t("CURRENCYOFTRADING")}`}
            disabled={true}
            bgColor={isEditable ? "#CCCCCC" : "#ffffff"}
            border={"1px solid black"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData?.created_on}
            name="created_on"
            type="text"
            label={`${t("SIGNUPDATE")}`}
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
            label={`${t("TIERGROUP")}`}
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
                <p className="text-start w-full text-black">
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
            <div className="w-[35%]">
              <TextInputField label={`${t("CHANGEPASSWORD")}`} />
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
