import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Reaction } from "../../types";
import { API_URL } from "../../util/secrets";

interface Props {
  reactionId: string;
  count: number;
}

export default function ReactionChip(props: Props): JSX.Element | null {
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme();
  const [reaction, setReaction] = useState<Reaction | null>(null);

  useEffect(() => {
    async function fetchReaction() {
      const response = await axios.get(`${API_URL}/v1/reactions/${props.reactionId}`);
      setReaction(response.data);
    }
    fetchReaction();
  }, [props.reactionId]);

  if (!reaction) return null;

  return (
    <Box key={reaction.id} style={{ display: "flex", flexDirection: "row", backgroundColor: "#f1f1f1", padding: "2px 8px", borderRadius: 16, cursor: "pointer", marginRight: 4, marginBottom: 6 }}>
      <Typography>{reaction.native}</Typography>
      <Typography style={{ marginLeft: 8, color: theme.palette.text.primary, fontFamily: "Space Grotesk" }}>{props.count}</Typography>
    </Box>
  );
}
