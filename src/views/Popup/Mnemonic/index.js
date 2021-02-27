import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "../shared/Container";
import Header from "../shared/Header";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2.5),
    },
  },
  mnemonic: {
    marginTop: theme.spacing(2),
    filter: (props) => (props.blur ? "blur(5px)" : "blur(0)"),
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "black",
    },
  },
  button: {
    marginBottom: "0",
  },
  bounder: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    zIndex: "1",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(102, 102, 102, 0.7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "1.2rem",
  },
  overideDisable: {
    color: "black ",
  },
}));

export default function Mnemonic() {
  const [redirect, setRedirect] = useState(null);
  const [overlay, setOverlay] = useState(true);
  const cls = useStyles({ blur: overlay });
  const mnemonic = useSelector((state) => state.mnemonic);
  return (
    <div>
      <Container>
        {redirect}
        <Header></Header>
        <Box p={2} className={cls.root}>
          <Typography variant="h4">Mã mnemonic bí mật</Typography>
          <Typography>
            Mã mnemonic giúp bạn dễ dàng <b> sao lưu và khôi phục </b>lại các tài khoản trong ví. Hãy lưu trữ mã này một cách an toàn và bảo mật.
          </Typography>
          <Typography>
            <b>CẢNH BÁO:</b> Không bao giờ tiết lộ mã này. Bất kì ai có mã này sẽ có quyền sử dụng các tài khoản của bạn.
          </Typography>
          <Box className={cls.bounder}>
            {overlay ? (
              <div
                className={cls.overlay}
                onClick={(e) => {
                  setOverlay(false);
                }}
              >
                <LockOpenIcon fontSize="large"></LockOpenIcon>
                Click để xem mã Mnemonic
              </div>
            ) : null}
            <TextField
              className={cls.mnemonic}
              InputProps={{ classes: { disabled: cls.overideDisable } }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              label="Mã mnemonic"
              defaultValue={mnemonic}
              disabled
            ></TextField>
          </Box>

          <Button
            className={cls.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={(e) => {
              setRedirect(<Redirect to="/accounts"></Redirect>);
            }}
          >
            ok
          </Button>
        </Box>
      </Container>
    </div>
  );
}
