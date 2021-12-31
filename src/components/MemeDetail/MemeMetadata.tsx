import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import { GodMeme } from "../../types";

interface Props {
  meme: GodMeme;
}

export default function MemeMetadata(props: Props): JSX.Element {
  const theme = useTheme();

  return (
    <Grid>
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body2" style={{ color: theme.palette.grey[500] }}>
          {`${new Date(props.meme.created).toLocaleTimeString()}`}
        </Typography>

        <Typography variant="body2" style={{ color: theme.palette.grey[500], marginLeft: 8 }}>
          •
        </Typography>

        <Typography variant="body2" style={{ marginLeft: 8, color: theme.palette.grey[500] }}>
          {`${new Date(props.meme.created).toLocaleDateString()}`}
        </Typography>

        <Typography variant="body2" style={{ color: theme.palette.grey[500], marginLeft: 8 }}>
          •
        </Typography>

        <Typography variant="body2" style={{ marginLeft: 8, color: theme.palette.grey[500] }}>
          Memeboxer Web App
        </Typography>
      </Box>
    </Grid>
  );
}
