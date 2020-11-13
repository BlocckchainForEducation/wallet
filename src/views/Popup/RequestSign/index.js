import { Avatar, Box, Dialog, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Jazzicon from "react-jazzicon/lib/Jazzicon";
import { useDispatch, useSelector } from "react-redux";
import { setAccountToSign } from "../redux";
import Container from "../shared/Container";
import Header from "../shared/Header";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({ title: { margin: theme.spacing(2, 0) } }));

export default function RequestSign() {
  const cls = useStyles();
  const accounts = useSelector((state) => state.accounts);
  const dp = useDispatch();

  function hdSettingClick(e, id) {
    dp(setAccountToSign({ id: id }));
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
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Jazzicon diameter={50} seed={acc.avatarSeed}></Jazzicon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{acc.name}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={(e) => hdSettingClick(e, acc.id)}>
                      <VpnKeyIcon></VpnKeyIcon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider></Divider>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
}
