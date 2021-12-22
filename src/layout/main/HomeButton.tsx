import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { HomeFill } from "../../assets/icons/HomeFill";
import HomeLine from "../../assets/icons/HomeLine";
import { RootState } from "../../store";
import { Page, setActivePage } from "../../store/view";

interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function HomeButton(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activePage = useSelector((state: RootState) => state.view.activePage);
  const page = Page.Home;

  const onClick = () => {
    dispatch(setActivePage(page));
    navigate("/");
  };
  return (
    <button onClick={onClick} style={{ margin: 0, padding: 0, backgroundColor: "transparent", border: "none", boxShadow: "none", cursor: "pointer" }}>
      {activePage === page ? <HomeFill width={props.width} height={props.height} fill={props.fill} /> : <HomeLine width={props.width} height={props.height} fill={props.fill} />}
    </button>
  );
}
