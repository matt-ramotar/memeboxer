import { useTheme } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useDispatch, useSelector } from "react-redux";
import HeartLine from "../../assets/icons/HeartLine";
import { addMemeReaction, AddReactionInput } from "../../lib/meme";
import { RootState } from "../../store";
import { addMemeReaction as addMemeReactionRedux } from "../../store/feed";
import { GodMeme } from "../../types";

interface Props {
  meme: GodMeme;
}

const HEART_EMOJI = {
  native: "❤️",
  name: "Heavy Black Heart",
  colons: ":heart:",
  skin: null,
  isCustom: false,
};

const HEART_EMOJI_REACTION_ID = "61cb357227fc850016eca67a";

export default function Upvote(props: Props): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const addReaction = async (userId: string) => {
    const addReactionInput: AddReactionInput = { reactionId: HEART_EMOJI_REACTION_ID, userId: userId };

    const memeReaction = await addMemeReaction(props.meme.id, addReactionInput);
    dispatch(addMemeReactionRedux({ memeId: props.meme.id, memeReaction }));
  };

  const onClick = () => {
    if (user && user.id) addReaction(user.id);
  };

  return (
    <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }} onClick={onClick}>
      <HeartLine fill={theme.palette.text.primary} height={28} width={28} />
    </button>
  );
}
