import { Avatar, Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Container from "../shared/Container";
import Header from "../shared/Header";

import logo from "assets/imgs/logo.png";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },

  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: theme.spacing(4, "auto"),
  },
  welcome: {
    fontWeight: "bold",
    marginBottom: theme.spacing(8),
  },
}));

export default function AskPassword() {
  const cls = useStyles();
  const walletPassword = useSelector((state) => state.walletPassword);
  const [state, setState] = useState({
    password: "",
    error: null,
  });
  const [redirect, setRedirect] = useState(null);
  return (
    <div>
      <Container>
        {redirect}
        <Header></Header>
        <Box className={cls.root} px={3}>
          <Avatar className={cls.avatar} src={logo}></Avatar>
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
                setRedirect(<Redirect to="/accounts"></Redirect>);
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
