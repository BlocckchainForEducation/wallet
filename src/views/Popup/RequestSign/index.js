import { Avatar, Box, Button, Dialog, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Jazzicon from "react-jazzicon/lib/Jazzicon";
import { useDispatch, useSelector } from "react-redux";
import { setAccountToSign, refuseSign } from "../redux";
import Container from "../shared/Container";
import Header from "../shared/Header";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({ title: { margin: theme.spacing(2, 0) } }));

export default function RequestSign() {
  const cls = useStyles();
  const accounts = useSelector((state) => state.accounts);
  const [selectedAccId, setSelectedAccId] = useState(accounts[0]?.id);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function hdSignClick(e, id) {
    dp(setAccountToSign({ id: id }));
    enqueueSnackbar("Đã kí giao dịch thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    setTimeout(() => window.close(), 2000);
  }
  function hdRefuseSign(e) {
    dp(refuseSign());
    enqueueSnackbar("Đã từ chối kí giao dịch!", { variant: "default", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    setTimeout(() => window.close(), 2000);
  }

  return (
    <div>
      <Container>
        <Header></Header>
        <Box>
          <Typography className={cls.title} variant="h5" align="center">
            Chọn tài khoản đế kí:
          </Typography>
          <List>
            {accounts.map((acc, index) => (
              <React.Fragment key={acc.id}>
                <ListItem button selected={acc.id === selectedAccId} onClick={(e) => setSelectedAccId(acc.id)}>
                  <ListItemAvatar>
                    <Avatar>
                      <Jazzicon diameter={50} seed={acc.avatarSeed}></Jazzicon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{acc.name}</ListItemText>
                  {acc.id === selectedAccId ? (
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={(e) => hdSignClick(e, acc.id)}>
                        <VpnKeyIcon></VpnKeyIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  ) : null}
                </ListItem>
                <Divider></Divider>
              </React.Fragment>
            ))}
          </List>
          <Box my={2}>
            <Button variant="contained" fullWidth color="primary" onClick={hdRefuseSign}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
