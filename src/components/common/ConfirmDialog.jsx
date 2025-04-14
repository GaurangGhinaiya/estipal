import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";

const ConfirmDialog = ({
  open,
  handleClose,
  handleConfirm,
  title,
  content,
  type,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: type === "staff" ? "white " : "#283641",
          color: "#fff",
          minWidth: "250px",
        },
      }}
    >
      <DialogTitle sx={{ color: type === "staff" ? "black" : "white" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#fff" }}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: type === "staff" ? "space-between" : "",
        }}
      >
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        {/* <Button onClick={handleConfirm} variant="contained">
          Confirm
        </Button> */}

        <LoadingButton
          variant="contained"
          loading={loading}
          // className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
          onClick={handleConfirm}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
