import { Grid, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import MemeFeedItem from "../../components/MemeFeedItem/MemeFeedItem";
import fetchMemes from "../../lib/fetchMemes";
import { GodMeme, User } from "../../types";

interface Props {
  user: User;
}

export default function Home(props: Props): JSX.Element | null {
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
    <Grid style={{ minHeight: "100vh", flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      {memes.map((meme) => (
        <MemeFeedItem key={meme.id} meme={meme} />
      ))}
    </Grid>
  );
}
