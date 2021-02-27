import { Avatar, Badge, Box, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Jazzicon from "react-jazzicon/lib/Jazzicon";
import { useDispatch, useSelector } from "react-redux";
import AccountDetail from "../AccountDetail";
import { setAccounts } from "../redux";
import Container from "../shared/Container";
import CustomHeader from "./AccountsHeader";

import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";

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

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(accounts);
    console.log(items);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    dp(setAccounts(items));
  }

  return (
    <div>
      <Container>
        {/* <Header icon={<Add fontSize="large" />} hdClick={hdAddAccount}></Header> */}
        <CustomHeader></CustomHeader>
        <Box>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="Accounts">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {accounts.map((acc, index) => (
                    <Draggable key={acc.id} draggableId={acc.id} index={index}>
                      {(provided) => (
                        <ListItem divider ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <ListItemAvatar>
                            <Badge
                              invisible={!acc.isImported}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              // overlap="circle"
                              badgeContent={<VerticalAlignBottomIcon color="primary" />}
                            >
                              <Avatar>
                                <Jazzicon diameter={50} seed={acc.avatarSeed}></Jazzicon>
                              </Avatar>
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText>{acc.name}</ListItemText>
                          {/* <ListItemSecondaryAction> */}
                          <IconButton edge="end" onClick={(e) => hdSettingClick(e, acc.id)}>
                            <SettingsIcon></SettingsIcon>
                          </IconButton>
                          {/* </ListItemSecondaryAction> */}
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
          {dialog}
        </Box>
      </Container>
    </div>
  );
}
