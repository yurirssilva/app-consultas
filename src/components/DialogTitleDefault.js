import { DialogTitle, IconButton, Typography } from "@material-ui/core";
import React from "react";

const DialogTitleDefault = (props) => {
  return (
    <DialogTitle style={{ paddingBottom: "0px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px",
        }}
      >
        <Typography
          variant="h5"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {props.text}
        </Typography>
        <IconButton aria-label="fechar" onClick={props.setOpen}>
          {props.icon}
        </IconButton>
      </div>
    </DialogTitle>
  );
};

export default DialogTitleDefault;
