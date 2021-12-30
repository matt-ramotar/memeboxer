import { Box, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { GodMeme } from "../../types";
import { STORAGE_URL } from "../../util/secrets";
import AddReactionChip from "./AddReactionChip";
import CommenterSquare from "./CommenterSquare";
import MemeUserActions from "./MemeUserActions";
import ReactionChip from "./ReactionChip";

interface Props {
  meme: GodMeme;
}

export interface ReactionIdToUserIdsMap {
  [reactionId: string]: string[];
}

export interface UserIdToMemeReactionIdsMap {
  [userId: string]: string[];
}

interface CommentersMap {
  [userId: string]: boolean;
}

interface MemeReactionInfo {
  commenters: string[];
  reactionIdToUserIds: [string, string[]][];
  userIdToMemeReactionIdsMap: UserIdToMemeReactionIdsMap;
}

export default function MemeFeedItem(props: Props): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();

  const [actionsIsVisible, setActionsIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [reactionIdToUserIdsMap, setReactionIdToUserIdsMap] = useState<ReactionIdToUserIdsMap | null>(null);
  const [userIdToMemeReactionIdsMap, setUserIdToMemeReactionIdsMap] = useState<UserIdToMemeReactionIdsMap | null>(null);
  const [commentersMap, setCommentersMap] = useState<CommentersMap | null>(null);
  const [memeReactionInfo, setMemeReactionInfo] = useState<MemeReactionInfo | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      setSignedUrl(`${STORAGE_URL}/${props.meme.template.id}_${props.meme.id}`);
    }

    fetchSignedUrl();
  }, [props.meme]);

  useEffect(() => {
    if (props.meme.reactions) {
      const reactionIdToUserIdsMap: ReactionIdToUserIdsMap = {};
      const userIdToMemeReactionIdsMap: UserIdToMemeReactionIdsMap = {};

      for (const memeReaction of props.meme.reactions) {
        if (reactionIdToUserIdsMap[memeReaction.reactionId]) reactionIdToUserIdsMap[memeReaction.reactionId].push(memeReaction.userId);
        else reactionIdToUserIdsMap[memeReaction.reactionId] = [memeReaction.userId];

        if (userIdToMemeReactionIdsMap[memeReaction.userId]) userIdToMemeReactionIdsMap[memeReaction.userId].push(memeReaction.id);
        else userIdToMemeReactionIdsMap[memeReaction.userId] = [memeReaction.id];
      }

      setReactionIdToUserIdsMap(reactionIdToUserIdsMap);
      setUserIdToMemeReactionIdsMap(userIdToMemeReactionIdsMap);
    }
  }, [props.meme.reactions]);

  useEffect(() => {
    const commentersMap: CommentersMap = {};

    for (const comment of props.meme.comments ?? []) {
      commentersMap[comment.userId] = true;
    }

    setCommentersMap(commentersMap);
  }, [props.meme.comments]);

  useEffect(() => {
    const commenters = commentersMap && Object.keys(commentersMap) ? Object.keys(commentersMap) : [];
    const reactionIdToUserIds = reactionIdToUserIdsMap && Object.keys(reactionIdToUserIdsMap) ? Object.entries(reactionIdToUserIdsMap) : [];

    setMemeReactionInfo({ commenters, userIdToMemeReactionIdsMap: userIdToMemeReactionIdsMap ?? {}, reactionIdToUserIds });
  }, [userIdToMemeReactionIdsMap, reactionIdToUserIdsMap, commentersMap]);

  if (!memeReactionInfo) return null;

  return (
    <Box
      key={props.meme.id}
      style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 16, paddingBottom: 16, position: "relative" }}
      onMouseEnter={() => setActionsIsVisible(true)}
      onMouseLeave={() => setActionsIsVisible(false)}
    >
      <Box style={{ display: actionsIsVisible ? "flex" : "none", position: "absolute", top: 0, right: -20 }}>
        <MemeUserActions meme={props.meme} isVisible={actionsIsVisible} />
      </Box>

      <Box style={{ border: `1px solid ${theme.palette.divider}`, paddingTop: 8, paddingBottom: 8 }}>
        <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <img src={props.meme.user.picture} alt="avatar" style={{ height: 40, width: 40, borderRadius: 50 }} />

          <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: 8, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
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

        <Box style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "space-around", paddingTop: 8 }}>
          <Box style={{ display: props.meme.caption ? "flex" : "none", flexDirection: "row" }}>
            <Typography variant="body1" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", padding: 0, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
              {props.meme.user.username}
            </Typography>

            <Typography variant="body1" style={{ fontFamily: "Space Grotesk" }}>
              {props.meme.caption}
            </Typography>
          </Box>

          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Box style={{ display: memeReactionInfo.reactionIdToUserIds.length > 0 ? "flex" : "none" }}>
              {memeReactionInfo.reactionIdToUserIds.map(([reactionId, userIds]) => (
                <ReactionChip
                  key={reactionId}
                  reactionId={reactionId}
                  count={userIds.length}
                  userIds={userIds}
                  memeId={props.meme.id}
                  userIdToMemeReactionIdsMap={memeReactionInfo.userIdToMemeReactionIdsMap}
                />
              ))}
            </Box>

            <Box>
              <AddReactionChip meme={props.meme} />
            </Box>
          </Box>

          <Box
            style={{ display: memeReactionInfo.commenters.length > 0 ? "flex" : "none", flexDirection: "row", alignItems: "center", cursor: "pointer", marginTop: 8 }}
            onClick={() => navigate(`/m/${props.meme.id}`)}
          >
            <Box>
              {memeReactionInfo.commenters.map((userId) => (
                <CommenterSquare key={userId} userId={userId} />
              ))}
            </Box>

            <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold" }}>{`${props.meme.comments?.length} comment${props.meme.comments?.length == 1 ? "" : "s"}`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
