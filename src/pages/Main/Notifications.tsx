import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import MoreHorizontalLine from "../../assets/icons/MoreHorizontalLine";
import MarkAllRead from "../../components/MoreInfo/notifications/MarkAllRead";
import NotificationCard from "../../components/Notification/NotificationCard";
import { RootState } from "../../store";
import { setOverrideFromChild } from "../../store/notification";
import { Page, setActivePage } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { Notification } from "../../types";
import { API_URL } from "../../util/secrets";

export default function Notifications(): JSX.Element | null {
  const theme = useTheme();
  const dispatch = useDispatch();

  const lastUpdated = useSelector((state: RootState) => state.notification.lastUpdated);
  const overrideFromChild = useSelector((state: RootState) => state.notification.overrideFromChild);

  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector((state: RootState) => state.user);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      console.log("fetching notifications", new Date());
      const response = await axios.get(`${API_URL}/v1/users/${currentUser.id}/notifications`);
      console.log("fetched notifications", response.data);

      setNotifications([...response.data]);
    }

    if (currentUser.id) {
      fetchNotifications();
    }
  }, [currentUser.id, lastUpdated]);

  useEffect(() => {
    dispatch(setActivePage(Page.Notifications));
  }, []);

  useEffect(() => {
    if (overrideFromChild) setIsVisible(false);
  }, [overrideFromChild]);

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
            {overrideFromChild ? (
              <ClipLoader size={20} color={theme.palette.text.primary} />
            ) : (
              <Box style={{ position: "relative" }}>
                <button
                  style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2 }}
                  onClick={() => {
                    setIsVisible(!isVisible);
                    dispatch(setOverrideFromChild(false));
                  }}
                >
                  <MoreHorizontalLine fill={theme.palette.text.primary} height={28} width={28} />
                </button>

                <Box
                  style={{
                    display: isVisible && !overrideFromChild ? "flex" : "none",
                    position: "absolute",
                    top: 32,
                    right: 0,

                    width: 200,
                    flexWrap: "nowrap",
                    flexDirection: "column",
                    justifyContent: "flex-start",

                    borderRadius: 4,
                    boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
                  }}
                >
                  <MarkAllRead />
                </Box>
              </Box>
            )}
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
