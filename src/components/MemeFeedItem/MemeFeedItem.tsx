import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import PersonFill from "../../assets/icons/PersonFill";
import { RootState } from "../../store";
import { addMemeReactions } from "../../store/feed";
import { GodMeme } from "../../types";
import { STORAGE_URL } from "../../util/secrets";
import UserTag from "../MemeDetail/UserTag";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
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
  const dispatch = useDispatch();

  const memeReactionsRedux = useSelector((state: RootState) => state.feed.memeReactions[props.meme.id]);

  const [actionsIsVisible, setActionsIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [reactionIdToUserIdsMap, setReactionIdToUserIdsMap] = useState<ReactionIdToUserIdsMap | null>(null);
  const [userIdToMemeReactionIdsMap, setUserIdToMemeReactionIdsMap] = useState<UserIdToMemeReactionIdsMap | null>(null);
  const [commentersMap, setCommentersMap] = useState<CommentersMap | null>(null);
  const [memeReactionInfo, setMemeReactionInfo] = useState<MemeReactionInfo | null>(null);
  const [shouldShowUserTags, setShouldShowUserTags] = useState(false);

  useEffect(() => {
    async function fetchSignedUrl() {
      setSignedUrl(`${STORAGE_URL}/${props.meme.template.id}_${props.meme.id}`);
    }

    fetchSignedUrl();
  }, [props.meme]);

  useEffect(() => {
    if (props.meme.reactions) {
      dispatch(addMemeReactions({ memeId: props.meme.id, memeReactions: props.meme.reactions }));
    }
  }, [props.meme.reactions]);

  useEffect(() => {
    if (memeReactionsRedux) {
      const reactionIdToUserIdsMap: ReactionIdToUserIdsMap = {};
      const userIdToMemeReactionIdsMap: UserIdToMemeReactionIdsMap = {};

      for (const memeReaction of memeReactionsRedux) {
        if (reactionIdToUserIdsMap[memeReaction.reactionId]) reactionIdToUserIdsMap[memeReaction.reactionId].push(memeReaction.userId);
        else reactionIdToUserIdsMap[memeReaction.reactionId] = [memeReaction.userId];

        if (userIdToMemeReactionIdsMap[memeReaction.userId]) userIdToMemeReactionIdsMap[memeReaction.userId].push(memeReaction.id);
        else userIdToMemeReactionIdsMap[memeReaction.userId] = [memeReaction.id];
      }

      setReactionIdToUserIdsMap(reactionIdToUserIdsMap);
      setUserIdToMemeReactionIdsMap(userIdToMemeReactionIdsMap);
    }
  }, [memeReactionsRedux]);

  useEffect(() => {
    const commentersMap: CommentersMap = {};

    for (const comment of props.meme.comments ?? []) {
      commentersMap[comment.userId] = true;
    }

    setCommentersMap(commentersMap);
  }, [props.meme.comments]);

  useEffect(() => {
    const commenters = commentersMap && Object.keys(commentersMap) ? Object.keys(commentersMap) : [];
    const reactionIdToUserIds = reactionIdToUserIdsMap && Object.keys(reactionIdToUserIdsMap) ? [...Object.entries(reactionIdToUserIdsMap)] : [];

    setMemeReactionInfo({ commenters, userIdToMemeReactionIdsMap: userIdToMemeReactionIdsMap ?? {}, reactionIdToUserIds });
  }, [userIdToMemeReactionIdsMap, reactionIdToUserIdsMap, commentersMap]);

  if (!memeReactionInfo) return null;

  return (
    <Box
      key={props.meme.id}
      style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 16, paddingBottom: 16, position: "relative", width: 600 }}
      onMouseEnter={() => setActionsIsVisible(true)}
      onMouseLeave={() => setActionsIsVisible(false)}
    >
      <Box style={{ display: actionsIsVisible ? "flex" : "none", position: "absolute", top: 0, right: -20 }}>
        <MemeUserActions meme={props.meme} isVisible={actionsIsVisible} />
      </Box>

      <Box style={{ border: `1px solid ${theme.palette.divider}`, paddingTop: 8, paddingBottom: 8 }}>
        <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <ProfilePicture username={props.meme.user.username} />

          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: 8, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
              {props.meme.user.username}
            </Typography>

            <Typography variant="body2" style={{ marginLeft: 8 }}>
              {props.meme.location}
            </Typography>
          </Box>
        </Box>

        {(!isLoaded || !signedUrl) && (
          <Box style={{ width: 600, height: 600, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <BeatLoader color={theme.palette.primary.main} loading={!isLoaded} />
          </Box>
        )}

        <Box style={{ cursor: "pointer", position: "relative" }} onClick={() => navigate(`/m/${props.meme.id}`)}>
          <img src={signedUrl ?? ""} alt={props.meme.caption} style={{ width: 600, display: isLoaded ? "flex" : "none" }} onLoad={() => setIsLoaded(true)} />

          <Box style={{ display: shouldShowUserTags ? "flex" : "none" }}>
            {props.meme.memeTags?.map((memeTag) => (
              <Box id="tagged-user-meme-post" key={memeTag.id} style={{ position: "absolute", top: memeTag.yOffset, left: memeTag.xOffset }}>
                <UserTag memeTag={memeTag} />
              </Box>
            ))}
          </Box>

          <Box
            style={{
              position: "absolute",
              cursor: "pointer",
              bottom: 8,
              left: 8,
              backgroundColor: "black",
              visibility: "visible",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: props.meme.memeTags && props.meme.memeTags.length > 0 ? "flex" : "none",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShouldShowUserTags(!shouldShowUserTags);
            }}
          >
            <PersonFill width={24} height={24} fill="white" />
          </Box>
        </Box>

        <Box style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "space-around", paddingTop: 8, width: "100%" }}>
          <Box style={{ display: props.meme.caption ? "flex" : "none", flexDirection: "row", marginLeft: 4 }}>
            <Typography variant="body1" style={{ fontWeight: "bold", padding: 0, cursor: "pointer" }} onClick={() => navigate(`/${props.meme.user.username}`)}>
              {props.meme.user.username}
            </Typography>

            <Typography variant="body1" style={{ marginLeft: 8 }}>
              {props.meme.caption}
            </Typography>
          </Box>

          <Grid
            container
            spacing={1}
            style={{
              display: memeReactionInfo.reactionIdToUserIds.length > 0 ? "flex" : "none",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "wrap",
              paddingLeft: 4,
              paddingRight: 4,
              marginTop: 4,
            }}
          >
            {memeReactionInfo.reactionIdToUserIds.map(([reactionId, userIds]) => (
              <Grid item key={reactionId}>
                <ReactionChip reactionId={reactionId} count={userIds.length} userIds={userIds} memeId={props.meme.id} userIdToMemeReactionIdsMap={memeReactionInfo.userIdToMemeReactionIdsMap} />
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            style={{ display: memeReactionInfo.commenters.length > 0 ? "flex" : "none", flexDirection: "row", alignItems: "center", cursor: "pointer", marginTop: 12, paddingLeft: 4, paddingRight: 4 }}
            onClick={() => navigate(`/m/${props.meme.id}`)}
          >
            {memeReactionInfo.commenters.map((userId) => (
              <Grid item key={userId}>
                <CommenterSquare userId={userId} />
              </Grid>
            ))}

            <Typography variant="body1" style={{ marginLeft: 8, fontWeight: "bold" }}>{`${props.meme.comments?.length} comment${props.meme.comments?.length == 1 ? "" : "s"}`}</Typography>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
