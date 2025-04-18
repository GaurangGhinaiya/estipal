import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StaffLock from "../../../assets/images/icons/Stafflock.png";
import StaffWatch from "../../../assets/images/icons/staffWatch.png";
import CustomSwitch from "../../../components/common/CustomSwitch";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import useDebounce from "../../../components/common/UseDebounce";
import axiosInstance from "../../../services";
import SaveIcon from "@mui/icons-material/Save";
import { translate } from "../../../language";

const ManageStaff = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track the ID of the row being edited
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [manageStaffData, setManageStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState("");
  const userRole = localStorage.getItem("userRole");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [newStaff, setNewStaff] = useState({
    username: "",
    email: "",
    cnt_no: "",
    added_on: moment().unix(),
    sent_accepted: "0/0",
    online: false,
    active: true,
    watches_history: false,
    reset_password: false,
  });

  // Handle modal toggle
  const toggleModal = () => setOpen((prev) => !prev);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditStaff = (id) => {
    const staffToEdit = manageStaffData?.find((staff) => staff?.id === id);
    if (staffToEdit) {
      setNewStaff({
        username: staffToEdit?.username,
        email: staffToEdit?.email,
        cnt_no: staffToEdit?.cnt_no,
        active: staffToEdit?.active,
        added_on: staffToEdit?.created_on,
        sent_accepted: staffToEdit?.sent_accepted,
        online: staffToEdit?.is_user_login,
        watches_history: staffToEdit?.watches_history,
        reset_password: staffToEdit?.reset_password,
      });
      setEditingId(id); // Set the ID of the row being edited
      setIsEditMode(true);
      setIsAddMode(false);
      setIsArchiveMode(false);
    }
  };

  const handleAddStaff = () => {
    setIsAddMode(true);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setEditingId(""); // Use a special ID to identify the new row
    setNewStaff({
      username: "",
      email: "",
      cnt_no: "",
      added_on: moment().unix(),
      sent_accepted: "0/0",
      online: false,
      active: true,
      watches_history: false,
      reset_password: false,
    });
  };

  const handleResetPassword = async () => {
    const payload = {
      email: resetPasswordData?.email,
      type: "staff",
    };
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `/sellers/forgetPassword`,
        payload
      );
      toast.success(response?.message);
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
      toggleModal();
    }
  };

  const handleArchiveStaff = () => {
    setIsArchiveMode(true);
    setIsAddMode(false);
    setIsEditMode(false);
  };

  const handleRowSelect = (item, index) => {
    setManageStaffData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        is_deleted: !updatedData[index]?.is_deleted, // Toggle the is_deleted value
      };
      return updatedData;
    });

    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows?.some((archived) => archived?.id === item?.id)) {
        return prevSelectedRows?.map((archived) =>
          archived?.id === item?.id
            ? { ...archived, is_deleted: !archived.is_deleted }
            : archived
        );
      } else {
        return [...prevSelectedRows, { ...item, is_deleted: true }];
      }
    });
  };

  useEffect(() => {
    if (manageStaffData?.length > 0) {
      const archivedRows = manageStaffData?.filter((item) => item?.is_deleted);
      const filteredSelectedRows = selectedRows?.filter(
        (item) => !archivedRows?.some((archived) => archived?.id === item?.id)
      );
      const allData = [...filteredSelectedRows, ...archivedRows];
      setSelectedRows(allData);
    }
  }, [manageStaffData]);

  const handleNewStaffChange = (index, e) => {
    const { name, type, checked, value } = e.target;
    const updatedData = [...manageStaffData];
    updatedData[index] = {
      ...updatedData[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setNewStaff(updatedData);
    setManageStaffData(updatedData);
  };

  const getManageStaffList = async () => {
    const searchValue = JSON.stringify(
      debouncedSearchTerm?.includes("@")
        ? { email: debouncedSearchTerm || "" }
        : {
            username: debouncedSearchTerm || "",
            ...(isArchiveMode ? {} : { is_deleted: false }),
          }
    );
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/manageStaffUser?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
      );
      setManageStaffData(response?.payload?.data);
      setTotalRecords(response?.pager?.total_records);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveStaff = async () => {
    if (isArchiveMode) {
      const idArray = selectedRows?.map((item) => ({
        id: item?.id,
        is_deleted: item?.is_deleted,
      }));

      const payload = {
        ids: idArray,
      };
      try {
        setIsLoading(true);
        const response = await axiosInstance.post(
          "/manageStaffUser/archive",
          payload
        );
        toast.success("Selected staff archived successfully");
      } catch (error) {
        console.error("Error archiving staff:", error);
      } finally {
        setIsLoading(false);
      }
      resetFormState();
    } else {
      const isEditing = Boolean(editingId);
      const staffData = isEditing
        ? manageStaffData.find((staff) => staff?.id === editingId)
        : newStaff;

      const payload = {
        username: staffData?.username,
        email: staffData?.email,
        cnt_no: +staffData?.cnt_no,
        active: staffData?.active,
      };

      if (staffData?.username && staffData?.email && staffData?.cnt_no) {
        try {
          setIsLoading(true);
          const response = isEditing
            ? await axiosInstance.put(
                `/manageStaffUser?id=${editingId}`,
                payload
              )
            : await axiosInstance.post(`/manageStaffUser`, payload);

          const updatedData = response?.payload?.data;

          if (response?.status === 200) {
            if (isEditing) {
              setManageStaffData((prevData) =>
                prevData.map((staff) =>
                  staff.id === editingId ? { ...staff, ...updatedData } : staff
                )
              );
              toast.success("Staff updated successfully");
            } else {
              setManageStaffData(updatedData);
              toast.success("Staff added successfully");
            }
            // Reset states after saving
            resetFormState();
          } else {
            toast.error(response?.message || "Error occurred !");
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        toast.error("Please fill all required fields !");
      }
    }
  };

  const resetFormState = () => {
    setCurrentPage(1);
    getManageStaffList();
    setEditingId(null);
    setIsAddMode(false);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setNewStaff({
      username: "",
      email: "",
      cnt_no: "",
      added_on: moment().unix(),
      sent_accepted: "0/0",
      online: false,
      active: true,
      watches_history: false,
      reset_password: false,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAddMode(false);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setNewStaff({
      username: "",
      email: "",
      cnt_no: "",
      added_on: moment().unix(),
      sent_accepted: "0/0",
      online: false,
      active: true,
      watches_history: false,
      reset_password: false,
    });
    setSelectedRows([]);
  };

  useEffect(() => {
    getManageStaffList();
  }, [currentPage, debouncedSearchTerm, isArchiveMode]);

  return (
    <div className="pb-[15px] min-h-[100vh]">
      {/* Header Section */}
      <div className="px-[20px] pt-8 flex justify-between flex-wrap dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <div className="flex sm:flex-row flex-col w-full justify-between">
          <div className="flex flex-col">
            <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans dark:text-[#ffff] text-black">
              {translate("MANAGESTAFF")}
            </h1>
            <div className="flex sm:flex-row flex-col space-x-0 sm:gap-0 gap-4 sm:space-x-4 mb-4">
              {isAddMode || isEditMode || isArchiveMode ? (
                <div className="flex gap-2">
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    loadingPosition="end"
                    className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] !text-white sm:!px-[35px] !px-[35px] !rounded-[50px]"
                    onClick={() => {
                      handleSaveStaff();
                    }}
                  >
                    {translate("SAVE")}
                  </LoadingButton>
                  <Button
                    variant="contained"
                    className="!bg-[#F0F0F0] !px-[35px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !text-black !capitalize !rounded-[50px]"
                    onClick={handleCancel}
                  >
                    {translate("CANCEL")}
                  </Button>
                </div>
              ) : (
                <div className="flex sm:flex-row flex-col gap-2">
                  <Button
                    variant="contained"
                    size="small"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleAddStaff}
                  >
                    {translate("ADDSTAFF")}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleArchiveStaff}
                  >
                    {translate("ARCHIVESTAFF")}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex  justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setCurrentPage={setCurrentPage}
              placeholder={`${translate("SEARCH")}`}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
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
                { key: "online", label: `${translate("ONLINE")}` },
                { key: "active", label: `${translate("ACTIVE")}` },
                { key: "name", label: `${translate("NAME")}` },
                { key: "email", label: `${translate("EMAIL")}` },
                { key: "mobile_no", label: `${translate("MOBILENUMBER")}` },
                { key: "added_on", label: `${translate("ADDEDON")}` },
                { key: "sent/accepted", label: `${translate("SENTACCEPTED")}` },
                {
                  key: "watches_history",
                  label: `${translate("WATCHESHISTORY")}`,
                },
                {
                  key: "reset_password",
                  label: `${translate("RESETPASSWORD")}`,
                },
                { key: "action", label: `${translate("ACTION")}` },
              ].map((column) => (
                <th
                  key={column.key}
                  className="p-2 dark:text-[#ffff] text-black text-center text-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {manageStaffData?.length > 0
              ? manageStaffData?.map((item, index) => {
                  return (
                    <tr key={index} className="border-b border-[#202b34]">
                      {isArchiveMode && (
                        <td className="px-[18px] py-[10px] text-center">
                          <input
                            type="checkbox"
                            checked={item?.is_deleted}
                            onChange={() => handleRowSelect(item, index)}
                          />
                        </td>
                      )}
                      <td className="px-[18px] py-[10px] text-center">
                        <span
                          className={`${
                            item?.is_user_login === 1 ? "dot-green" : "dot-red"
                          }`}
                        />
                      </td>
                      <td className="px-[18px] py-[10px] text-center">
                        {editingId === item.id ? (
                          <CustomSwitch
                            name="active"
                            checked={item?.active}
                            onChange={(e) =>
                              handleNewStaffChange(index, {
                                target: {
                                  name: "active",
                                  type: "checkbox",
                                  checked: !item?.active,
                                },
                              })
                            }
                          />
                        ) : (
                          <CustomSwitch
                            name={`active${index}`}
                            checked={item?.active}
                          />
                        )}
                      </td>
                      <td className="px-[18px] py-[10px] text-center font-bold">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            name="username"
                            value={item?.username}
                            onChange={(e) => handleNewStaffChange(index, e)}
                            className="p-2 border border-gray-300 rounded"
                          />
                        ) : (
                          item?.username
                        )}
                      </td>
                      <td className="px-[18px] py-[10px] text-center font-bold">
                        {editingId === item.id ? (
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
                      <td className="px-[18px] py-[10px] text-center font-bold">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            name="cnt_no"
                            value={item?.cnt_no}
                            onChange={(e) => handleNewStaffChange(index, e)}
                            className="p-2 border border-gray-300 rounded"
                          />
                        ) : (
                          item?.cnt_no
                        )}
                      </td>
                      <td className="px-[18px] py-[10px] text-center whitespace-nowrap">
                        {moment.unix(item?.created_on).format("DD MMM YYYY")}
                      </td>
                      <td className="px-[18px] py-[10px] text-center">
                        {`${item?.sent_quotations}/${item?.accepted_quotations}`}
                      </td>
                      <td
                        className="px-[18px] py-[10px] text-center cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/admin/watch_details/watch_history?staff_id=${item?.id}`
                          )
                        }
                      >
                        <div className="flex justify-center">
                          <img src={StaffWatch} alt="Watch" width="35px" />
                        </div>
                      </td>
                      <td
                        className="px-[18px] py-[10px] text-center cursor-pointer"
                        onClick={() => {
                          setOpen(true);
                          setResetPasswordData(item);
                        }}
                      >
                        <div className="flex justify-center">
                          <img src={StaffLock} alt="Lock" width="35px" />
                        </div>
                      </td>
                      <td className="px-[18px] py-[10px] text-center cursor-pointer">
                        <button
                          className="text-black "
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the edit button from triggering other events
                            handleEditStaff(item.id); // Open the modal
                          }}
                        >
                          <FaEdit size={28} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              : !isAddMode && (
                  <tr>
                    <td
                      colSpan={12}
                      className="py-[200px] px-4  text-center text-nowrap dark:text-[#ffff] text-black font-bold"
                    >
                      No Data Found
                    </td>
                  </tr>
                )}

            {isAddMode && (
              <tr>
                {isArchiveMode && (
                  <td className="px-[18px] py-[10px] text-center">
                    <input type="checkbox" />
                  </td>
                )}
                <td className="px-[18px] py-[10px] text-center">
                  <span className="dot-red" />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <CustomSwitch name="active" checked={newStaff?.active} />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="text"
                    name="username"
                    value={newStaff?.username}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, username: e.target.value })
                    }
                    required
                    placeholder={`${translate("NAME")}`}
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="email"
                    name="email"
                    value={newStaff?.email}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, email: e.target.value })
                    }
                    placeholder={`${translate("EMAIL")}`}
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="text"
                    name="cnt_no"
                    value={newStaff?.cnt_no}
                    onChange={(e) =>
                      setNewStaff({
                        ...newStaff,
                        cnt_no: e.target.value,
                      })
                    }
                    placeholder={`${translate("MOBILENUMBER")}`}
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center ">
                  {moment.unix(newStaff?.added_on).format("DD MMM YYYY")}
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  {newStaff?.sent_accepted}
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
                <td onClick={() => handleEditStaff("")}>
                  <button
                    className="text-black"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the edit button from triggering other events
                      handleEditStaff(""); // Open the modal
                    }}
                  >
                    <FaEdit size={28} />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={manageStaffData}
        userRole={userRole}
      />

      {/* Modal */}
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            py: 2,
            borderRadius: 2,
            border: "none",
          }}
        >
          <div
            onClick={toggleModal}
            className="flex justify-between px-[16px] pb-[16px] cursor-pointer"
          >
            <p className="text-black font-semibold text-[18px]">
              Reset Password
            </p>{" "}
            <CloseIcon className="text-black font-semibold" />
          </div>

          <Box
            mt={2}
            display="flex"
            sx={{ px: "16px" }}
            justifyContent="center"
            gap={1.5}
          >
            <LoadingButton
              loading={isLoading}
              variant="contained"
              loadingPosition="end"
              className="!bg-[#3C8DBC] !text-[14px]  !text-white !px-[40px] sm:!px-[35px] !py-[10px] sm:!py-[8px]"
              onClick={() => {
                handleResetPassword();
              }}
            >
              Send
            </LoadingButton>
            {/* <Button variant="contained" style={{ backgroundColor: "#3C8DBC" }} onClick={handleResetPassword} >
              Send
            </Button> */}
            <Button
              variant="outlined"
              onClick={toggleModal}
              sx={{ color: "#3C8DBC", borderColor: "#3C8DBC" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageStaff;
