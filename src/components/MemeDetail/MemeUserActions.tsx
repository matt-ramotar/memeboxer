import { Grid } from "@material-ui/core";
import { GodMeme } from "../../types";
import Comment from "./actions/meme/Comment";

interface Props {
  meme: GodMeme;
}

export default function MemeUserActions(props: Props): JSX.Element {
  return (
    <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
      <Comment meme={props.meme} />
    </Grid>
  );
}
