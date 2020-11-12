import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    // max-height/max-width allow of popup is: 600x800, if zoom 110% -> height 600/1.1 and 800/1.1
    width: "400px",
    height: "548px",
    // height: "600px",
    overflow: "auto",
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
