import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Container from "../shared/Container";
import Header from "../shared/Header";

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

  return (
    <div>
      <Container>
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
              <TextField variant="outlined" margin="normal" required fullWidth id="password" name="password" label="Mật khẩu" type="password" autoFocus />
              <TextField variant="outlined" margin="normal" required fullWidth id="repassword" name="repassword" label="Nhập lại mật khẩu" type="password" />
              {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                ok
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    </div>
  );
}
