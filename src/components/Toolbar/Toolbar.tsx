import { Grid, MenuItem, Select, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoldLine from "../../assets/icons/BoldLine";
import ItalicLine from "../../assets/icons/ItalicLine";
import { RootState } from "../../store";
import { setFontFamily, setIsBold, setIsItalic } from "../../store/createMeme";
import { setLastFontFamilyPicked, setLastIsBold, setLastIsItalic } from "../../store/theme";
import { toggleColorPicker } from "../../store/view";
import ColorPicker from "./ColorPicker";
import FontSize from "./FontSize";

export default function Toolbar(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [color, setColor] = useState("#0160FE");

  const templateId = useSelector((state: RootState) => state.createMeme.templateId);
  const colorPickerIsVisible = useSelector((state: RootState) => state.view.colorPicker);

  const activeComponent = useSelector((state: RootState) => state.createMeme.activeComponent);
  const realComponent = useSelector((state: RootState) => state.createMeme.componentMap[activeComponent ?? ""]);

  const lastFontFamilyPicked = useSelector((state: RootState) => state.theme.lastFontFamilyPicked);

  const toggleColorPickerDispatcher = () => {
    dispatch(toggleColorPicker(!colorPickerIsVisible));
  };

  const handleFontFamilyChange = (e: any) => {
    dispatch(setFontFamily(e.target.value as string));
    dispatch(setLastFontFamilyPicked(e.target.value as string));
  };
  const handleIsBoldChange = () => {
    dispatch(setIsBold(!realComponent.style.isBold));
    dispatch(setLastIsBold(!realComponent.style.isBold));
  };

  const handleIsItalicChange = () => {
    dispatch(setIsItalic(!realComponent.style.isItalic));
    dispatch(setLastIsItalic(!realComponent.style.isItalic));
  };

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "10px solid black",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Select
        variant="outlined"
        value={realComponent?.style.fontFamily ?? lastFontFamilyPicked}
        onChange={handleFontFamilyChange}
        defaultValue={"Impact"}
        MenuProps={MenuProps}
        style={{ height: 40, width: 100 }}
      >
        <MenuItem value="Impact">
          <Typography style={{ fontFamily: "Impact" }}>Impact</Typography>
        </MenuItem>
        <MenuItem value="Roboto">
          <Typography style={{ fontFamily: "Roboto" }}>Roboto</Typography>
        </MenuItem>
      </Select>

      <FontSize />

      <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <button
          style={{
            backgroundColor: "transparent",
            padding: 4,

            boxShadow: "none",
            border: "none",
            fontSize: 20,
          }}
          onClick={handleIsBoldChange}
        >
          <BoldLine fill="#262626" height={24} width={24} />
        </button>

        <button
          style={{
            backgroundColor: "transparent",
            padding: 4,

            boxShadow: "none",
            border: "none",
            fontSize: 20,
          }}
          onClick={handleIsItalicChange}
        >
          <ItalicLine fill="#262626" height={24} width={24} />
        </button>

        <ColorPicker />
      </Grid>
    </Grid>
  );
}
