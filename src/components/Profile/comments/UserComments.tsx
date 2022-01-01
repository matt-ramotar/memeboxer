import { Box, Grid } from "@material-ui/core";
import { ActionType, GodAction } from "../../../types";
import UserCommentComment from "./UserCommentComment";
import UserMemeComment from "./UserMemeComment";

interface Props {
  comments: GodAction[];
}

export default function UserComments(props: Props): JSX.Element | null {
  return (
    <Grid style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {props.comments.map((commentAction) => (
        <Box key={commentAction.id} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {commentAction.type == ActionType.AddCommentToComment ? <UserCommentComment action={commentAction} /> : <UserMemeComment action={commentAction} />}
        </Box>
      ))}
    </Grid>
  );
}
