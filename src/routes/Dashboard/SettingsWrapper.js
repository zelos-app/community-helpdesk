import React from "react";
import { Grid } from "@material-ui/core";

import SettingsNavigation from "../../components/SettingsPage/SettingsNavigation";

export default function Settings(props) {
  return (
    <div className="dashboard-children settings">
      <SettingsNavigation />
      <Grid container direction="row" spacing={0} justify="space-between">
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
}
