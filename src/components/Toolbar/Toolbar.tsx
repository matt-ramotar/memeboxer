import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoldLine from "../../assets/icons/BoldLine";
import ItalicLine from "../../assets/icons/ItalicLine";
import { RootState } from "../../store";
import { toggleColorPicker } from "../../store/view";
import ColorPicker from "./ColorPicker";

export default function Toolbar(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [color, setColor] = useState("#0160FE");

  const templateId = useSelector((state: RootState) => state.createMeme.templateId);
  const colorPickerIsVisible = useSelector((state: RootState) => state.view.colorPicker);

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

      <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Button variant="outlined" style={{ fontSize: 20, height: 40, border: `1px solid ${theme.palette.divider}`, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 }}>
          -
        </Button>
        <input
          type="text"
          value={24}
          style={{
            height: 40,
            padding: 0,
            fontSize: 20,

            margin: 0,
            border: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: 56,
          }}
        />
        <Button variant="outlined" style={{ fontSize: 20, height: 40, border: `1px solid ${theme.palette.divider}`, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }}>
          +
        </Button>
      </Grid>

      <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <button
          style={{
            backgroundColor: "transparent",
            padding: 4,

            boxShadow: "none",
            border: "none",
            fontSize: 20,
          }}
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
        >
          <ItalicLine fill="#262626" height={24} width={24} />
        </button>

        <ColorPicker />
      </Grid>
    </Grid>
  );
}
