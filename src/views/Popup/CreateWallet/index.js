import React from "react";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import Container from "../shared/Container";
import Header from "../shared/Header";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: { paddingLeft: theme.spacing(6), paddingRight: theme.spacing(6), marginTop: theme.spacing(2) },
}));

function OptionBox({ icon, title, subtitle, buttonContent }) {
  const cls = useStyles();
  return (
    <Box border="1px solid grey" borderRadius="8px" p={2} textAlign="center">
      {icon}
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
      <Button variant="contained" color="primary" className={cls.button}>
        {buttonContent}
      </Button>
    </Box>
  );
}

const useMainStyles = makeStyles((theme) => ({
  flexbox: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",

    "& > *": {
      width: "75%",
    },
  },
}));

export default function CreateWallet() {
  const cls = useMainStyles();
  return (
    <Container>
      <Header></Header>
      <div className={cls.flexbox}>
        <OptionBox icon={<AddIcon color="action" style={{ fontSize: "4rem" }} />} title="Tạo mới ví" subtitle="Tạo ví bằng mã mnemonic mới" buttonContent="Tạo mới" />
        <OptionBox icon={<VerticalAlignBottomIcon color="action" style={{ fontSize: "4rem" }} />} title="Khôi phục ví" subtitle="Khôi phục lại ví bằng mã mnemonic" buttonContent="Khôi phục" />
      </div>
    </Container>
  );
}
