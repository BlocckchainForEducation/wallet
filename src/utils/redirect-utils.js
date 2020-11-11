import React from "react";
import { Redirect } from "react-router-dom";

function getRedirect() {
  return <Redirect from="/" to="setup-password"></Redirect>;
}

export { getRedirect };
