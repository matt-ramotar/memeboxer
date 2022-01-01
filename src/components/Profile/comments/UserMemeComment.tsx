import { Grid, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchGodMeme } from "../../../lib/meme";
import { GodAction, GodMeme } from "../../../types";
import { STORAGE_URL } from "../../../util/secrets";

interface Props {
  action: GodAction;
}

export default function UserMemeComment(props: Props): JSX.Element | null {
  const theme = useTheme();

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

  if (!props.action.comment || !props.action.user) return null;

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",

        flexWrap: "nowrap",
        width: 450,
        marginBottom: 8,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 8,
        border: `1px solid ${theme.palette.grey.A200}`,
      }}
    >
      <Grid style={{ display: "flex", flexDirection: "row", padding: 16 }}>
        <Typography variant="body2">
          <span style={{ fontWeight: "bold", marginRight: 4 }}>{`${props.action.user.name}`}</span>
          commented on
          <span style={{ fontWeight: "bold", marginLeft: 4 }}>{`${parentMeme?.user.name}`}</span>
          {`'s meme`}
        </Typography>
      </Grid>
      <Grid style={{ display: parentMeme ? "flex" : "none", width: "100%" }}>
        <img src={`${STORAGE_URL}/${parentMeme?.template.id}_${parentMeme?.id}`} alt="meme" style={{ objectFit: "cover", width: "100%", maxHeight: 200 }} />
      </Grid>

      <Grid>
        <Typography>{props.action.comment?.body}</Typography>
      </Grid>
    </Grid>
  );
}
