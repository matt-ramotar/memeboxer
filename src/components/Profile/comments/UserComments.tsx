import { Box, Grid } from "@material-ui/core";
import { GodAction } from "../../../types";
import UserComment from "./UserComment";

interface Props {
  comments: GodAction[];
}

export default function UserComments(props: Props): JSX.Element | null {
  return (
    <Grid style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {props.comments.map((commentAction) => (
        <Box key={commentAction.id} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <UserComment action={commentAction} />
        </Box>
      ))}
    </Grid>
  );
}
