import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import Container from "../shared/Container";
import Header from "../shared/Header";
import history from "../../../utils/router-history";
import { setMnemonic } from "../redux";
import { useDispatch } from "react-redux";

const bip39 = require("bip39");

const useStyles = makeStyles((theme) => ({
  root: {},
  button: { paddingLeft: theme.spacing(6), paddingRight: theme.spacing(6), marginTop: theme.spacing(2) },
}));

function OptionBox({ icon, title, subtitle, buttonContent, hdClick }) {
  const cls = useStyles();
  return (
    <Box border="1px solid grey" borderRadius="8px" p={2} textAlign="center">
      {icon}
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
      <Button variant="contained" color="primary" className={cls.button} onClick={hdClick}>
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
  const dp = useDispatch();

  function hdCreatWalletClick(e) {
    const mnemonic = bip39.generateMnemonic();
    dp(setMnemonic(mnemonic));
    history.push("/mnemonic");
  }
  function hdRestoreWalletClick(e) {
    history.push("/restore-wallet");
  }
  return (
    <Container>
      <Header></Header>
      <div className={cls.flexbox}>
        <OptionBox icon={<AddIcon color="action" style={{ fontSize: "4rem" }} />} title="Tạo mới ví" subtitle="Tạo ví bằng mã mnemonic mới" buttonContent="Tạo mới" hdClick={hdCreatWalletClick} />
        <OptionBox
          icon={<VerticalAlignBottomIcon color="action" style={{ fontSize: "4rem" }} />}
          title="Khôi phục ví"
          subtitle="Khôi phục lại ví bằng mã mnemonic"
          buttonContent="Khôi phục"
          hdClick={hdRestoreWalletClick}
        />
      </div>
    </Container>
  );
}
