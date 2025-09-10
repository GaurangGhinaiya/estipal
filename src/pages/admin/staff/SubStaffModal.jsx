import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Tooltip } from "@mui/material";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import StaffLock from "../../../assets/images/icons/Stafflock.png";
import WatchHistoryImage from "../../../assets/images/icons/Watch history 2.png";
import CustomSwitch from "../../../components/common/CustomSwitch";
import PaginationComponent from "../../../components/common/PaginationComponent";
import { useTranslate } from "../../../language";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../services";
import { useNavigate } from "react-router-dom";
function SubStaffModal({
  currentPage,
  getStaffUserData,
  openID,
  data,
  setData,
  setModalopen,
  Modalopen,
  handlePageChangesub,
  currentItems,
  setCurrentPageSub,
  currentPagesub,

  staffList,
  recordsPerPagesub,
}) {
  console.log("currentPagesub====", currentPagesub);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { translate } = useTranslate();
  const [editingId, setEditingId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleModal = () => setOpen((prev) => !prev);
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
  const [isLoading, setIsLoading] = useState(false);
  const handleSaveStaff = async () => {
    const isEditing = Boolean(editingId);
    // const staffData = isEditing
    //   ? data.find((staff) => staff?.id === editingId)
    //   : newStaff;

    const payload = {
      username: newStaff?.username,
      email: newStaff?.email,
      cnt_no: +newStaff?.cnt_no,
      active: newStaff?.active,
    };

    if (newStaff?.username && newStaff?.email && newStaff?.cnt_no) {
      try {
        setIsLoading(true);
        const response = isEditing
          ? await axiosInstance.put(`/manageStaffUser?id=${editingId}`, payload)
          : await axiosInstance.post(
              `/manageStaffUser?sellerId=${openID}`,
              payload
            );

        if (response?.status === 200) {
          setEditingId("");
          getStaffUserData(currentPage);
          setIsAddMode(false);
          setIsEditMode(false);
          toast.success(response.message);
          resetFormState();
        } else {
          toast.error(response?.message || "Error occurred !");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error occurred !");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill all required fields !");
    }
  };
  const handleEditStaff = (id, item) => {
    console.log(item);

    const staffToEdit = item;
    console.log(staffToEdit, id);

    if (staffToEdit) {
      setNewStaff({
        username: staffToEdit?.username,
        email: staffToEdit?.email,
        cnt_no: staffToEdit?.cnt_no,
        active: !staffToEdit?.active,
        added_on: staffToEdit?.created_on,
        sent_accepted: staffToEdit?.sent_accepted,
        online: staffToEdit?.is_user_login,
        watches_history: staffToEdit?.watches_history,
        reset_password: staffToEdit?.reset_password,
      });
      setEditingId(staffToEdit.id); // Set the ID of the row being edited
      setIsEditMode(true);
      setIsAddMode(false);
    }
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
  const handleAddStaff = () => {
    setIsAddMode(true);
    setIsEditMode(false);

    setEditingId("");
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
  const handleNewStaffChange = (id, e) => {
    console.log("sdfg");

    const { name, type, checked, value } = e.target;
    console.log("name: ", name, type, value);

    setData((prev) =>
      prev.map((seller) => ({
        ...seller,
        adminUserDetails: seller?.adminUserDetails?.map((user) =>
          user?.id === id
            ? { ...user, [name]: type === "checkbox" ? checked : value }
            : user
        ),
      }))
    );
    setNewStaff((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleCancel = () => {
    setEditingId(null);
    setIsAddMode(false);
    setIsEditMode(false);

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
  const resetFormState = () => {
    // setCurrentPageSub(1);
    setEditingId(null);
    setIsAddMode(false);
    setIsEditMode(false);

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
  return (
    <div>
      {" "}
      <div className="mx-auto border border-gray-300 rounded-lg overflow-hidden p-5">
        {/* Buttons row */}
        <div className="flex justify-between">
          {isAddMode || isEditMode ? (
            <div className="flex gap-2 ">
              <LoadingButton
                loading={isLoading}
                variant="contained"
                loadingPosition="end"
                className="!bg-[#00a65a] !normal-case  !px-[40px] sm:!px-[40px] !py-[5px] leading-normal sm:!py-[5px]  !text-white  !rounded-[50px]"
                onClick={() => {
                  handleSaveStaff();
                }}
              >
                {translate("SAVE")}
              </LoadingButton>
              <Button
                variant="contained"
                className="!bg-[#F0F0F0] !px-[15px] sm:!px-[15px] !py-[5px] leading-normal sm:!py-[5px] !text-black !capitalize !rounded-[50px]"
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
                className="!bg-[#3C8DBC] text-white text-nowrap  !px-[15px] sm:!px-[15px] !py-[5px] leading-normal sm:!py-[5px] !capitalize !rounded-[50px]"
                onClick={handleAddStaff}
              >
                {translate("ADDSTAFF")}
              </Button>
            </div>
          )}
          <CancelIcon
            sx={{ color: "white" }}
            onClick={() => {
              setCurrentPageSub(1);

              setModalopen(false);
            }}
          />
        </div>
        <table
          className="w-full text-left "
          style={{
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              {[
                {
                  key: "online",
                  label: `${translate("ONLINE")}`,
                },
                {
                  key: "active",
                  label: `${translate("ACTIVE")}`,
                },
                {
                  key: "name",
                  label: `${translate("NAME")}`,
                },
                {
                  key: "email",
                  label: `${translate("EMAIL")}`,
                },
                {
                  key: "mobile_no",
                  label: `${translate("MOBILENUMBER")}`,
                },
                {
                  key: "added_on",
                  label: `${translate("ADDEDON")}`,
                },
                {
                  key: "sent/accepted",
                  label: `${translate("SENTACCEPTED")}`,
                },
                {
                  key: "watches_history",
                  label: `${translate("WATCHESHISTORY")}`,
                },
                {
                  key: "reset_password",
                  label: `${translate("RESETPASSWORD")}`,
                },
                {
                  key: "action",
                  label: `${translate("ACTION")}`,
                },
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
            <>
              {currentItems?.length > 0 ? (
                currentItems?.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#202b34] text-white"
                  >
                    <td className="px-[18px] py-[10px] text-center">
                      <span
                        className={`${
                          user?.is_user_login === 1 ? "dot-green" : "dot-red"
                        }`}
                      />
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {editingId === user.id ? (
                        <CustomSwitch
                          name="active"
                          checked={user?.active}
                          onChange={() =>
                            handleNewStaffChange(user.id, {
                              target: {
                                name: "active",
                                type: "checkbox",
                                checked: !user?.active,
                              },
                            })
                          }
                        />
                      ) : (
                        <CustomSwitch
                          name={`active${index}`}
                          checked={user?.active}
                        />
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center font-bold">
                      {editingId === user.id ? (
                        <input
                          type="text"
                          name="username"
                          value={newStaff.username}
                          onChange={(e) => handleNewStaffChange(index, e)}
                          className="p-2 border border-gray-300 rounded text-black"
                        />
                      ) : (
                        user?.username
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center font-bold">
                      {editingId === user.id ? (
                        <input
                          type="email"
                          name="email"
                          value={newStaff?.email}
                          onChange={(e) => handleNewStaffChange(index, e)}
                          className="p-2 border border-gray-300 rounded text-black"
                        />
                      ) : (
                        user?.email
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center font-bold">
                      {editingId === user.id ? (
                        <input
                          type="text"
                          name="cnt_no"
                          value={newStaff?.cnt_no}
                          onChange={(e) => handleNewStaffChange(index, e)}
                          className="p-2 border border-gray-300 rounded text-black"
                        />
                      ) : (
                        user?.cnt_no
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center whitespace-nowrap">
                      {moment.unix(user?.created_on).format("DD MMM YYYY")}
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {`${user?.sent_quotations}/${user?.accepted_quotations}`}
                    </td>
                    <td className="px-[18px] py-[10px] text-center cursor-pointer">
                      <div className="flex justify-center">
                        <Tooltip title="Watches History" placement="top-start">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/admin/watch_details/watch_history/?staff_id=${user?.id}`
                              );
                            }}
                            className="cursor-pointer w-[30px] h-[30px]"
                          >
                            <img
                              alt="start"
                              id="star"
                              className="w-[30px] h-[30px]"
                              style={{ filter: "invert(1)" }}
                              src={WatchHistoryImage}
                            />
                          </div>{" "}
                        </Tooltip>
                      </div>
                    </td>
                    <td
                      className="px-[18px] py-[10px] text-center cursor-pointer "
                      onClick={() => {
                        setOpen(true);
                        setResetPasswordData(user);
                      }}
                    >
                      <div className="flex justify-center ">
                        <img
                          src={StaffLock}
                          style={{ filter: "invert(1)" }}
                          alt="Lock"
                          width="35px"
                        />
                      </div>
                    </td>
                    <td className="px-[18px] py-[10px] text-center cursor-pointer">
                      <button
                        className="text-white "
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the edit button from triggering other events
                          handleEditStaff(user.id, user); // Open the modal
                        }}
                      >
                        <FaEdit size={28} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={12}
                    className="py-[200px] px-4 text-center text-nowrap dark:text-[#ffff] text-black font-bold"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
              {isAddMode && (
                <tr className="">
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
                        setNewStaff({
                          ...newStaff,
                          username: e.target.value,
                        })
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
                        setNewStaff({
                          ...newStaff,
                          email: e.target.value,
                        })
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
                  <td className="px-[18px] py-[10px] text-center text-white ">
                    {moment.unix(newStaff?.added_on).format("DD MMM YYYY")}
                  </td>
                  <td className="px-[18px] py-[10px] text-center text-white">
                    {newStaff?.sent_accepted}
                  </td>
                </tr>
              )}
            </>
          </tbody>
        </table>
        {/* {totalPages > 1 && ( */}

        <PaginationComponent
          count={Math.ceil(staffList.length / recordsPerPagesub)}
          currentPage={currentPagesub}
          totalPages={staffList.length}
          recordsPerPage={recordsPerPagesub}
          handlePageChange={handlePageChangesub}
          data={staffList}
        />

        {/* )} */}
      </div>
      <Modal open={open} className="">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "white",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#283641",
            boxShadow: 24,
            py: 2,
            borderRadius: 2,
            border: "none",
          }}
        >
          <div
            onClick={toggleModal}
            className="flex justify-between px-[16px] pb-[16px] cursor-pointer "
          >
            <p className="text-white font-semibold text-[18px]">
              Reset Password
            </p>{" "}
            <CloseIcon className="text-white font-semibold" />
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
              sx={{ color: "white", borderColor: "#3C8DBC" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default SubStaffModal;
