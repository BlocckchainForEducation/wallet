import React, { useState } from "react";
import { Avatar, Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";

import Container from "../shared/Container";
import { VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(4),
    },
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(4, "auto"),
  },
}));

export default function AccountDetail() {
  const cls = useStyles();
  const [state, setState] = useState({ accountName: "acc1", pubkey: "asdfasdfasdfaf", prikey: "asdfasdfad", showPassword: false });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Container>
        <Box className={cls.root} px={3}>
          <Avatar className={cls.avatar}></Avatar>
          <TextField variant="outlined" label="Tên tài khoản" fullWidth InputLabelProps={{ shrink: true }} value={state.accountName}></TextField>
          <TextField variant="outlined" label="Khóa công khai" multiline rows={4} fullWidth InputLabelProps={{ shrink: true }} value={state.pubkey}></TextField>
          <TextField
            variant="outlined"
            label="Khóa bí mật"
            // multiline
            // rows={4}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              type: state.showPassword ? "text" : "password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={state.prikey}
          ></TextField>

          <Box textAlign="right">
            <Button variant="contained" color="primary" fullWidth>
              Ok
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
