import { Grid, Popover, useTheme } from "@material-ui/core";
import axios from "axios";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiSmileLine from "../../assets/icons/EmojiSmileLine";
import { RootState } from "../../store";
import { GodMeme } from "../../types";
import { API_URL } from "../../util/secrets";

interface Props {
  meme: GodMeme;
}

export default function AddReaction(props: Props): JSX.Element {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const theme = useTheme();

  const addReaction = async (emoji: BaseEmoji) => {
    const upsertReactionInput = {
      native: emoji.native,
      name: emoji.name,
      colons: emoji.colons,
      skin: emoji.skin,
      isCustom: false,
    };

    const upsertReactionResponse = await axios.post(`${API_URL}/v1/reactions`, upsertReactionInput);

    const addMemeReactionInput = {
      reactionId: await upsertReactionResponse.data.id,
      userId: user.id,
    };

    await axios.post(`${API_URL}/v1/memes/${props.meme.id}/reactions`, addMemeReactionInput);
  };

  const [shouldShow, setShouldShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!shouldShow) {
      setAnchorEl(event.currentTarget);
      setShouldShow(true);
    } else {
      setShouldShow(false);
      setAnchorEl(null);
    }
  };

  const onClose = () => {
    setAnchorEl(null);
    setShouldShow(false);
  };

  const onPick = (emoji: BaseEmoji) => {
    addReaction(emoji);
    setShouldShow(false);
    setAnchorEl(null);
  };

  return (
    <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }} onClick={onClick}>
        <EmojiSmileLine fill={theme.palette.text.primary} height={28} width={28} />
      </button>

      <Popover
        open={shouldShow}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Picker showPreview={false} showSkinTones={false} onClick={onPick} color="primary" />
      </Popover>
    </Grid>
  );
}
