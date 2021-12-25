import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { DREW, TIMOTHY } from "../../fakes";
import { GodComment, GodMeme, User } from "../../types";
import { API_URL, STORAGE_URL } from "../../util/secrets";
import MemeUserActions from "./MemeUserActions";
import ReactionChip from "./ReactionChip";

interface Props {
  meme: GodMeme;
}

interface MemeReactionsMap {
  [key: string]: number;
}

interface CommenterMap {
  [key: string]: User;
}

const buildGodComment = (body: string, user: User): GodComment => {
  return {
    id: "",
    user,
    body,
    created: new Date(),
  };
};

export default function MemeFeedItem(props: Props): JSX.Element {
  const theme = useTheme();

  const navigate = useNavigate();
  const [actionsIsVisible, setActionsIsVisible] = useState(false);
  const [godMeme, setGodMeme] = useState<GodMeme | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  const comments = [buildGodComment("Haha", DREW), buildGodComment("This is great", DREW), buildGodComment("Well done", TIMOTHY)];

  const getCommenters = () => {
    const map: CommenterMap = {};

    for (const comment of comments) {
      map[comment.user.id] = comment.user;
    }

    return Object.values(map);
  };

  const getMemeReactions = () => {
    if (godMeme && godMeme.reactions) {
      const map: MemeReactionsMap = {};

      for (const memeReaction of godMeme.reactions) {
        map[memeReaction.reactionId] = map[memeReaction.reactionId] ? map[memeReaction.reactionId] + 1 : 1;
      }

      return Object.entries(map);
    }
    return [];
  };

  useEffect(() => {
    async function fetchSignedUrl() {
      setSignedUrl(`${STORAGE_URL}/${props.meme.template.id}_${props.meme.id}`);
    }

    fetchSignedUrl();
  }, [props.meme]);

  useEffect(() => {
    async function fetchGodMeme() {
      const response = await axios.get(`${API_URL}/v1/memes/${props.meme.id}`);
      setGodMeme(response.data);
    }

    fetchGodMeme();
  }, [props.meme]);

  return (
    <Box
      key={props.meme.id}
      style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20, paddingBottom: 20, position: "relative" }}
      onMouseEnter={() => setActionsIsVisible(true)}
      onMouseLeave={() => setActionsIsVisible(false)}
    >
      <Box style={{ display: actionsIsVisible ? "flex" : "none", position: "absolute", top: 0, right: -20 }}>
        <MemeUserActions meme={props.meme} isVisible={actionsIsVisible} />
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

        <Box style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "space-around", padding: "4px 0px" }}>
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="body1" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", padding: 0, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
              {godMeme?.user.username}
            </Typography>

            <Typography variant="body1" style={{ fontFamily: "Space Grotesk" }}>
              So Memeboxer is an app that
            </Typography>
          </Box>

          <Box style={{}}>
            {props.meme.caption ? (
              <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: 8, cursor: "pointer", padding: 0 }} onClick={() => navigate(`/${props.meme.user.username}`)}>
                {props.meme.user.username}
              </Typography>
            ) : null}
          </Box>

          <Box style={{ display: "flex", flexDirection: "row" }}>
            {getMemeReactions().map(([reactionId, count]) => (
              <ReactionChip key={reactionId} reactionId={reactionId} count={count} />
            ))}
          </Box>

          <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }} onClick={() => navigate(`/m/${godMeme?.id}`)}>
            <Box>
              {getCommenters().map((user) => (
                <img key={user.id} src={user.picture ?? ""} alt="avatar" style={{ height: 32, width: 32, borderRadius: 4, objectFit: "cover", marginRight: 4 }} />
              ))}
            </Box>

            <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold" }}>{`${comments.length} comment${comments.length > 1 ? "s" : ""}`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
