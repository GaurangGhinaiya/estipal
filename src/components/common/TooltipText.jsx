import { Tooltip } from "@mui/material";
import React from "react";

const TooltipText = () => {
  return (
    <Tooltip title="Add" placement="top-start">
      <Button>top-start</Button>
    </Tooltip>
  );
};

export default TooltipText;
