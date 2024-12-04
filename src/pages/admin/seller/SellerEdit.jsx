import { Button } from "@mui/material";
import React, { useState } from "react";
import TextInputField from "../../../components/common/TextInputField";
import CustomSwitch from "../../../components/common/CustomSwitch";

const SellerEdit = () => {
  const [isEditable, setIsEditable] = useState(true);

  const [formData, setFormData] = useState({
    active: true,
    company: "MLA Thai",
    bankName: "000000",
    bankAddress: "00000",
    bankAccountName: "00000000000",
    accountNumber: "000000",
    swiftCode: "00000",
    id: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Thailand",
    email: "",
    username: "",
    mobileNumber: "",
    currency: "USD",
    tier: "before",
    signUpDate: new Date().toLocaleDateString(),
    companyLogo: null,
  });

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
      <div className="flex justify-between">
        <div className="flex items-center">
          <h3 className="w-[100px] text-white text-[24px]">Profile</h3>
          <div className="flex items-center gap-2">
            <div className="bg-[#11c71d] rounded-[100%] w-[15px] h-[15px]"></div>
            <p className="text-white">Online</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
          >
            Edit Merchant
          </Button>

          <Button
            variant="contained"
            className="!bg-[#fea31e] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
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
          >
            View watches history
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
          >
            View revenue analysis
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
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
                <CustomSwitch />
              </div>
            }
          />
          <TextInputField
            value={formData.company}
            rightTextValue=""
            type="text"
            label="Company"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData.bankName}
            rightTextValue=""
            type="text"
            label="Bank Name"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData.bankAddress}
            rightTextValue=""
            type="text"
            label="Bank Address"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData.bankAccountName}
            rightTextValue=""
            type="text"
            label="Bank Account Name"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData.accountNumber}
            rightTextValue=""
            type="text"
            label="Account Number"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData.swiftCode}
            rightTextValue=""
            type="text"
            label="Swift code/IBAN"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            //   value=""
            label="Company Logo"
            bgColor={"#1e252b"}
            className="mb-[15px]"
            component={
              <div className="flex justify-end w-full">
                <div className="w-fit">
                  <input
                    // value={formData?.companyLogo?.name}
                    type="file"
                    readOnly={!isEditable}
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
            type="text"
            label="ID"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            value={formData.company}
            rightTextValue=""
            type="text"
            label="First Name"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Last Name"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Street Address"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="City"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Account Number"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Swift code/IBAN"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Company Logo"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
        </div>
        <div className="">
          <TextInputField
            rightTextValue=""
            type="text"
            label="Active"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Company"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Bank Name"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Bank Address"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Bank Account Name"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
          <TextInputField
            rightTextValue=""
            type="text"
            label="Account Number"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerEdit;
