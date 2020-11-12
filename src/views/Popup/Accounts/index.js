import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Container from "../shared/Container";
import Header from "../shared/Header";
import { Add } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../redux";
import AccountDetail from "../AccountDetail";

export default function Accounts() {
  const accounts = useSelector((state) => state.accounts);
  const [dialog, setDialog] = useState(null);

  const dp = useDispatch();

  function hdAddAccount(e) {
    dp(createAccount());
  }

  function hdSettingClick(e, id) {
    console.log(id);
    const acc = accounts.find((acc) => acc.id == id);

    function closeDiaglog() {
      setDialog(null);
    }

    const content = <AccountDetail {...acc} cb={closeDiaglog}></AccountDetail>;
    const dialog = (
      <Dialog open={true}>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    );
    setDialog(dialog);
  }

  return (
    <div>
      <Container>
        <Header icon={<Add fontSize="large" />} hdClick={hdAddAccount}></Header>
        <Box>
          <List>
            {accounts.map((acc, index) => (
              <React.Fragment key={acc.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{acc.avatar}</Avatar>
                  </ListItemAvatar>
                  <ListItemText>{acc.name}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={(e) => hdSettingClick(e, acc.id)}>
                      <SettingsIcon></SettingsIcon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider></Divider>
              </React.Fragment>
            ))}
          </List>
          {dialog}
        </Box>
      </Container>
    </div>
  );
}
