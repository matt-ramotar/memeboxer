import { Box, Typography } from "@material-ui/core";
import { GodComment } from "../../types";

interface Props {
  comment: GodComment;
}

export default function Comment(props: Props): JSX.Element {
  return (
    <Box style={{ display: "flex", flexDirection: "row" }}>
      <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold" }}>{props.comment.user.username}</Typography>
      <Typography style={{ fontFamily: "Space Grotesk" }}>{props.comment.body}</Typography>
    </Box>
  );
}
