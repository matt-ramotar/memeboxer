import { Grid } from "@material-ui/core";
import { GodComment } from "../../types";
import AddComment from "./AddComment";
import AddReaction from "./AddReaction";
import Share from "./Share";
import Upvote from "./Upvote";

interface Props {
  comment: GodComment;
}

export default function MainCommentUserActions(props: Props): JSX.Element {
  return (
    <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
      <AddReaction comment={props.comment} />
      <AddComment comment={props.comment} />
      <Upvote comment={props.comment} />
      <Share comment={props.comment} />
    </Grid>
  );
}
