import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    position: "fixed",
    width: "100%",
  },
  title: {
    flexGrow: 1,
    minHeight: "2.2rem",
  },
  divider: {
    background: theme.palette.primary.main,
  },
}));

export default function ToolBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="primary" className={classes.title}></Typography>
        </Toolbar>
        <Divider className={classes.divider} hr={70} />
      </AppBar>
    </div>
  );
}
