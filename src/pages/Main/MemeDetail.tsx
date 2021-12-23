import { Grid, Modal, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { GodMeme } from "../../types";
import { API_URL } from "../../util/secrets";

export default function MemeDetail(): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();
  const [meme, setMeme] = useState<GodMeme | null>(null);
  const { memeId } = useParams();

  useEffect(() => {
    async function fetchMemeAsync() {
      const response = await axios.get(`${API_URL}/v1/memes/${memeId}`);
      setMeme(response.data);
    }

    fetchMemeAsync();
  }, []);

  if (meme == null) return null;

  return (
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      <Modal
        open={true}
        onClose={() => navigate("/")}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "scroll",
        }}
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.85)" } }}
      >
        <Typography>Modal</Typography>
      </Modal>
    </Grid>
  );
}
