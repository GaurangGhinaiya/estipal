import { Box, Button, Divider, Modal } from "@mui/material";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";

const Translation = ({ item, updateItem }) => {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isEditData, setIsEditData] = useState(null);

  const toggleModal = () => setOpen((prev) => !prev);

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleEdit = () => {
    if (isEditData) {
      const updatedItem = {
        ...item,
        [isEditData.code.toLowerCase()]: inputText,
      };
      updateItem(updatedItem);
      toggleModal();
    }
  };

  const translations = Object.entries(item)
    .filter(([key]) => !["id", "group_id"].includes(key))
    .map(([code, value]) => ({
      code: code.toUpperCase(),
      value,
    }));

  return (
    <div className="w-full my-[20px]">
      <div className="bg-[#1E252B] text-white p-6 rounded-lg shadow-lg">
        {translations.map((translation) => (
          <div
            key={translation.code}
            className="flex items-center justify-between gap-[20px] py-3"
          >
            <div className="text-center font-bold text-[16px] sm:pl-[35px]">
              {translation.code}
            </div>
            <div className="w-[90%] flex items-center bg-[#283641] text-white px-4 rounded-md h-[55px]">
              {translation.value || ""}
            </div>
            <button
              className="text-yellow-500"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditData(translation);
                setInputText(translation.value || "");
                toggleModal();
              }}
            >
              <FaEdit size={30} />
            </button>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={toggleModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#1E252B",
            boxShadow: 24,
            py: 2,
            borderRadius: 2,
          }}
        >
          <div
            onClick={toggleModal}
            className="flex justify-end pr-[16px] pb-[16px] cursor-pointer"
          >
            <CloseIcon className="text-white font-semibold" />
          </div>
          <Divider className="!border-white" />
          <div className="text-white font-semibold text-base py-3 px-[20px]">
            Edit Translation ({isEditData?.code})
          </div>
          <div className="w-full px-[20px] pb-[18px]">
            <input
              type="text"
              name="inputText"
              className="w-full py-[16px] px-[12px] text-white text-[16px] outline-none bg-[#1E252B] border border-[#3c8dbc] rounded-lg"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>
          <Divider className="!border-white" />
          <Box
            mt={2}
            display="flex"
            sx={{ px: "16px" }}
            justifyContent="flex-end"
            gap={1.5}
          >
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Save
            </Button>
            <Button variant="outlined" onClick={toggleModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Translation;
