import { Box, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function PostMeme(): JSX.Element | null {
  const meme = useSelector((state: RootState) => state.createMeme.data);

  if (!meme) return null;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        maxHeight: 900,
        width: "100%",
      }}
    >
      <Grid container style={{ display: "flex", overflowY: "scroll", overscrollBehavior: "scroll" }}>
        <Box style={{ position: "relative" }}>
          <img src={meme} alt="null" style={{ minWidth: 600, maxWidth: 600, maxHeight: "100%", display: "flex", margin: 0, padding: 0 }} />
        </Box>
      </Grid>

      <Grid style={{ display: "flex", backgroundColor: "red", minWidth: 300 }}>
        <Typography>Inspect</Typography>
      </Grid>
    </Box>
  );
}
