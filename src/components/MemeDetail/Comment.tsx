import { Box, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";
import { GodComment } from "../../types";
import { API_URL } from "../../util/secrets";

interface Props {
  commentId: string;
}

export default function Comment(props: Props): JSX.Element {
  const [comment, setComment] = useState<GodComment | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGodCommentAsync() {
      console.log(props.commentId);
      const response = await axios.get(`${API_URL}/v1/comments/${props.commentId}/god`);
      console.log(response.data);
      setComment(response.data);
    }

    fetchGodCommentAsync();
  }, [props.commentId]);

  if (!comment) return <Grid container style={{ display: "flex", width: "100%", height: 48, visibility: "visible" }}></Grid>;

  return (
    <Grid container style={{ marginBottom: 8 }}>
      <img src={comment.user.picture ?? ""} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }} />

      <Box style={{ marginLeft: 8 }}>
        <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate(`/${comment.user.username}`)}>
          {comment.user.username}
        </Typography>
        <Typography style={{ fontFamily: "Space Grotesk" }}>{comment.body}</Typography>
      </Box>

      <ReactTimeAgo date={comment.created} locale="en-US" timeStyle="twitter" />
    </Grid>
  );
}
