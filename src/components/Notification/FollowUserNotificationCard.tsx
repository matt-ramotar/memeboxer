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
import { GodAction, Notification, Reaction, User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { API_URL } from "../../util/secrets";

interface Props {
  notification: Notification;
  action: GodAction;
}

export default function FollowUserNotificationCard(props: Props): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfilePicture, setUserProfilePicture] = useState(FALLBACK_AVATAR);
  const [isRead, setIsRead] = useState(props.notification.isRead);
  const [isFocused, setIsFocused] = useState(false);
  const [textColor, setTextColor] = useState(theme.palette.text.primary);

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
    async function fetchUserAsync(userId: string) {
      const response = await axios.get(`${API_URL}/v1/users/${userId}`);
      setUser(response.data);
    }

    if (props.action.user?.id) {
      fetchUserAsync(props.action.user.id);
    }
  }, [props.action.user?.id]);

  useEffect(() => {
    if (user) {
      setUserProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  if (!user || !currentUser) return null;

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
          <Typography style={{ marginRight: 4, color: textColor }}>started following you</Typography>
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
        <Grid style={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <img src={userProfilePicture} onError={() => setUserProfilePicture(FALLBACK_AVATAR)} alt="avatar" style={{ width: 50, height: 50, borderRadius: 8 }} />
          </Box>

          <Box style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}>
            <Box
              style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
              onClick={() => {
                onRead();
                navigate(`/${user.username}`);
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>{user.name}</Typography>
            </Box>

            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
                <Typography style={{ marginRight: 4 }}>{user.memeIds ? user.memeIds.length : 0}</Typography>
                <Typography>posts</Typography>
              </Box>

              <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
                <Typography style={{ marginRight: 4 }}>{user.usersFollowedByIds ? user.usersFollowedByIds.length : 0}</Typography>
                <Typography>{user.usersFollowedByIds?.length == 1 ? "follower" : "followers"}</Typography>
              </Box>

              <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
                <Typography style={{ marginRight: 4 }}>{user.usersFollowingIds ? user.usersFollowingIds.length : 0}</Typography>
                <Typography>following</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
