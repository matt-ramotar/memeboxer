import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NotificationFill from "../../assets/icons/NotificationFill";
import NotificationLine from "../../assets/icons/NotificationLine";
import { RootState } from "../../store";
import { Page, setActivePage } from "../../store/view";

interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function NotificationButton(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activePage = useSelector((state: RootState) => state.view.activePage);
  const page = Page.Notifications;

  const onClick = () => {
    dispatch(setActivePage(page));
    navigate("/");
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
      {activePage === page ? <NotificationFill width={props.width} height={props.height} fill={props.fill} /> : <NotificationLine width={props.width} height={props.height} fill={props.fill} />}
    </button>
  );
}
