import React from "react";
import logo from "assets/imgs/logo.png";
import { makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f6",
    position: "relative",
  },
  logo: {
    position: "absolute",
    width: "2rem",
    height: "2rem",
  },
  icon: {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

export default function Header({ icon }) {
  const cls = useStyles();
  return (
    <div className={cls.root}>
      <img src={logo} alt="Logo" className={cls.logo} />
      <Typography variant="h5" align="center">
        B4E Wallet
      </Typography>
      {icon ? React.cloneElement(icon, { className: cls.icon }) : null}
    </div>
  );
}
