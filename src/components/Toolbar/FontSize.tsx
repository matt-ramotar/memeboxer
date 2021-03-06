import { Button, Grid, useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setFontSize } from "../../store/createMeme";
import { setLastFontSize } from "../../store/theme";

export default function FontSize(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();

  const activeComponent = useSelector((state: RootState) => state.createMeme.activeComponent);
  const realComponent = useSelector((state: RootState) => state.createMeme.componentMap[activeComponent ?? ""]);

  const onChange = (e: any) => {
    const nextFontSize = parseInt(e.target.value) || 0;
    dispatch(setFontSize(nextFontSize));
    dispatch(setLastFontSize(nextFontSize));
  };

  const decrementFontSize = () => {
    const nextFontSize = Math.max(realComponent.style.fontSize - 4, 0);
    dispatch(setFontSize(nextFontSize));
    dispatch(setLastFontSize(nextFontSize));
  };

  const incrementFontSize = () => {
    const nextFontSize = Math.min(realComponent.style.fontSize + 4, 250);
    dispatch(setFontSize(nextFontSize));
    dispatch(setLastFontSize(nextFontSize));
  };

  return (
    <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Button
        variant="outlined"
        style={{ fontSize: 20, height: 40, border: `1px solid ${theme.palette.divider}`, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 }}
        onClick={decrementFontSize}
      >
        -
      </Button>
      <input
        onChange={onChange}
        type="text"
        value={realComponent?.style.fontSize ?? 40}
        style={{
          height: 40,
          padding: 0,
          fontSize: 20,
          fontFamily: "Space Grotesk",
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
      <Button
        variant="outlined"
        style={{ fontSize: 20, width: 30, height: 40, border: `1px solid ${theme.palette.divider}`, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }}
        onClick={incrementFontSize}
      >
        +
      </Button>
    </Grid>
  );
}
