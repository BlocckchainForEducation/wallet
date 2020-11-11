import React from "react";
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Container from "../shared/Container";
import Header from "../shared/Header";
import { Add } from "@material-ui/icons";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function Accounts() {
  const AddAccountBtn = (
    <IconButton>
      <Add fontSize="large"></Add>
    </IconButton>
  );
  return (
    <div>
      <Container>
        <Header icon={AddAccountBtn}></Header>
        <Box>
          <List>
            {generate(
              <>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText>Lorem ipsum dolor sit amet.</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <SettingsIcon></SettingsIcon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider></Divider>
              </>
            )}
          </List>
        </Box>
      </Container>
    </div>
  );
}
