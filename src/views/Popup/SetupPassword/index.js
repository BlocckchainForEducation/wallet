import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Container from "../shared/Container";
import Header from "../shared/Header";

import { setWalletPassword } from "../redux";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SetupPassword() {
  const classes = useStyles();
  const [state, setState] = useState({
    password: "",
    repassword: "",
    error: null,
  });
  const [redirect, setRedirect] = useState(null);

  const dp = useDispatch();

  return (
    <div>
      <Container>
        {redirect}
        <Header></Header>
        <Box p={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Chào mừng bạn đến với B4E Wallet!
          </Typography>

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Thiết lập mật khẩu cho ví:
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Mật khẩu"
                type="password"
                autoFocus
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value, error: null })}
                error={state.error}
                helperText={state.error}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="repassword"
                name="repassword"
                label="Nhập lại mật khẩu"
                type="password"
                value={state.repassword}
                onChange={(e) => setState({ ...state, repassword: e.target.value, error: null })}
                error={state.error}
                helperText={state.error}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  e.preventDefault();
                  if (state.password !== state.repassword) {
                    setState({ ...state, error: "Mật khẩu không khớp!" });
                  } else if (state.password.length < 8) {
                    setState({ ...state, error: "Mật khẩu cần có ít nhất 8 ký tự!" });
                  } else {
                    dp(setWalletPassword(state.password));
                    // history.push("/create-wallet");
                    setRedirect(<Redirect to="/create-wallet"></Redirect>);
                  }
                }}
              >
                ok
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    </div>
  );
}
