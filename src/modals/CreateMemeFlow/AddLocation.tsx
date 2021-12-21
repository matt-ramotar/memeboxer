import { Box, Typography, useTheme } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import CompassLine from "../../assets/icons/CompassLine";

export default function AddLocation(): JSX.Element | null {
  const theme = useTheme();

  return (
    <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: 60, overflowY: "scroll", alignItems: "flex-start", width: "100%" }}>
      <Typography style={{ fontFamily: "Space Grotesk", color: theme.palette.text.primary, opacity: 0.4 }}>Add location</Typography>
      <CompassLine width={24} height={24} fill={theme.palette.primary.main} />
    </Box>
  );
}
