import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

export default function Sidebar() {
  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <Typography variant="h6">teste</Typography>
      </Toolbar>
    </AppBar>
  );
}
