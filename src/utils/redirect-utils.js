import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function GetRedirect() {
  const state = useSelector((state) => state);
  if (state.walletPassword === "") {
    return <Redirect from="/" to="/setup-password"></Redirect>;
  } else if (state.mnemonic === "") {
    return <Redirect from="/" to="/create-wallet"></Redirect>;
  } else {
    return <Redirect from="/" to="/accounts"></Redirect>;
  }
}

export { GetRedirect };
