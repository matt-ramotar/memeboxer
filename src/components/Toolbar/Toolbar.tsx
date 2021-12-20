import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoldLine from "../../assets/icons/BoldLine";
import ItalicLine from "../../assets/icons/ItalicLine";
import { RootState } from "../../store";
import { setIsBold, setIsItalic } from "../../store/createMeme";
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

  const toggleColorPickerDispatcher = () => {
    dispatch(toggleColorPicker(!colorPickerIsVisible));
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
        paddingLeft: 8,
        paddingRight: 8,
      }}
    >
      <Button variant="outlined" style={{ fontSize: 20, height: 40, border: `1px solid ${theme.palette.divider}`, textTransform: "none" }}>
        <Typography variant="body1" style={{ fontFamily: "roboto", fontSize: 20, padding: 0 }}>
          roboto
        </Typography>

        <FontAwesomeIcon icon={faCaretDown} style={{ fontSize: 20, marginLeft: 4 }} />
      </Button>

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
          onClick={() => dispatch(setIsBold(!realComponent.style.isBold))}
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
          onClick={() => dispatch(setIsItalic(!realComponent.style.isItalic))}
        >
          <ItalicLine fill="#262626" height={24} width={24} />
        </button>

        <ColorPicker />
      </Grid>
    </Grid>
  );
}
