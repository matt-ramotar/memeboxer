import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import CommentLine from "../../assets/icons/CommentLine";
import EmojiSmileLine from "../../assets/icons/EmojiSmileLine";
import HeartLine from "../../assets/icons/HeartLine";
import MoreVerticalLine from "../../assets/icons/MoreVerticalLine";
import { GodMeme } from "../../types";
import { API_URL } from "../../util/secrets";

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
      const response = await axios.get(`${API_URL}/storage/${props.meme.template._id}_${props.meme.id}`);
      setSignedUrl(response.data.data);
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
      <Box
        style={{
          position: "absolute",
          top: 0,
          right: -20,
          display: actionsIsVisible ? "flex" : "none",
          padding: 8,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 10,
        }}
      >
        {/* <EmojiPopover size="lg" actionId={props.action.id} userId={props.user.id} /> */}

        <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}>
          <EmojiSmileLine fill={theme.palette.text.primary} height={28} width={28} />
        </button>

        <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}>
          <CommentLine fill={theme.palette.text.primary} height={28} width={28} />
        </button>

        <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}>
          <HeartLine fill={theme.palette.text.primary} height={28} width={28} />
        </button>

        <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}>
          <MoreVerticalLine fill={theme.palette.text.primary} height={28} width={28} />
        </button>
      </Box>
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
