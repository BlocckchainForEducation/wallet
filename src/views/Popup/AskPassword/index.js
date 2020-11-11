import { Avatar, Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import Container from "../shared/Container";
import Header from "../shared/Header";

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
  return (
    <div>
      <Container>
        <Header></Header>
        <Box className={cls.root} px={3}>
          <Avatar className={cls.avatar}></Avatar>
          <Typography className={cls.welcome} variant="h4" align="center">
            Chào mừng bạn trở lại!
          </Typography>
          <Typography></Typography>
          <TextField fullWidth variant="filled" label="Nhập mật khẩu để mở ví" InputLabelProps={{ shrink: true }}></TextField>
          <Button fullWidth variant="contained" color="primary" size="large">
            Mở khóa
          </Button>
        </Box>
      </Container>
    </div>
  );
}
