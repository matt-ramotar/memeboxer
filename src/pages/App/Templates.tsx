import { Grid, Typography } from "@material-ui/core";
import React from "react";
import CreateTemplate from "./CreateTemplate";

export default function Templates(): JSX.Element {
  return (
    <Grid>
      <Typography>Templates</Typography>

      <CreateTemplate />
    </Grid>
  );
}
