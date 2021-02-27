import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React, { useState } from "react";
import Jazzicon from "react-jazzicon/lib/Jazzicon";
import { useDispatch, useSelector } from "react-redux";
import { refuseSign, setAccountToSign } from "../redux";
import Container from "../shared/Container";
import Header from "../shared/Header";

const useStyles = makeStyles((theme) => ({
  title: { marginTop: theme.spacing(2), marginBottom: theme.spacing(1) },
  paper: {
    margin: "0",
  },
}));

export default function RequestSign() {
  const cls = useStyles();
  const accounts = useSelector((state) => state.accounts);
  const isTurnOnHidingAccounts = useSelector((state) => state.showHidingAccount);
  const listAccountToShow = isTurnOnHidingAccounts ? accounts : accounts.filter((acc) => !acc.isHide);

  const [selectedAccId, setSelectedAccId] = useState(listAccountToShow[0]?.id);
  const dp = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  const [dialog, setDialog] = useState(null);

  function FeedbackDialog({ isAccept }) {
    return (
      <Dialog open={true} classes={{ paper: cls.paper }}>
        <Box width={"300px"} px={2} pt={2} pb={1} display="flex" flexDirection="column" alignItems="center">
          {isAccept ? (
            <>
              <CheckCircleOutlineIcon style={{ fontSize: "150px", color: "#28a745" }}></CheckCircleOutlineIcon>
              <Typography variant="h4">OK!</Typography>
            </>
          ) : (
            <>
              <BlockIcon color="secondary" style={{ fontSize: "150px" }}></BlockIcon>
              <Typography variant="h4">Đã từ chối!</Typography>
            </>
          )}
        </Box>
        <DialogActions>
          <Button
            onClick={(e) => {
              setDialog(null);
              window.close();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function hdSignClick(e, id) {
    dp(setAccountToSign({ id: id }));

    setDialog(<FeedbackDialog isAccept={true}></FeedbackDialog>);
    // enqueueSnackbar("Đã kí giao dịch thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    // setTimeout(() => window.close(), 2000);
  }
  function hdRefuseSign(e) {
    dp(refuseSign());
    setDialog(<FeedbackDialog isAccept={false}></FeedbackDialog>);

    // enqueueSnackbar("Đã từ chối kí giao dịch!", { variant: "default", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    // setTimeout(() => window.close(), 2000);
  }

  return (
    <div>
      <Container>
        <Header></Header>
        <Box>
          <Typography className={cls.title} variant="h5" align="center">
            Chọn tài khoản:
          </Typography>
          <List>
            {listAccountToShow.map((acc, index) => (
              <React.Fragment key={acc.id}>
                <ListItem button selected={acc.id === selectedAccId} onClick={(e) => setSelectedAccId(acc.id)}>
                  <ListItemAvatar>
                    <Badge
                      invisible={!acc.isImported}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={<VerticalAlignBottomIcon color="primary" />}
                    >
                      <Avatar>
                        <Jazzicon diameter={50} seed={acc.avatarSeed}></Jazzicon>
                      </Avatar>
                    </Badge>
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
          <Box my={2} px={2}>
            <Button variant="contained" fullWidth color="primary" onClick={hdRefuseSign}>
              Cancel
            </Button>
          </Box>
        </Box>
        {dialog}
      </Container>
    </div>
  );
}
