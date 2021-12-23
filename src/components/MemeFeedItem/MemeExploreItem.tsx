import { Box, Grid, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { GodMeme } from "../../types";
import { STORAGE_URL } from "../../util/secrets";

interface Props {
  meme: GodMeme;
}

export default function MemeExploreItem(props: Props): JSX.Element {
  const theme = useTheme();

  const navigate = useNavigate();
  const [actionsIsVisible, setActionsIsVisible] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      setSignedUrl(`${STORAGE_URL}/${props.meme.template._id}_${props.meme.id}`);
    }

    fetchSignedUrl();
  }, [props.meme]);

  return (
    <Grid
      container
      key={props.meme.id}
      style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}
      onMouseEnter={() => setActionsIsVisible(true)}
      onMouseLeave={() => setActionsIsVisible(false)}
    >
      <Grid item xs={12} style={{ cursor: "pointer" }}>
        {(!isLoaded || !signedUrl) && (
          <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <BeatLoader color={theme.palette.primary.main} loading={!isLoaded} />
          </Box>
        )}

        <img src={signedUrl ?? ""} alt={props.meme.caption} style={{ display: isLoaded ? "flex" : "none", width: "100%", height: "100%", objectFit: "cover" }} onLoad={() => setIsLoaded(true)} />
      </Grid>
    </Grid>
  );
}
