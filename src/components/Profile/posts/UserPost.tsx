import { Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GodMeme } from "../../../types";
import { API_URL, STORAGE_URL } from "../../../util/secrets";

interface Props {
  memeId: string;
}

export default function UserPost(props: Props): JSX.Element | null {
  const [meme, setMeme] = useState<GodMeme | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMemeAsync() {
      const response = await axios.get(`${API_URL}/v1/memes/${props.memeId}`);
      setMeme(response.data);
    }

    fetchMemeAsync();
  }, []);

  if (!meme) return null;

  return (
    <Grid container style={{ display: "flex", cursor: "pointer" }} onClick={() => navigate(`/m/${meme.id}`)}>
      <img src={`${STORAGE_URL}/${meme.template.id}_${meme.id}`} alt="meme" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
    </Grid>
  );
}
