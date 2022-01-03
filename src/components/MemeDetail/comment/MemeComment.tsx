import { Box, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";
import { addCommentReactions } from "../../../store/meme";
import { GodComment } from "../../../types";
import { API_URL } from "../../../util/secrets";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import CommentReactions from "./CommentReactions";
import CommentUserActions from "./CommentUserActions";

interface Props {
  commentId: string;
}

export default function MemeComment(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState<GodComment | null>(null);
  const [actionsIsVisible, setActionsIsVisible] = useState(false);

  useEffect(() => {
    async function fetchGodCommentAsync() {
      const response = await axios.get(`${API_URL}/v1/comments/${props.commentId}/god`);

      setComment(response.data);
    }

    fetchGodCommentAsync();
  }, [props.commentId]);

  useEffect(() => {
    if (comment && comment.commentReactions) {
      dispatch(addCommentReactions({ commentId: comment.id, commentReactions: comment.commentReactions }));
    }
  }, [props.commentId, comment]);

  if (!comment) return <Grid container style={{ display: "flex", width: "100%", height: 48, visibility: "visible" }}></Grid>;

  return (
    <Grid
      container
      style={{ marginBottom: 12, position: "relative", cursor: "pointer", display: "flex", flexDirection: "column", flexWrap: "nowrap" }}
      onMouseEnter={() => setActionsIsVisible(true)}
      onMouseLeave={() => setActionsIsVisible(false)}
      onClick={() => navigate(`/c/${props.commentId}`)}
    >
      <Box style={{ display: actionsIsVisible ? "flex" : "none", position: "absolute", top: -8, right: 0 }}>
        <CommentUserActions comment={comment} isVisible={actionsIsVisible} />
      </Box>

      <Grid item xs={12} style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <ProfilePicture username={comment.user.username} />

        <Box style={{ marginLeft: 8 }}>
          <Typography
            style={{ fontFamily: "Space Grotesk", fontWeight: "bold", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${comment.user.username}`);
            }}
          >
            {comment.user.username}
          </Typography>
          <Typography style={{ fontFamily: "Space Grotesk" }}>{comment.body}</Typography>
        </Box>

        <ReactTimeAgo date={comment.created} locale="en-US" timeStyle="twitter" />
      </Grid>

      <Grid item xs={12} style={{ display: "flex" }}>
        {comment ? <CommentReactions comment={comment} /> : null}
      </Grid>
    </Grid>
  );
}
