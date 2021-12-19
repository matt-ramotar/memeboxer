import { useDispatch, useSelector } from "react-redux";
import { AddCircleFill } from "../../assets/icons/AddCircleFill";
import { AddCircleLine } from "../../assets/icons/AddCircleLine";
import { RootState } from "../../store";
import { Page, setActivePage, toggleCreateTemplate } from "../../store/view";

interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function CreateButton(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const activePage = useSelector((state: RootState) => state.view.activePage);
  const page = Page.Create;

  const onClick = () => {
    dispatch(setActivePage(page));
    dispatch(toggleCreateTemplate());
  };

  return (
    <button onClick={onClick} style={{ margin: 0, padding: 0, backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
      {activePage === page ? <AddCircleFill width={props.width} height={props.height} fill={props.fill} /> : <AddCircleLine width={props.width} height={props.height} fill={props.fill} />}
    </button>
  );
}
