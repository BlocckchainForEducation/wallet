import { Avatar, Box, Dialog, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { useState } from "react";
import Jazzicon from "react-jazzicon/lib/Jazzicon";
import { useDispatch, useSelector } from "react-redux";
import AccountDetail from "../AccountDetail";
import { createAccount } from "../redux";
import Container from "../shared/Container";
import Header from "../shared/Header";

const useStyles = makeStyles({
  paper: {
    margin: "0",
  },
});
export default function Accounts() {
  const cls = useStyles();
  const accounts = useSelector((state) => state.accounts);
  const [dialog, setDialog] = useState(null);

  const dp = useDispatch();

  function hdAddAccount(e) {
    dp(createAccount());
  }

  function hdSettingClick(e, id) {
    const acc = accounts.find((acc) => acc.id === id);
    function closeDiaglog() {
      setDialog(null);
    }
    const content = <AccountDetail {...acc} cb={closeDiaglog}></AccountDetail>;
    const dialog = (
      <Dialog classes={{ paper: cls.paper }} open={true}>
        {content}
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
                    <Avatar>
                      <Jazzicon diameter={50} seed={acc.avatarSeed}></Jazzicon>
                    </Avatar>
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
