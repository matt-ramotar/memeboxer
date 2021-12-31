import { Grid } from "@material-ui/core";
import { GodMeme } from "../../types";
import AddReaction from "./actions/meme/AddReaction";
import Comment from "./actions/meme/Comment";
import Share from "./actions/meme/Share";
import Upvote from "./actions/meme/Upvote";

interface Props {
  meme: GodMeme;
}

export default function MemeUserActions(props: Props): JSX.Element {
  return (
    <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
      <AddReaction meme={props.meme} />
      <Comment meme={props.meme} />
      <Upvote meme={props.meme} />
      <Share meme={props.meme} />
    </Grid>
  );
}
