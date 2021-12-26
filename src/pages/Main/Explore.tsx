import { Grid, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MemeExploreItem from "../../components/MemeFeedItem/MemeExploreItem";
import fetchMemes from "../../lib/fetchMemes";
import { Page, setActivePage } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { GodMeme } from "../../types";

export default function Explore(): JSX.Element | null {
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
    dispatch(setActivePage(Page.Explore));
  });

  if (memes == null) return null;

  return (
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          maxWidth: "90%",
          minWidth: 600,
          minHeight: `calc(100vh - 32px - ${MAIN_NAV_HEIGHT}px)`,
          marginTop: 16,
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
        }}
      >
        <Grid container xs={12} style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
          {/* <Grid container style={{ display: "flex", flexDirection: "row", marginTop: 16 }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: theme.palette.grey.A200,
                padding: "4px 8px",
                borderRadius: 24,
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography style={{ fontFamily: "Space Grotesk" }}>Top</Typography>

              <ChevronDownIcon fill={theme.palette.text.primary} height={16} width={16} />
            </Box>
          </Grid> */}

          <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap" }} xs={12} spacing={2}>
            {memes.map((meme) => (
              <Grid item key={meme.id} xs={4}>
                <MemeExploreItem meme={meme} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
