import { Avatar, Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Container from "../shared/Container";
import Header from "../shared/Header";

import logo from "assets/imgs/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { unlockWallet } from "../redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },

  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    display: "block",
    margin: theme.spacing(3, "auto"),
  },
  welcome: {
    fontWeight: "bold",
    marginBottom: theme.spacing(6),
  },
}));

export default function AskPassword() {
  const cls = useStyles();
  const walletPassword = useSelector((state) => state.walletPassword);
  const shouldAskPassword = useSelector((state) => state.shouldAskPassword);
  const dp = useDispatch();
  const [state, setState] = useState({
    password: "",
    error: null,
  });

  return (
    <div>
      <Container>
        {shouldAskPassword ? null : <Redirect to="/"></Redirect>}
        <Header></Header>
        <Box className={cls.root} px={3}>
          {/* <Avatar className={cls.avatar} src={logo}></Avatar> */}
          <img src={logo} alt="logo" className={cls.avatar}></img>
          <Typography className={cls.welcome} variant="h4" align="center">
            Chào mừng bạn trở lại!
          </Typography>
          <Typography></Typography>
          <TextField
            fullWidth
            variant="filled"
            label="Nhập mật khẩu để mở ví"
            type="password"
            InputLabelProps={{ shrink: true }}
            value={state.password}
            error={Boolean(state.error)}
            helperText={state.error}
            onChange={(e) => setState({ password: e.target.value })}
          ></TextField>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={(e) => {
              if (state.password !== walletPassword) {
                setState({ ...state, error: "Mật khẩu không đúng!" });
              } else {
                dp(unlockWallet());
              }
            }}
          >
            Mở khóa
          </Button>
        </Box>
      </Container>
    </div>
  );
}
