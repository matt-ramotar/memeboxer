import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { GodComment } from "../../../types";
import CommentReactionChip from "../../CommentDetail/CommentReactionChip";
import { ReactionIdToUserIdsMap } from "../../MemeFeedItem/MemeFeedItem";

interface Props {
  comment: GodComment;
}

interface CommentReactionInfo {
  reactionIdToUserIds: [string, string[]][];
  userIdToCommentReactionIdsMap: UserIdToCommentReactionIdsMap;
}

export interface UserIdToCommentReactionIdsMap {
  [userId: string]: string[];
}

export default function CommentReactions(props: Props): JSX.Element | null {
  const commentReactions = useSelector((state: RootState) => state.meme.commentReactions[props.comment.id]);

  const [reactionIdToUserIdsMap, setReactionIdToUserIdsMap] = useState<ReactionIdToUserIdsMap | null>(null);
  const [userIdToCommentReactionIdsMap, setUserIdToCommentReactionIdsMap] = useState<UserIdToCommentReactionIdsMap | null>(null);
  const [commentReactionInfo, setCommentReactionInfo] = useState<CommentReactionInfo | null>(null);

  useEffect(() => {
    if (commentReactions) {
      console.log("hitting in comment reactions", commentReactions);
      const reactionIdToUserIdsMap: ReactionIdToUserIdsMap = {};
      const userIdToCommentReactionIdsMap: UserIdToCommentReactionIdsMap = {};

      for (const commentReaction of commentReactions) {
        if (reactionIdToUserIdsMap[commentReaction.reactionId]) reactionIdToUserIdsMap[commentReaction.reactionId].push(commentReaction.userId);
        else reactionIdToUserIdsMap[commentReaction.reactionId] = [commentReaction.userId];

        if (userIdToCommentReactionIdsMap[commentReaction.userId]) userIdToCommentReactionIdsMap[commentReaction.userId].push(commentReaction._id);
        else userIdToCommentReactionIdsMap[commentReaction.userId] = [commentReaction._id];
      }

      setReactionIdToUserIdsMap(reactionIdToUserIdsMap);
      setUserIdToCommentReactionIdsMap(userIdToCommentReactionIdsMap);
    }
  }, [commentReactions]);

  useEffect(() => {
    const reactionIdToUserIds = reactionIdToUserIdsMap && Object.keys(reactionIdToUserIdsMap) ? Object.entries(reactionIdToUserIdsMap) : [];
    const commentReactionInfo: CommentReactionInfo = {
      reactionIdToUserIds,
      userIdToCommentReactionIdsMap: userIdToCommentReactionIdsMap ?? {},
    };

    setCommentReactionInfo(commentReactionInfo);
  }, [userIdToCommentReactionIdsMap, reactionIdToUserIdsMap]);

  if (!commentReactionInfo) return null;

  return (
    <Grid>
      <Grid style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
        {commentReactionInfo.reactionIdToUserIds.map(([reactionId, userIds]) => (
          <Box key={reactionId} style={{ marginRight: 8 }}>
            <CommentReactionChip
              reactionId={reactionId}
              count={userIds.length}
              userIds={userIds}
              commentId={props.comment.id}
              userIdToCommentReactionIdsMap={commentReactionInfo.userIdToCommentReactionIdsMap}
            />
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}
