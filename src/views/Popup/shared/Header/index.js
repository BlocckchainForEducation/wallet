import React from "react";
import logo from "assets/imgs/logo.png";
import { Avatar, IconButton, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f6",
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
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
      {/* <img alt="Logo" className={cls.logo} /> */}
      <Avatar src={logo} className={cls.logo}></Avatar>
      <Typography variant="h5" align="center">
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
