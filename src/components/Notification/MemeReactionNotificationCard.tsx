import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";
import CheckmarkLine from "../../assets/icons/CheckmarkLine";
import CircleStandardFill from "../../assets/icons/CircleStandardFill";
import NotificationLine from "../../assets/icons/NotificationLine";
import { setLastUpdatedNotifications } from "../../store/view";
import { GodAction, GodMeme, Notification, Reaction } from "../../types";
import { API_URL, STORAGE_URL } from "../../util/secrets";

interface Props {
  notification: Notification;
  action: GodAction;
}

export default function MemeReactionNotificationCard(props: Props): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [meme, setMeme] = useState<GodMeme | null>(null);
  const [isRead, setIsRead] = useState(props.notification.isRead);

  const [isFocused, setIsFocused] = useState(false);

  const [textColor, setTextColor] = useState(theme.palette.text.primary);

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
    async function fetchMemeReactionAsync(reactionId: string) {
      const response = await axios.get(`${API_URL}/v1/reactions/${reactionId}`);
      setReaction(response.data);
    }

    if (props.action.memeReaction?.reactionId) {
      fetchMemeReactionAsync(props.action.memeReaction.reactionId);
    }
  }, [props.action.memeReaction?.reactionId]);

  useEffect(() => {
    async function fetchMemeAsync(memeId: string) {
      const response = await axios.get(`${API_URL}/v1/memes/${memeId}`);
      setMeme(response.data);
    }

    if (props.action.memeReaction?.memeId) {
      fetchMemeAsync(props.action.memeReaction.memeId);
    }
  }, [props.action.memeReaction?.memeId]);

  if (!meme) return null;

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
          <Typography style={{ marginRight: 4, color: textColor }}>reacted to your</Typography>
          <Typography style={{ marginRight: 4, fontWeight: "bold", color: textColor, cursor: "pointer" }} onClick={() => navigate(`/m/${props.action.memeReaction?.memeId}`)}>
            meme
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

      <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <Box>
          <Typography variant="h2">{reaction?.native}</Typography>
        </Box>

        <Box style={{ marginLeft: 16 }}>
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
    </Grid>
  );
}
