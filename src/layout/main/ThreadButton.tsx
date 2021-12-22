import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Twinkle2Fill from "../../assets/icons/Twinkle2Fill";
import Twinkle2Line from "../../assets/icons/Twinkle2Line";
import { RootState } from "../../store";
import { Page, setActivePage } from "../../store/view";

interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ThreadButton(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activePage = useSelector((state: RootState) => state.view.activePage);
  const page = Page.Threads;

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
      {activePage === page ? <Twinkle2Fill width={props.width} height={props.height} fill={props.fill} /> : <Twinkle2Line width={props.width} height={props.height} fill={props.fill} />}
    </button>
  );
}
