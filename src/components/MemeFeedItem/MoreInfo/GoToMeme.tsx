import { Box, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { GodMeme } from "../../../types";

interface Props {
  meme: GodMeme;
}

export default function GoToMeme(props: Props): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);

  const onClick = () => {
    navigate(`/m/${props.meme.id}`);
  };

  return (
    <Box
      style={{
        width: "100%",
        borderBottom: `1px solid ${theme.palette.divider}`,
        height: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: isFocused ? theme.palette.grey.A100 : theme.palette.background.paper,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Typography style={{ fontFamily: "Space Grotesk" }}>Go to meme</Typography>
    </Box>
  );
}
