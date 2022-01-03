import { Box, Grid, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { GodMeme, MemeTag } from "../../../types";
import { API_URL, STORAGE_URL } from "../../../util/secrets";

interface Props {
  memeTagId: string;
}

export default function TaggedMeme(props: Props): JSX.Element | null {
  const navigate = useNavigate();
  const theme = useTheme();

  const [memeTag, setMemeTag] = useState<MemeTag | null>(null);
  const [meme, setMeme] = useState<GodMeme | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchMemeTagAsync() {
      const response = await axios.get(`${API_URL}/v1/memetags/${props.memeTagId}`);
      setMemeTag(response.data);
    }

    fetchMemeTagAsync();
  }, []);

  useEffect(() => {
    async function fetchMemeAsync(memeId: string) {
      const response = await axios.get(`${API_URL}/v1/memes/${memeId}`);
      setMeme(response.data);
    }

    if (memeTag) {
      fetchMemeAsync(memeTag.memeId);
    }
  }, [memeTag]);

  if (!memeTag || !meme) return null;

  return (
    <Grid container style={{ display: "flex", cursor: "pointer" }} onClick={() => navigate(`/m/${memeTag.memeId}`)}>
      {!isLoaded && (
        <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
          <ClipLoader color={theme.palette.text.primary} loading={!isLoaded} />
        </Box>
      )}

      <Box style={{ cursor: "pointer", position: "relative" }} onClick={() => navigate(`/m/${meme.id}`)}>
        <img
          src={`${STORAGE_URL}/${meme.template.id}_${meme.id}`}
          alt={meme.caption}
          style={{ display: isLoaded ? "flex" : "none", objectFit: "cover", height: "100%", width: "100%" }}
          onLoad={() => setIsLoaded(true)}
        />
      </Box>
    </Grid>
  );
}
