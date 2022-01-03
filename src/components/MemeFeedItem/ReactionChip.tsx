import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Reaction } from "../../types";
import { API_URL } from "../../util/secrets";
import { UserIdToMemeReactionIdsMap } from "./MemeFeedItem";

interface Props {
  reactionId: string;
  count: number;
  userIds: string[];
  memeId: string;
  userIdToMemeReactionIdsMap: UserIdToMemeReactionIdsMap;
}

export default function ReactionChip(props: Props): JSX.Element | null {
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme();
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [count, setCount] = useState(props.count);

  const [userHasReacted, setUserHasReacted] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchReaction() {
      const response = await axios.get(`${API_URL}/v1/reactions/${props.reactionId}`);
      console.log("fetched reaction", response.data);
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

  const onClick = () => {
    async function deleteMemeReactionAsync(memeReactionId: string) {
      const response = await axios.delete(`${API_URL}/v1/memes/${props.memeId}/reactions/${memeReactionId}`, { data: { userId: user.id, token: user.token } });
      setCount(count - 1);
      setUserHasReacted(false);
    }

    async function createMemeReactionAsync() {
      const addMemeReactionInput = {
        reactionId: props.reactionId,
        userId: user.id,
      };

      const response = await axios.post(`${API_URL}/v1/memes/${props.memeId}/reactions`, addMemeReactionInput);
      setCount(count + 1);
      setUserHasReacted(true);
    }

    if (user.id && userHasReacted == true) {
      const memeReactionIds = props.userIdToMemeReactionIdsMap[user.id];
      for (const memeReactionId of memeReactionIds) {
        deleteMemeReactionAsync(memeReactionId);
      }
    } else if (user.id && userHasReacted == false) {
      createMemeReactionAsync();
    }
  };

  if (!reaction) return null;

  return (
    <Box
      key={reaction.id}
      style={{
        display: count > 0 ? "flex" : "none",
        flexDirection: "row",
        backgroundColor: userHasReacted ? "#E3F2FD" : "#f1f1f1",
        padding: "2px 6px",
        border: userHasReacted ? `1px solid ${theme.palette.primary.main}` : "none",
        borderRadius: 16,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Typography>{reaction.native}</Typography>
      <Typography style={{ marginLeft: 8, color: userHasReacted ? theme.palette.primary.main : theme.palette.text.primary, fontFamily: "Space Grotesk" }}>{count}</Typography>
    </Box>
  );
}
