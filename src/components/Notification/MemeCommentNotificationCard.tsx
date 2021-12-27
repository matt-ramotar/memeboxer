import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";
import CheckmarkLine from "../../assets/icons/CheckmarkLine";
import CircleStandardFill from "../../assets/icons/CircleStandardFill";
import NotificationLine from "../../assets/icons/NotificationLine";
import { RootState } from "../../store";
import { setLastUpdatedNotifications } from "../../store/view";
import { GodAction, GodComment, GodMeme, Notification, Reaction } from "../../types";
import { API_URL, STORAGE_URL } from "../../util/secrets";

interface Props {
  notification: Notification;
  action: GodAction;
}

export default function MemeCommentNotificationCard(props: Props): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [meme, setMeme] = useState<GodMeme | null>(null);
  const [comment, setComment] = useState<GodComment | null>(null);
  const [isRead, setIsRead] = useState(props.notification.isRead);
  const [isFocused, setIsFocused] = useState(false);
  const [textColor, setTextColor] = useState(theme.palette.text.primary);
  const [isMemeOwner, setIsMemeOwner] = useState<boolean | null>(null);

  const currentUser = useSelector((state: RootState) => state.user);

  const onRead = () => {
    async function putIsReadAsync() {
      await axios.put(`${API_URL}/v1/notifications/${props.notification.id}/read`);
      setIsRead(true);
      dispatch(setLastUpdatedNotifications(new Date()));
    }

    putIsReadAsync();
  };

  const onUnread = () => {
    async function putIsUnreadAsync() {
      await axios.put(`${API_URL}/v1/notifications/${props.notification.id}/unread`);
      setIsRead(false);
      dispatch(setLastUpdatedNotifications(new Date()));
    }

    putIsUnreadAsync();
  };

  useEffect(() => {
    if (isRead) {
      setTextColor(theme.palette.text.disabled);
    } else {
      setTextColor(theme.palette.text.primary);
    }
  }, [isRead]);

  useEffect(() => {
    async function fetchCommentAsync(commentId: string) {
      const response = await axios.get(`${API_URL}/v1/comments/${commentId}/god`);
      setComment(response.data);
    }

    if (props.action.comment?.id) {
      fetchCommentAsync(props.action.comment.id);
    }
  }, [props.action.comment?.id]);

  useEffect(() => {
    async function fetchMemeAsync(memeId: string) {
      const response = await axios.get(`${API_URL}/v1/memes/${memeId}`);
      console.log(response.data);
      setMeme(response.data);
    }
    if (props.action.meme?._id) {
      fetchMemeAsync(props.action.meme._id);
    }
  }, [props.action.meme?._id]);

  useEffect(() => {
    setIsMemeOwner(meme?.user.id == currentUser.id);
  }, [meme?.user.id]);

  if (!meme || !comment) return null;

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: isFocused ? theme.palette.grey.A100 : theme.palette.background.paper,
        padding: 16,
        borderRadius: 8,
      }}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Grid container xs={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between", width: "100%" }}>
        <Grid item xs={10} style={{ display: "flex", flexDirection: "row" }}>
          <Typography style={{ marginRight: 4, fontWeight: "bold", color: textColor, cursor: "pointer" }} onClick={() => navigate(`/${props.action.user?.username}`)}>
            {props.action.user?.name}
          </Typography>
          <Typography style={{ marginRight: 4, color: textColor }}>{isMemeOwner ? `commented on your` : `replied to your`}</Typography>
          <Typography style={{ marginRight: 4, fontWeight: "bold", color: textColor, cursor: "pointer" }} onClick={() => navigate(`/m/${props.action.memeReaction?.memeId}`)}>
            {isMemeOwner ? "meme" : "comment"}
          </Typography>
          <Typography>
            <ReactTimeAgo date={new Date(props.notification.created)} style={{ marginRight: 4, color: textColor }} />
          </Typography>
        </Grid>

        <Box style={{ display: isFocused && !isRead ? "flex" : "none", cursor: "pointer" }} onClick={onRead}>
          <CheckmarkLine width={24} height={24} fill={theme.palette.text.primary} />
        </Box>

        <Box style={{ display: isFocused || isRead ? "none" : "flex" }}>
          <CircleStandardFill width={24} height={24} fill={theme.palette.primary.main} />
        </Box>

        <Box style={{ display: isFocused && isRead ? "flex" : "none", cursor: "pointer" }} onClick={onUnread}>
          <NotificationLine width={24} height={24} fill={theme.palette.text.primary} />
        </Box>
      </Grid>

      <Grid>
        <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Box style={{ borderLeft: `1px solid ${theme.palette.divider}`, paddingLeft: 16 }}>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Typography style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate(`/${meme.user.username}`)}>
                {meme.user.name}
              </Typography>
              <Typography style={{ marginLeft: 4 }}>
                <ReactTimeAgo date={new Date(meme.created)} />
              </Typography>
            </Box>
            <Box
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (!isRead) onRead();
                navigate(`/m/${meme.id}`);
              }}
            >
              <img src={`${STORAGE_URL}/${meme?.template.id}_${meme?.id}`} alt="meme" style={{ width: 120, height: 120, objectFit: "cover" }} />
            </Box>
          </Box>
        </Grid>

        <Grid style={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <img src={comment.user.picture} alt="avatar" style={{ width: 50, height: 50, borderRadius: 8 }} />
          </Box>

          <Box style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Typography style={{ fontWeight: "bold" }}>{comment.user.name}</Typography>
              <Typography>
                <ReactTimeAgo date={comment.created} />
              </Typography>
            </Box>

            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Typography>{comment.body}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
