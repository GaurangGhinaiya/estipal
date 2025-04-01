import React, { useState } from "react";
import { Button } from "@mui/material";
import moment from "moment";
import CustomSwitch from "../../../components/common/CustomSwitch";
import StaffWatch from "../../../assets/images/icons/staffWatch.png";
import StaffLock from "../../../assets/images/icons/Stafflock.png";
import SearchBar from "../../../components/common/SearchBar";
import PaginationComponent from "../../../components/common/PaginationComponent";

const history = [
  {
    id: "W10090",
    online: true,
    active: true,
    name: "test_staff1",
    email: "nopparat.mayawizard@gmail.com",
    mobile_number: "632264993",
    added_on: "24 Apr 2023",
    sent_accepted: "7/3",
    watches_history: true,
    reset_password: true,
  },
  {
    id: "W10091",
    online: false,
    active: true,
    name: "test_staff2",
    email: "test2@example.com",
    mobile_number: "123456789",
    added_on: "25 Apr 2023",
    sent_accepted: "8/3",
    watches_history: true,
    reset_password: true,
  },
];

const ManageStaff = () => {
  const [data, setData] = useState(history);
  const [archivedData, setArchivedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    mobile_number: "",
    added_on: moment().format("D MMM YYYY"),
    sent_accepted: "0/0",
    online: false,
    active: true,
    watches_history: false,
    reset_password: false,
  });
  const userRole = localStorage.getItem("userRole");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditStaff = () => {
    setIsEditMode(true);
    setIsAddMode(false);
    setIsArchiveMode(false);
  };

  const handleAddStaff = () => {
    setIsAddMode(true);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setEditingIndex(-1);
  };

  const handleArchiveStaff = () => {
    setIsArchiveMode(true);
    setIsAddMode(false);
    setIsEditMode(false);
  };

  const handleNewStaffChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setData(updatedData);
  };

  const handleSaveStaff = () => {
    if (editingIndex === -1) {
      setData([...data, newStaff]);
    }
    setEditingIndex(null);
    setIsAddMode(false);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setNewStaff({
      name: "",
      email: "",
      mobile_number: "",
      added_on: moment().format("D MMM YYYY"),
      sent_accepted: "0/0",
      online: false,
      active: true,
      watches_history: false,
      reset_password: false,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAddMode(false);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setNewStaff({
      name: "",
      email: "",
      mobile_number: "",
      added_on: moment().format("D MMM YYYY"),
      sent_accepted: "0/0",
      online: false,
      active: true,
      watches_history: false,
      reset_password: false,
    });
    setSelectedRows([]);
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((i) => i !== index);
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

  const handleArchiveSelected = () => {
    const newArchivedData = selectedRows.map((index) => data[index]);
    const newData = data.filter((_, index) => !selectedRows.includes(index));
    setArchivedData([...archivedData, ...newArchivedData]);
    setData(newData);
    setSelectedRows([]);
    setIsArchiveMode(false);
  };

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-[5px] sm:px-[20px] pt-8 flex justify-between flex-wrap dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <div className="flex sm:flex-row flex-col w-full justify-between">
          <div className="flex flex-col">
            <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans dark:text-[#ffff] text-black">
              Manage Staff
            </h1>
            <div className="flex sm:flex-row flex-col space-x-0 sm:gap-0 gap-4 sm:space-x-4 mb-4">
              {isAddMode || isEditMode || isArchiveMode ? (
                <div className="flex gap-2">
                  <Button
                    variant="contained"
                    className="!bg-[#00a65a] !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] text-white !capitalize !rounded-[50px]"
                    onClick={
                      isArchiveMode ? handleArchiveSelected : handleSaveStaff
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    className="!bg-[#F0F0F0] !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !text-black !capitalize !rounded-[50px]"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex sm:flex-row flex-col gap-2">
                  <Button
                    variant="contained"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleAddStaff}
                  >
                    Add Staff
                  </Button>
                  <Button
                    variant="contained"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleEditStaff}
                  >
                    Edit Staff
                  </Button>
                  <Button
                    variant="contained"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleArchiveStaff}
                  >
                    Archive Staff
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex  justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder={"Search"}
            />
          </div>
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              {isArchiveMode && (
                <th className="p-2 dark:text-[#ffff] text-black text-center">
                  Select
                </th>
              )}
              {[
                { key: "online", label: "Online" },
                { key: "active", label: "Active" },
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "mobile_no", label: "Mobile number" },
                { key: "added_on", label: "Added on" },
                { key: "sent/accepted", label: "Sent/Accepted" },
                { key: "watches_history", label: "Watches History" },
                { key: "reset_password", label: "Reset Password" },
              ].map((column) => (
                <th
                  key={column.key}
                  className="p-2 dark:text-[#ffff] text-black text-center"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} className="border-b border-[#202b34]">
                  {isArchiveMode && (
                    <td className="px-[18px] py-[10px] text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelect(index)}
                      />
                    </td>
                  )}
                  <td className="px-[18px] py-[10px] text-center">
                    <span
                      className={`${item?.online ? "dot-green" : "dot-red"}`}
                    />
                  </td>
                  <td className="px-[18px] py-[10px] text-center">
                    <CustomSwitch
                      name={`active${index}`}
                      checked={item?.active}
                      onChange={() => {}}
                    />
                  </td>
                  <td className="px-[18px] py-[10px] text-center">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="name"
                        value={item?.name}
                        onChange={(e) => handleNewStaffChange(index, e)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      item?.name
                    )}
                  </td>
                  <td className="px-[18px] py-[10px] text-center">
                    {isEditMode ? (
                      <input
                        type="email"
                        name="email"
                        value={item?.email}
                        onChange={(e) => handleNewStaffChange(index, e)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      item?.email
                    )}
                  </td>
                  <td className="px-[18px] py-[10px] text-center">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="mobile_number"
                        value={item?.mobile_number}
                        onChange={(e) => handleNewStaffChange(index, e)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      item?.mobile_number
                    )}
                  </td>
                  <td className="px-[18px] py-[10px] text-center">
                    {item?.added_on}
                  </td>
                  <td className="px-[18px] py-[10px] text-center">
                    {item?.sent_accepted}
                  </td>
                  <td className="px-[18px] py-[10px] text-center">
                    <div className="flex justify-center">
                      <img src={StaffWatch} alt="Watch" width="35px" />
                    </div>
                  </td>
                  <td className="px-[18px] py-[10px] text-center ">
                    <div className="flex justify-center">
                      <img src={StaffLock} alt="Lock" width="35px" />
                    </div>
                  </td>
                </tr>
              );
            })}

            {isAddMode && (
              <tr>
                {isArchiveMode && (
                  <td className="px-[18px] py-[10px] text-center">
                    <input type="checkbox" />
                  </td>
                )}
                <td className="px-[18px] py-[10px] text-center">
                  <span className="dot-green" />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <CustomSwitch
                    name="active"
                    checked={newStaff.active}
                    onChange={() => {}}
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="text"
                    name="name"
                    value={newStaff.name}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, name: e.target.value })
                    }
                    placeholder="Name"
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="email"
                    name="email"
                    value={newStaff.email}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, email: e.target.value })
                    }
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="text"
                    name="mobile_number"
                    value={newStaff.mobile_number}
                    onChange={(e) =>
                      setNewStaff({
                        ...newStaff,
                        mobile_number: e.target.value,
                      })
                    }
                    placeholder="Mobile Number"
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  {newStaff.added_on}
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  {newStaff.sent_accepted}
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <div className="flex justify-center">
                    <img src={StaffWatch} alt="Watch" width="35px" />
                  </div>
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <div className="flex justify-center">
                    <img src={StaffLock} alt="Lock" width="35px" />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={history?.length}
        userRole={userRole}
      />
    </div>
  );
};

export default ManageStaff;
