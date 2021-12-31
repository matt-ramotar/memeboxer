import { Grid, Popover, useTheme } from "@material-ui/core";
import axios from "axios";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiAddLine from "../../assets/icons/EmojiAddLine";
import { RootState } from "../../store";
import { setReactions } from "../../store/comment";
import { GodComment } from "../../types";
import { API_URL } from "../../util/secrets";

interface Props {
  comment: GodComment;
}

export default function AddReaction(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();

  const user = useSelector((state: RootState) => state.user);
  const commentReactions = useSelector((state: RootState) => state.comment.reactions);

  const addReaction = async (emoji: BaseEmoji) => {
    const upsertReactionInput = {
      native: emoji.native,
      name: emoji.name,
      colons: emoji.colons,
      skin: emoji.skin,
      isCustom: false,
    };

    const upsertReactionResponse = await axios.post(`${API_URL}/v1/reactions`, upsertReactionInput);

    const addCommentReactionInput = {
      reactionId: await upsertReactionResponse.data.id,
      userId: user.id,
    };

    const response = await axios.post(`${API_URL}/v1/comments/${props.comment.id}/reactions`, addCommentReactionInput);

    const nextCommentReactions = commentReactions ? [...commentReactions] : [];

    if (response.data) {
      nextCommentReactions.push(response.data);
    }

    dispatch(setReactions(nextCommentReactions));
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
        <EmojiAddLine fill={theme.palette.text.primary} height={32} width={32} />
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
