import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";
import { fetchGodComment } from "../../lib/comment";
import { addChildReactions } from "../../store/comment";
import { Comment, GodComment, User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { API_URL } from "../../util/secrets";
import ChildCommentReactions from "./ChildCommentReactions";

interface Props {
  comment: Comment;
}

export default function ChildComment(props: Props): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState<GodComment | null>(null);

  const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`${API_URL}/v1/users/${props.comment.userId}`);
      setUser(response.data);
    }

    fetchUser();
  }, [props.comment.userId]);

  useEffect(() => {
    async function fetchGodCommentAsync() {
      console.log("child comment", props.comment);
      const response = await fetchGodComment(props.comment.id);
      setComment(response);
    }

    if (props.comment.commentReactionIds && props.comment.commentReactionIds.length > 0) fetchGodCommentAsync();
    else setComment(null);
  }, [props.comment.id]);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://app.dropboxer.net/appbox-media/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  useEffect(() => {
    if (comment && comment.commentReactions) {
      dispatch(addChildReactions({ childCommentId: props.comment.id, commentReactions: comment.commentReactions }));
    }
  }, [props.comment.id, comment]);

  if (!user) return null;

  return (
    <Grid style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={() => navigate(`/c/${props.comment.id}`)}>
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img
          src={profilePicture ?? ""}
          onError={() => setProfilePicture(FALLBACK_AVATAR)}
          alt="avatar"
          style={{ height: 40, width: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
        />

        <Grid style={{ display: "flex", flexDirection: "column" }}>
          <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography>{user.username}</Typography>
            <Typography>
              <ReactTimeAgo date={props.comment.created} />
            </Typography>
          </Grid>

          <Typography>{props.comment.body}</Typography>
        </Grid>
      </Box>

      <Box>{comment ? <ChildCommentReactions comment={comment} /> : null}</Box>
    </Grid>
  );
}
