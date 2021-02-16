import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import Container from "../shared/Container";
import Header from "../shared/Header";
import { createNewWallet, restoreWallet } from "../redux";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const bip39 = require("bip39");

const useStyles = makeStyles((theme) => ({
  root: {},
  button: { paddingLeft: theme.spacing(6), paddingRight: theme.spacing(6), marginTop: theme.spacing(2) },
}));

function OptionBox({ icon, title, subtitle, buttonContent, hdClick }) {
  const cls = useStyles();
  return (
    <Box border="1px solid grey" borderRadius="8px" paddingBottom={2} paddingTop={1} textAlign="center">
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
      width: "80%",
    },
  },
}));

function InputMnemonicDialog({ setDialog, setRedirect }) {
  const [state, setState] = useState({
    mnemonic: "",
    error: null,
  });
  const dp = useDispatch();

  function hdCancel(e) {
    setDialog(null);
  }
  function hdOk(e) {
    if (bip39.validateMnemonic(state.mnemonic)) {
      dp(restoreWallet(state.mnemonic));
      setRedirect(<Redirect to="/accounts"></Redirect>);
    } else {
      setState({ ...state, error: "Mã mnemonic không hợp lệ!" });
    }
  }

  return (
    <Dialog open={true}>
      <DialogTitle>Khôi phục ví</DialogTitle>

      <DialogContent>
        <DialogContentText>Nhập chính xác mã mnemonic để khôi phục lại ví.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="mnemonic"
          label="Mã mnemonic"
          fullWidth
          value={state.mnemonic}
          onChange={(e) => setState({ mnemonic: e.target.value })}
          error={Boolean(state.error)}
          helperText={state.error}
        ></TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={hdCancel}>Cancel</Button>
        <Button onClick={hdOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CreateWallet() {
  const cls = useMainStyles();
  const dp = useDispatch();
  const [redirect, setRedirect] = useState(null);
  const [dialog, setDialog] = useState(null);

  function hdCreatWalletClick(e) {
    dp(createNewWallet());
    setRedirect(<Redirect to="/mnemonic"></Redirect>);
  }

  function hdRestoreWalletClick(e) {
    const dialog = <InputMnemonicDialog setDialog={setDialog} setRedirect={setRedirect}></InputMnemonicDialog>;
    setDialog(dialog);
  }

  return (
    <Container>
      {redirect}
      <Header></Header>
      <div className={cls.flexbox}>
        <OptionBox
          icon={<AddIcon color="action" style={{ fontSize: "4rem" }} />}
          title="Tạo mới ví"
          subtitle="Tạo ví bằng mã mnemonic mới"
          buttonContent="Tạo mới"
          hdClick={hdCreatWalletClick}
        />
        <OptionBox
          icon={<VerticalAlignBottomIcon color="action" style={{ fontSize: "4rem" }} />}
          title="Khôi phục ví"
          subtitle="Khôi phục lại ví bằng mã mnemonic"
          buttonContent="Khôi phục"
          hdClick={hdRestoreWalletClick}
        />
        {dialog}
      </div>
    </Container>
  );
}
