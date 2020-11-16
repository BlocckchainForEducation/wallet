import React from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createAccount, lockWallet } from "../redux";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f6",
    position: "relative",
    textAlign: "center",
  },
  leftBtn: {
    position: "absolute",
    left: "0.25rem",
    top: "50%",
    transform: "translateY(-50%)",
  },
  rightBtn: {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

export default function CustomHeader() {
  const cls = useStyles();
  const dp = useDispatch();

  function hdLockWallet(e) {
    dp(lockWallet());
    window.close();
  }

  function hdAddAccount(e) {
    dp(createAccount());
  }

  return (
    <div className={cls.root}>
      <IconButton onClick={hdLockWallet} className={cls.leftBtn}>
        <LockOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography className={cls.title} variant="h5">
        B4E Wallet
      </Typography>
      <IconButton onClick={hdAddAccount} className={cls.rightBtn}>
        <Add fontSize="large" />
      </IconButton>
    </div>
  );
}
