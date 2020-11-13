import React from "react";
import logo from "assets/imgs/logo.png";
import { Avatar, IconButton, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f6",
    position: "relative",
    textAlign: "center",
  },
  logo: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  chip: { padding: theme.spacing(1) },
  title: {
    // display: "inline-block",
    // padding: "8px",
    // outline: "1px solid grey",
    // outlineOffset: "5px",
  },
  icon: {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

export default function Header({ icon, hdClick }) {
  const cls = useStyles();
  return (
    <div className={cls.root}>
      <Avatar src={logo} className={cls.logo}></Avatar>
      {/* <Chip className={cls.chip} variant="outlined" label={<Typography variant="h5">B4E Wallet</Typography>}></Chip> */}
      <Typography className={cls.title} variant="h5">
        B4E Wallet
      </Typography>
      {icon ? (
        <IconButton onClick={hdClick} className={cls.icon}>
          {icon}
        </IconButton>
      ) : null}
    </div>
  );
}
