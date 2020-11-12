import React from "react";
import { Route, Switch } from "react-router-dom";
import SetupPassword from "./SetupPassword";
import CreateWallet from "./CreateWallet";
import Mnemonic from "./Mnemonic";
import Accounts from "./Accounts";
import AccountDetail from "./AccountDetail";
import AskPassword from "./AskPassword";
import PromptRequest from "./PromptRequest";
import { GetRedirect } from "../../utils/redirect-utils";
import "fontsource-roboto";
import { Box, CssBaseline } from "@material-ui/core";

function App() {
  return (
    // box mt-5 just for dev env
    <Box bgcolor="white">
      <CssBaseline></CssBaseline>
      <Switch>
        <Route path="/setup-password" component={SetupPassword}></Route>
        <Route path="/create-wallet" component={CreateWallet}></Route>
        <Route path="/mnemonic" component={Mnemonic}></Route>
        <Route path="/accounts" component={Accounts}></Route>
        <Route path="/account-detail" component={AccountDetail}></Route>
        <Route path="/ask-password" component={AskPassword}></Route>
        <Route path="/prompt-request" component={PromptRequest}></Route>
        {GetRedirect()}
      </Switch>
    </Box>
  );
}

export default App;
