import { useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CustomizeLine from "../../assets/icons/CustomizeLine";
import { RootState } from "../../store";
import { toggleColorPicker } from "../../store/view";

export default function ColorPicker(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();

  const activeComponent = useSelector((state: RootState) => state.createMeme.activeComponent);
  const color = useSelector((state: RootState) => state.view.lastColorPicked);
  const colorPickerIsVisible = useSelector((state: RootState) => state.view.colorPicker);

  const toggleColorPickerDispatcher = () => {
    dispatch(toggleColorPicker(!colorPickerIsVisible));
  };

  return (
    <button
      style={{
        backgroundColor: "transparent",
        padding: 4,
        boxShadow: "none",
        border: "none",
        fontSize: 20,
      }}
      onClick={toggleColorPickerDispatcher}
    >
      <CustomizeLine fill={color ?? "#0160FE"} height={24} width={24} />
    </button>
  );
}
