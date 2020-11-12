import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "../shared/Container";
import Header from "../shared/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2.5),
    },
  },
  mnemonic: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: "0",
  },
}));

export default function Mnemonic() {
  const cls = useStyles();
  const [redirect, setRedirect] = useState(null);
  const mnemonic = useSelector((state) => state.mnemonic);
  return (
    <div>
      <Container>
        {redirect}
        <Header></Header>
        <Box p={2} className={cls.root}>
          <Typography variant="h4">Mã mnemonic bí mật</Typography>
          <Typography>Mã mnemonic giúp bạn dễ dàng sao lưu vào khôi phục lại các tài khoản trong ví. Hãy lưu trữ mã này một cách an toàn và bảo mật.</Typography>
          <Typography>
            <b>CẢNH BÁO:</b> Không bao giờ tiết lộ mã này. Bất kì ai có mã này sẽ có quyền sử dụng các tài khoản của bạn.
          </Typography>
          <TextField
            className={cls.mnemonic}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            label="Mã mnemonic"
            defaultValue={mnemonic}
            InputLabelProps={{ shrink: true }}
          ></TextField>
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
