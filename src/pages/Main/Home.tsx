import { Grid, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MemeFeedItem from "../../components/MemeFeedItem/MemeFeedItem";
import fetchMemes from "../../lib/fetchMemes";
import { Page, setActivePage } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { GodMeme, User } from "../../types";

interface Props {
  user: User;
}

export default function Home(props: Props): JSX.Element | null {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [memes, setMemes] = useState<GodMeme[] | null>(null);

  useEffect(() => {
    async function fetchMemesAsync() {
      const response = await fetchMemes();

      setMemes(response);
    }

    fetchMemesAsync();
  }, []);

  useEffect(() => {
    dispatch(setActivePage(Page.Home));
  });

  if (memes == null) return null;

  return (
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      {memes.map((meme) => (
        <MemeFeedItem key={meme.id} meme={meme} />
      ))}
    </Grid>
  );
}
