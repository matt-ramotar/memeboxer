import { Grid, Typography } from "@material-ui/core";
import { GodAction } from "../../types";

interface Props {
  action: GodAction;
}

export default function MemeCommentNotificationCard(props: Props): JSX.Element | null {
  return (
    <Grid>
      <Typography>{props.action.type}</Typography>
    </Grid>
  );
}
