import React, { useState } from "react";
import { Avatar, Box, Button, IconButton, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import Container from "../shared/Container";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { renameAccount } from "../redux";
import { useDispatch } from "react-redux";
import Jazzicon from "react-jazzicon/lib/Jazzicon";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(4),
      "&:last-child": {
        marginBottom: "0",
      },
    },
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(4, "auto"),
  },
}));

export default function AccountDetail(props) {
  const cls = useStyles();
  const { id, avatarSeed, name, publicKey, privateKey, cb } = props;
  const [state, setState] = useState({ accountName: name, showPassword: false });

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dp = useDispatch();
  return (
    <div>
      <Container>
        <Box className={cls.root} px={3}>
          <Avatar className={cls.avatar}>
            <Jazzicon diameter={100} seed={avatarSeed}></Jazzicon>
          </Avatar>
          <TextField
            variant="outlined"
            label="Tên tài khoản"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={state.accountName}
            onChange={(e) => setState({ ...state, accountName: e.target.value })}
          ></TextField>
          <TextField variant="outlined" label="Khóa công khai" multiline rows={4} fullWidth InputLabelProps={{ shrink: true }} value={publicKey}></TextField>
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
            value={privateKey}
          ></TextField>

          <Box textAlign="right">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => {
                dp(renameAccount({ id: id, name: state.accountName }));
                cb();
              }}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
