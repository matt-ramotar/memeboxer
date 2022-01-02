import { Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActionType, GodAction, Notification } from "../../types";
import { API_URL } from "../../util/secrets";
import FollowUserNotificationCard from "./FollowUserNotificationCard";
import MemeCommentNotificationCard from "./MemeCommentNotificationCard";
import MemeReactionNotificationCard from "./MemeReactionNotificationCard";

interface Props {
  notification: Notification;
}

export default function NotificationCard(props: Props): JSX.Element | null {
  const [godAction, setGodAction] = useState<GodAction | null>(null);
  const [isRead, setIsRead] = useState(props.notification.isRead);

  const renderSwitch = () => {
    if (!godAction) return null;

    switch (godAction.type) {
      case ActionType.AddCommentToMeme:
        return <MemeCommentNotificationCard notification={{ ...props.notification, isRead }} action={godAction} />;
      case ActionType.ReactToMeme:
        return <MemeReactionNotificationCard notification={{ ...props.notification, isRead }} action={godAction} />;
      case ActionType.FollowUser:
        return <FollowUserNotificationCard notification={{ ...props.notification, isRead }} action={godAction} />;
    }
  };

  useEffect(() => {
    async function fetchGodActionAsync() {
      const response = await axios.get(`${API_URL}/v1/actions/${props.notification.actionId}`);
      setGodAction(response.data);
    }

    fetchGodActionAsync();
  }, [props.notification.actionId]);

  useEffect(() => {
    console.log("notification card", props.notification.id, props.notification.isRead);
    setIsRead(props.notification.isRead);
  }, [props.notification.isRead]);

  if (!godAction) return null;

  return <Grid>{renderSwitch()}</Grid>;
}
