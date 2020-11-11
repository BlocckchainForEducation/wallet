import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    width: "418px",
    height: "548px",
    border: "1px solid red",
    margin: "auto",
  },
});

export default function Container({ children }) {
  const cls = useStyles();
  return <div className={cls.root}>{children}</div>;
}
