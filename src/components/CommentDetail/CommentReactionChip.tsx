import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Reaction } from "../../types";
import { API_URL } from "../../util/secrets";
import { UserIdToCommentReactionIdsMap } from "./MainCommentReactions";

interface Props {
  reactionId: string;
  count: number;
  userIds: string[];
  commentId: string;
  userIdToCommentReactionIdsMap: UserIdToCommentReactionIdsMap;
}

export default function CommentReactionChip(props: Props): JSX.Element | null {
  const theme = useTheme();

  const user = useSelector((state: RootState) => state.user);
  const commentReactions = useSelector((state: RootState) => state.comment.reactions);

  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [count, setCount] = useState(props.count);
  const [userHasReacted, setUserHasReacted] = useState<boolean | null>(null);

  const onClick = () => {
    async function deleteCommentReactionAsync(commentReactionId: string) {
      const response = await axios.delete(`${API_URL}/v1/comments/${props.commentId}/reactions/${commentReactionId}`, { data: { userId: user.id, token: user.token } });
      setCount(count - 1);
      setUserHasReacted(false);
    }

    async function createCommentReactionAsync() {
      const addCommentReactionInput = {
        reactionId: props.reactionId,
        userId: user.id,
      };

      const response = await axios.post(`${API_URL}/v1/comments/${props.commentId}/reactions`, addCommentReactionInput);
      setCount(count + 1);
      setUserHasReacted(true);
    }

    if (user.id && userHasReacted == true) {
      const commentReactionIds = props.userIdToCommentReactionIdsMap[user.id];
      for (const commentReactionId of commentReactionIds) {
        deleteCommentReactionAsync(commentReactionId);
      }
    } else if (user.id && userHasReacted == false) {
      createCommentReactionAsync();
    }
  };

  useEffect(() => {
    async function fetchReaction() {
      const response = await axios.get(`${API_URL}/v1/reactions/${props.reactionId}`);
      setReaction(response.data);
    }
    fetchReaction();
  }, [props.reactionId]);

  useEffect(() => {
    if (user && user.id) {
      setUserHasReacted(Boolean(props.userIds.includes(user.id)));
    } else {
      setUserHasReacted(false);
    }
  }, [user]);

  useEffect(() => {
    setCount(props.count);
  }, [props.count]);

  if (!reaction) return null;

  return (
    <Box
      key={reaction.id}
      style={{
        display: count > 0 ? "flex" : "none",
        flexDirection: "row",
        backgroundColor: userHasReacted ? "#E3F2FD" : "#f1f1f1",
        padding: "2px 8px",
        border: userHasReacted ? `1px solid ${theme.palette.primary.main}` : "none",
        borderRadius: 16,
        cursor: "pointer",

        marginBottom: 4,
      }}
      onClick={onClick}
    >
      <Typography variant="body2">{reaction.native}</Typography>
      <Typography variant="body2" style={{ marginLeft: 8, color: userHasReacted ? theme.palette.primary.main : theme.palette.text.primary, fontFamily: "Space Grotesk" }}>
        {count}
      </Typography>
    </Box>
  );
}
