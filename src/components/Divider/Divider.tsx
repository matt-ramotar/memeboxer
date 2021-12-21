import { useTheme } from "@material-ui/core";

export default function Divider(): JSX.Element {
  const theme = useTheme();
  return <div style={{ backgroundColor: theme.palette.divider, height: 2, width: "100%", marginTop: 8, marginBottom: 8, visibility: "visible", display: "flex" }}></div>;
}
