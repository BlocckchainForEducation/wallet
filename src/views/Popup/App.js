import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SetupPassword from "./SetupPassword";
import CreateWallet from "./CreateWallet";
import Mnemonic from "./Mnemonic";
import Accounts from "./Accounts";
import AccountDetail from "./AccountDetail";
import AskPassword from "./AskPassword";
import RequestSign from "./RequestSign";
import { Box, CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import "fontsource-roboto";
import { SnackbarProvider } from "notistack";

function Redirector() {
  const state = useSelector((state) => state);
  if (state.walletPassword === "") {
    return <Redirect from="/" to="/setup-password"></Redirect>;
  } else if (state.mnemonic === "") {
    return <Redirect from="/" to="/create-wallet"></Redirect>;
  } else if (state.shouldAskPassword) {
    return <Redirect from="/" to="/ask-password"></Redirect>;
  } else if (state.isSignRequesting) {
    return <Redirect from="/" to="/request-sign"></Redirect>;
  } else {
    return <Redirect from="/" to="/accounts"></Redirect>;
  }
}

function App() {
  return (
    <SnackbarProvider maxSnack={1}>
      <Box bgcolor="white">
        <CssBaseline></CssBaseline>
        <Switch>
          <Route path="/setup-password" component={SetupPassword}></Route>
          <Route path="/create-wallet" component={CreateWallet}></Route>
          <Route path="/mnemonic" component={Mnemonic}></Route>
          <Route path="/accounts" component={Accounts}></Route>
          <Route path="/account-detail" component={AccountDetail}></Route>
          <Route path="/ask-password" component={AskPassword}></Route>
          <Route path="/request-sign" component={RequestSign}></Route>
          <Redirector></Redirector>
        </Switch>
      </Box>
    </SnackbarProvider>
  );
}

export default App;
