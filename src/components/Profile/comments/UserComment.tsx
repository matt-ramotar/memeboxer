import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchGodMeme } from "../../../lib/meme";
import { GodAction, GodMeme } from "../../../types";
import { STORAGE_URL } from "../../../util/secrets";

interface Props {
  action: GodAction;
}

export default function UserComment(props: Props): JSX.Element {
  const [parentMeme, setParentMeme] = useState<GodMeme | null>(null);

  useEffect(() => {
    async function getGodMemeAsync(memeId: string) {
      const godMeme = await fetchGodMeme(memeId);
      setParentMeme(godMeme);
    }

    if (props.action.comment?.memeId) {
      getGodMemeAsync(props.action.comment.memeId);
    }
  }, [props.action]);

  return (
    <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "nowrap", width: 300 }}>
      <Grid style={{ display: parentMeme ? "flex" : "none" }}>
        <img src={`${STORAGE_URL}/${parentMeme?.template.id}_${parentMeme?.id}`} alt="meme" style={{ objectFit: "cover", width: 100 }} />
      </Grid>

      <Grid>
        <Typography>{props.action.comment?.body}</Typography>
      </Grid>
    </Grid>
  );
}
