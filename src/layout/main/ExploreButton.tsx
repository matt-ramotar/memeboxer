import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import GlobeFill from "../../assets/icons/GlobeFill";
import GlobeLine from "../../assets/icons/GlobeLine";
import { RootState } from "../../store";
import { Page, setActivePage } from "../../store/view";

interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ExploreButton(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activePage = useSelector((state: RootState) => state.view.activePage);
  const page = Page.Explore;

  const onClick = () => {
    dispatch(setActivePage(page));
    navigate("/explore");
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
      {activePage === page ? <GlobeFill width={props.width} height={props.height} fill={props.fill} /> : <GlobeLine width={props.width} height={props.height} fill={props.fill} />}
    </button>
  );
}
