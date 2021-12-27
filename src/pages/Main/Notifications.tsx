import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import MoreHorizontalLine from "../../assets/icons/MoreHorizontalLine";
import NotificationCard from "../../components/Notification/NotificationCard";
import { RootState } from "../../store";
import { Page, setActivePage } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { Notification } from "../../types";
import { API_URL } from "../../util/secrets";

export default function Notifications(): JSX.Element | null {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector((state: RootState) => state.user);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await axios.get(`${API_URL}/v1/users/${currentUser.id}/notifications`);
      console.log(response.data);
      setNotifications(response.data);
    }

    if (currentUser.id) {
      fetchNotifications();
    }
  }, [currentUser.id]);

  useEffect(() => {
    dispatch(setActivePage(Page.Notifications));
  }, []);

  if (!notifications) {
    return (
      <Grid
        style={{
          width: "100%",
          display: "flex",
          height: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 32,
          paddingTop: 32,
        }}
      >
        <ClipLoader loading={true} speedMultiplier={1.5} />
      </Grid>
    );
  }

  return (
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          width: 800,
          minHeight: `calc(100vh - 32px - ${MAIN_NAV_HEIGHT}px)`,
          marginTop: 16,
          borderRadius: 8,
          padding: 32,
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
        }}
      >
        <Grid container style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Notifications
          </Typography>

          <Box>
            <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2 }} onClick={() => setIsVisible(!isVisible)}>
              <MoreHorizontalLine fill={theme.palette.text.primary} height={28} width={28} />
            </button>
          </Box>
        </Grid>

        <Grid container style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "flex-start", marginTop: 16, flexWrap: "nowrap", height: "100%" }}>
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
