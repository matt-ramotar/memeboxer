import { Grid, TextField, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../lib/comment";
import { RootState } from "../../store";
import { setChildComments } from "../../store/comment";
import { Comment, GodComment } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";

interface Props {
  comment: GodComment;
}

export default function Reply(props: Props): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const childComments = useSelector((state: RootState) => state.comment.children);

  const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);
  const [isFocused, setIsFocused] = useState(false);
  const [reply, setReply] = useState<string | null>(null);

  const postReply = async (userId: string, body: string) => {
    const godComment = await createComment(userId, body, props.comment.id);
    const childComment: Comment = {
      id: godComment.id,
      userId: godComment.user.id,
      parentCommentId: godComment.parentComment?.id,
      body: godComment.body,
      created: godComment.created,
    };

    const nextChildComments = childComments ? [...childComments] : [];
    nextChildComments.push(childComment);
    dispatch(setChildComments(nextChildComments));

    setReply(null);
  };

  const onKeyDown = (e: any) => {
    if (e.key == "Enter" && e.shiftKey) {
      if (user && user.id && reply) {
        console.log("hitting");
        postReply(user.id, reply);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  if (isFocused || reply) {
    return (
      <Grid container style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Grid container style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
          <Grid item style={{ marginRight: 16 }}>
            <img
              src={profilePicture ?? ""}
              onError={() => setProfilePicture(FALLBACK_AVATAR)}
              alt="avatar"
              style={{ height: 40, width: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
            />
          </Grid>

          <TextField
            multiline
            placeholder="Type your reply"
            InputProps={{ disableUnderline: true }}
            inputProps={{ style: { fontSize: 18 } }}
            style={{ width: "100%" }}
            onClick={() => setIsFocused(true)}
            onChange={(e) => setReply(e.target.value)}
            onBlur={() => setIsFocused(false)}
            value={reply}
            onKeyDown={onKeyDown}
          />
        </Grid>

        <Grid item style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
          <button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.paper, border: "none", borderRadius: 4, padding: "8px 32px", cursor: "pointer" }}>
            <Typography style={{ fontWeight: "bold" }}>Reply</Typography>
          </button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "nowrap" }}>
      <Grid item style={{ marginRight: 16 }}>
        <img
          src={profilePicture ?? ""}
          onError={() => setProfilePicture(FALLBACK_AVATAR)}
          alt="avatar"
          style={{ height: 40, width: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
        />
      </Grid>

      <TextField
        multiline
        placeholder="Type your reply"
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { fontSize: 18 } }}
        style={{ width: "100%" }}
        onClick={() => setIsFocused(true)}
      />

      <Grid item>
        <button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.paper, opacity: 0.4, border: "none", borderRadius: 4, padding: "8px 32px", cursor: "pointer" }}>
          <Typography style={{ fontWeight: "bold" }}>Reply</Typography>
        </button>
      </Grid>
    </Grid>
  );
}
