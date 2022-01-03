import { Box, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOverrideFromChild } from "../../../store/feed";
import { GodMeme } from "../../../types";

interface Props {
  meme: GodMeme;
}

export default function CopyLink(props: Props): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(`https://www.memeboxer.com/m/${props.meme.id}`);
    dispatch(setOverrideFromChild(true));
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
        backgroundColor: isFocused ? theme.palette.grey.A100 : theme.palette.background.paper,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Typography style={{ fontFamily: "Space Grotesk" }}>Copy link</Typography>
    </Box>
  );
}
