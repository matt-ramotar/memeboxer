import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import fetchMemes from "../../lib/fetchMemes";
import { FakeMeme, User } from "../../types";

interface Props {
  user: User;
}

export default function Home(props: Props): JSX.Element | null {
  const theme = useTheme();
  const [memes, setMemes] = useState<FakeMeme[] | null>(null);

  useEffect(() => {
    async function fetchMemesAsync(number: number) {
      const response = await fetchMemes(number);
      setMemes(response.memes);
    }

    fetchMemesAsync(10);
  }, []);

  if (memes == null) return null;

  return (
    <Grid style={{ minHeight: "100vh", flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      {memes.map((meme) => (
        <Box key={meme.title} style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20, paddingBottom: 20 }}>
          <Box style={{ border: `1px solid ${theme.palette.divider}`, paddingTop: 10, paddingBottom: 10 }}>
            <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <img src={props.user.picture} alt="avatar" style={{ height: 40, width: 40, borderRadius: 50 }} />

              <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: 10 }}>
                mramotar
              </Typography>
            </Box>
            <img src={meme.url} alt={meme.title} style={{ width: 600 }} />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
