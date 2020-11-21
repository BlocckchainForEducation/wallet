import React, { useState } from "react";
import { Avatar, IconButton, ListItemAvatar, ListItemIcon, makeStyles, Menu, MenuItem, MenuList, Paper, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createAccount, lockWallet } from "../redux";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f6",
    position: "relative",
    textAlign: "center",
    "& MuiListItemIcon": {
      minWidth: "40px",
    },
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
}));

export default function CustomHeader() {
  const cls = useStyles();
  const dp = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  function hdLockWallet(e) {
    dp(lockWallet());
    window.close();
  }

  function hdAddAccount(e) {
    dp(createAccount());
    setAnchorEl(null);
  }

  function hdClickMore(e) {
    setAnchorEl(e.currentTarget);
  }

  function hdClose(e) {
    setAnchorEl(null);
  }

  return (
    <div className={cls.root}>
      <IconButton onClick={hdLockWallet} className={cls.leftBtn}>
        <LockOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography className={cls.title} variant="h5">
        B4E Wallet
      </Typography>
      <IconButton onClick={hdClickMore} className={cls.rightBtn}>
        <MoreVertIcon fontSize="large"></MoreVertIcon>
      </IconButton>
      <Paper>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          keepMounted
          onClose={hdClose}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={hdAddAccount}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <Typography variant="inherit">Tạo thêm tài khoản</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <VerticalAlignBottomIcon></VerticalAlignBottomIcon>
            </ListItemIcon>
            <Typography variant="inherit">Import tài khoản</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <Typography variant="inherit">Xem mã Mnemonic</Typography>
          </MenuItem>
        </Menu>
      </Paper>
    </div>
  );
}
