import { Box, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { GodMeme } from "../../types";
import { STORAGE_URL } from "../../util/secrets";
import MemeUserActions from "./MemeUserActions";

interface Props {
  meme: GodMeme;
}

export default function MemeFeedItem(props: Props): JSX.Element {
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
    <Box
      key={props.meme.id}
      style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20, paddingBottom: 20, position: "relative" }}
      onMouseEnter={() => setActionsIsVisible(true)}
      onMouseLeave={() => setActionsIsVisible(false)}
    >
      <Box style={{ display: actionsIsVisible ? "flex" : "none", position: "absolute", top: 0, right: -20 }}>
        <MemeUserActions meme={props.meme} />
      </Box>

      <Box style={{ border: `1px solid ${theme.palette.divider}`, paddingTop: 10, paddingBottom: 10 }}>
        <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <img src={props.meme.user.picture} alt="avatar" style={{ height: 40, width: 40, borderRadius: 50 }} />

          <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: 10, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
            {props.meme.user.username}
          </Typography>
        </Box>

        {(!isLoaded || !signedUrl) && (
          <Box style={{ width: 600, height: 600, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <BeatLoader color={theme.palette.primary.main} loading={!isLoaded} />
          </Box>
        )}

        <Box style={{ cursor: "pointer" }} onClick={() => navigate(`/m/${props.meme.id}`)}>
          <img src={signedUrl ?? ""} alt={props.meme.caption} style={{ width: 600, display: isLoaded ? "flex" : "none" }} onLoad={() => setIsLoaded(true)} />
        </Box>

        <Box style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 10 }}>
          {props.meme.caption ? (
            <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: 10, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
              {props.meme.user.username}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
