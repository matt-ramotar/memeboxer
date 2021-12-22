import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { GodMeme } from "../../types";
import { API_URL } from "../../util/secrets";

interface Props {
  meme: GodMeme;
}

export default function MemeFeedItem(props: Props): JSX.Element {
  const theme = useTheme();

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${API_URL}/storage/${props.meme.template._id}_${props.meme.id}`);
      setSignedUrl(response.data.data);
    }

    fetchSignedUrl();
  }, [props.meme]);

  return (
    <Box key={props.meme.id} style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20, paddingBottom: 20 }}>
      <Box style={{ border: `1px solid ${theme.palette.divider}`, paddingTop: 10, paddingBottom: 10 }}>
        <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <img src={props.meme.user.picture} alt="avatar" style={{ height: 40, width: 40, borderRadius: 50 }} />

          <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: 10, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
            {props.meme.user.name}
          </Typography>
        </Box>

        {(!isLoaded || !signedUrl) && (
          <Box style={{ width: 600, height: 600, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <BeatLoader color={theme.palette.primary.main} loading={!isLoaded} />
          </Box>
        )}

        <img src={signedUrl ?? ""} alt={props.meme.caption} style={{ width: 600, display: isLoaded ? "flex" : "none" }} onLoad={() => setIsLoaded(true)} />
      </Box>
    </Box>
  );
}
