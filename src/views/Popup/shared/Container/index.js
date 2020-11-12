import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    width: "400px",
    height: "548px",
    // height: "600px",
    overflow: "auto",
    // border: "1px solid red",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "min-content auto",
  },
});

export default function Container({ children }) {
  const cls = useStyles();
  return <div className={cls.root}>{children}</div>;
}
