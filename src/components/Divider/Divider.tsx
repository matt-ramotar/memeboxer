import { Box, useTheme } from "@material-ui/core";

export default function Divider(): JSX.Element {
  const theme = useTheme();
  return <Box style={{ backgroundColor: theme.palette.divider, height: 1, width: "100%", marginTop: 8, marginBottom: 8, visibility: "visible" }}></Box>;
}
