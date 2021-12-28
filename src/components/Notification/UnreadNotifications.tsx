import { Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Notification } from "../../types";
import { API_URL } from "../../util/secrets";

export default function UnreadNotifications(): JSX.Element | null {
  const theme = useTheme();

  const currentUser = useSelector((state: RootState) => state.user);
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[] | null>(null);

  useEffect(() => {
    async function fetchUserUnreadNotificationsAsync() {
      const response = await axios.get(`${API_URL}/v1/users/${currentUser.id}/notifications/unread`);

      setUnreadNotifications(response.data);
    }

    fetchUserUnreadNotificationsAsync();
  }, [currentUser.id]);

  if (!unreadNotifications || unreadNotifications.length === 0) return null;

  return (
    <Grid style={{ backgroundColor: theme.palette.error.main, borderRadius: "50%", height: 20, width: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="body2" style={{ fontWeight: "bold", color: theme.palette.background.paper }}>
        {unreadNotifications.length}
      </Typography>
    </Grid>
  );
}
