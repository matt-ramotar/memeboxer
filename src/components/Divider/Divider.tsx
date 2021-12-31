import { useTheme } from "@material-ui/core";

export default function Divider(): JSX.Element {
  const theme = useTheme();
  return <div style={{ backgroundColor: theme.palette.grey.A200, height: 1, width: "100%", marginTop: 8, marginBottom: 8, visibility: "visible", display: "flex" }}></div>;
}
