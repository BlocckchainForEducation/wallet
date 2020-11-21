import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemAvatar,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, SettingsVoice } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createAccount, lockWallet, importAccount } from "../redux";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import Fade from "@material-ui/core/Fade";
import { Redirect } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f6",
    position: "relative",
    textAlign: "center",
  },
  leftBtn: {
    position: "absolute",
    left: "0.25rem",
    top: "50%",
    transform: "translateY(-50%)",
  },
  rightBtn: {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
  },
  overideMinWidth: {
    minWidth: "40px",
  },
}));

function AskPrivateKeyDialog(props) {
  const [privateKey, setPrivateKey] = useState("");
  return (
    <Dialog open={props.openDialog} onClose={props.hdCloseDialog}>
      <DialogTitle>Import tài khoản bằng Private Key</DialogTitle>
      <DialogContent>
        <TextField label="Nhập private key" fullWidth InputLabelProps={{ shrink: true }} value={privateKey} onChange={(e) => setPrivateKey(e.target.value)}></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.hdCancel}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            props.hdOk(privateKey);
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CustomHeader() {
  const cls = useStyles();
  const dp = useDispatch();
  const [state, setState] = useState({
    anchorEl: null,
    redirect: null,
    openDialog: false,
  });

  function hdLockWallet(e) {
    dp(lockWallet());
    window.close();
  }

  function hdShowMenu(e) {
    setState({ anchorEl: e.currentTarget });
  }

  function hdAddAccount(e) {
    dp(createAccount());
    setState({});
  }

  function hdCloseMenu(e) {
    setState({ ...state, anchorEl: null });
  }

  function hdShowMnemonic(e) {
    setState({ redirect: <Redirect to="/mnemonic"></Redirect> });
  }

  function hdImportAccount(e) {
    setState({ openDialog: true });
  }

  function hdCloseDialog(e) {
    e.stopPropagation();
    setState({});
  }

  function hdOk(privateKey) {
    // TODO: validate private key
    dp(importAccount(privateKey));
    setState({});
  }

  return (
    <div className={cls.root}>
      {state.redirect}
      <IconButton onClick={hdLockWallet} className={cls.leftBtn}>
        <LockOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography className={cls.title} variant="h5">
        B4E Wallet
      </Typography>
      <IconButton onClick={hdShowMenu} className={cls.rightBtn}>
        <MoreVertIcon fontSize="large"></MoreVertIcon>
      </IconButton>
      <Paper>
        <Menu
          open={Boolean(state.anchorEl)}
          anchorEl={state.anchorEl}
          keepMounted
          onClose={hdCloseMenu}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          // getContentAnchorEl={null}
        >
          <MenuItem onClick={hdAddAccount}>
            <ListItemIcon classes={{ root: cls.overideMinWidth }}>
              <Add />
            </ListItemIcon>
            <Typography variant="inherit">Tạo thêm tài khoản</Typography>
          </MenuItem>
          <MenuItem onClick={hdImportAccount}>
            <ListItemIcon classes={{ root: cls.overideMinWidth }}>
              <VerticalAlignBottomIcon></VerticalAlignBottomIcon>
            </ListItemIcon>
            <Typography variant="inherit">Import tài khoản</Typography>
            <AskPrivateKeyDialog openDialog={state.openDialog} hdCloseDialog={hdCloseDialog} hdCancel={hdCloseDialog} hdOk={hdOk}></AskPrivateKeyDialog>
          </MenuItem>
          <MenuItem onClick={hdShowMnemonic}>
            <ListItemIcon classes={{ root: cls.overideMinWidth }}>
              <VisibilityIcon />
            </ListItemIcon>
            <Typography variant="inherit">Xem mã Mnemonic</Typography>
          </MenuItem>
        </Menu>
      </Paper>
    </div>
  );
}
