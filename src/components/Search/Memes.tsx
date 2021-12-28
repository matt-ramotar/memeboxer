import { Grid } from "@material-ui/core";
import { Meme } from "../../types";
import MemeSearchResult from "./MemeSearchResult";

interface Props {
  memes: Meme[];
}

export default function Memes(props: Props): JSX.Element {
  return (
    <Grid container style={{ width: "100%", height: "100%" }}>
      {props.memes.map((meme) => (
        <MemeSearchResult key={meme.id} meme={meme} />
      ))}
    </Grid>
  );
}
