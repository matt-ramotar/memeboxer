import { Box, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";
import { GodComment } from "../../types";
import { API_URL } from "../../util/secrets";
import CommentUserActions from "./CommentUserActions";

interface Props {
  commentId: string;
}

export default function Comment(props: Props): JSX.Element {
  const [comment, setComment] = useState<GodComment | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGodCommentAsync() {
      const response = await axios.get(`${API_URL}/v1/comments/${props.commentId}/god`);
      console.log("response", response);
      setComment(response.data);
    }

    console.log("user comment in meme detail", props);

    fetchGodCommentAsync();
  }, [props.commentId]);

  const [actionsIsVisible, setActionsIsVisible] = useState(false);

  if (!comment) return <Grid container style={{ display: "flex", width: "100%", height: 48, visibility: "visible" }}></Grid>;

  return (
    <Grid
      container
      style={{ marginBottom: 12, position: "relative", cursor: "pointer" }}
      onMouseEnter={() => setActionsIsVisible(true)}
      onMouseLeave={() => setActionsIsVisible(false)}
      onClick={() => navigate(`/c/${props.commentId}`)}
    >
      <Box style={{ display: actionsIsVisible ? "flex" : "none", position: "absolute", top: -8, right: 0 }}>
        <CommentUserActions comment={comment} isVisible={actionsIsVisible} />
      </Box>

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
