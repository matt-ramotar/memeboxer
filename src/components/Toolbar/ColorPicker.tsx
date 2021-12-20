import { useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CustomizeLine from "../../assets/icons/CustomizeLine";
import { RootState } from "../../store";
import { toggleColorPicker } from "../../store/view";

export default function ColorPicker(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();

  const activeComponent = useSelector((state: RootState) => state.createMeme.activeComponent);
  const color = useSelector((state: RootState) => state.createMeme.componentMap[activeComponent ?? ""]?.style?.color);

  const toggleColorPickerDispatcher = () => {
    dispatch(toggleColorPicker());
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
      onClick={toggleColorPicker}
    >
      <CustomizeLine fill={color ?? "#0160FE"} height={24} width={24} />
    </button>
  );
}
