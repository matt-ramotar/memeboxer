import { Grid, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import MemeFeedItem from "../../components/MemeFeedItem/MemeFeedItem";
import fetchMemes from "../../lib/fetchMemes";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { GodMeme } from "../../types";

export default function Explore(): JSX.Element | null {
  const theme = useTheme();
  const [memes, setMemes] = useState<GodMeme[] | null>(null);

  useEffect(() => {
    async function fetchMemesAsync() {
      const response = await fetchMemes();

      setMemes(response);
    }

    fetchMemesAsync();
  }, []);

  if (memes == null) return null;

  return (
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      {memes.map((meme) => (
        <MemeFeedItem key={meme.id} meme={meme} />
      ))}
    </Grid>
  );
}
