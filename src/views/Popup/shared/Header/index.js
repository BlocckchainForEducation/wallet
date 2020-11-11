import React from "react";
import logo from "assets/imgs/logo.png";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 2),
    backgroundColor: "#f1f2f6",
    position: "relative",
    // textAlign: "center",
  },
  logo: {
    position: "absolute",
    width: "2rem",
    height: "2rem",
  },
}));

export default function Header() {
  const cls = useStyles();
  return (
    <div className={cls.root}>
      <img src={logo} alt="Logo" className={cls.logo} />
      <Typography variant="h5" align="center">
        B4E Wallet
      </Typography>
    </div>
  );
}
