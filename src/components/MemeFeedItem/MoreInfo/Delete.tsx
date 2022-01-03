import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { GodMeme } from "../../../types";
import { API_URL } from "../../../util/secrets";

interface Props {
  meme: GodMeme;
}

export default function Delete(props: Props): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const [isFocused, setIsFocused] = useState(false);

  const onClick = () => {
    async function deleteMemeAsync() {
      const meme = await axios.delete(`${API_URL}/v1/memes/${props.meme.id}`, { data: { userId: user.id, token: user.token } });
      if (meme) {
        window.location.reload();
      }
    }

    deleteMemeAsync();
  };

  return (
    <Box
      style={{
        width: "100%",

        height: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: isFocused ? theme.palette.grey.A100 : theme.palette.background.paper,
        color: theme.palette.error.main,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Typography style={{ fontFamily: "Space Grotesk" }}>Delete</Typography>
    </Box>
  );
}
