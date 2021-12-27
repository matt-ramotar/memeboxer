import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NotificationFill from "../../assets/icons/NotificationFill";
import NotificationLine from "../../assets/icons/NotificationLine";
import UnreadNotifications from "../../components/Notification/UnreadNotifications";
import { RootState } from "../../store";
import { Page } from "../../store/view";

interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function NotificationButton(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activePage = useSelector((state: RootState) => state.view.activePage);

  const onClick = () => {
    navigate("/notifications");
  };
  return (
    <button
      onClick={onClick}
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {activePage === Page.Notifications ? (
        <Box style={{ position: "relative", display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
          <NotificationFill width={props.width} height={props.height} fill={props.fill} />

          <Box style={{ position: "absolute", top: -8, right: 0 }}>
            <UnreadNotifications />
          </Box>
        </Box>
      ) : (
        <Box style={{ position: "relative", display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
          <NotificationLine width={props.width} height={props.height} fill={props.fill} />

          <Box style={{ position: "absolute", top: -8, right: 0 }}>
            <UnreadNotifications />
          </Box>
        </Box>
      )}
    </button>
  );
}
