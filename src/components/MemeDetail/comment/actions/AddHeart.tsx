import { useTheme } from "@material-ui/core";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import HeartLine from "../../../../assets/icons/HeartLine";
import { RootState } from "../../../../store";
import { addCommentReactions } from "../../../../store/meme";
import { GodComment } from "../../../../types";
import { API_URL } from "../../../../util/secrets";

interface Props {
  comment: GodComment;
}

const HEART_EMOJI_REACTION_ID = "61cb357227fc850016eca67a";

export default function AddHeart(props: Props): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();

  const commentReactions = useSelector((state: RootState) => state.meme.commentReactions[props.comment.id]);
  const user = useSelector((state: RootState) => state.user);

  const addReaction = async (userId: string) => {
    const addCommentReactionInput = {
      reactionId: HEART_EMOJI_REACTION_ID,
      userId,
    };

    const response = await axios.post(`${API_URL}/v1/comments/${props.comment.id}/reactions`, addCommentReactionInput);

    const nextCommentReactions = commentReactions ? [...commentReactions] : [];

    if (response.data) {
      nextCommentReactions.push(response.data);
    }

    dispatch(addCommentReactions({ commentId: props.comment.id, commentReactions: nextCommentReactions }));
  };

  const onClick = (e: any) => {
    e.stopPropagation();
    if (user && user.id) addReaction(user.id);
  };

  return (
    <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }} onClick={onClick}>
      <HeartLine fill={theme.palette.text.primary} height={28} width={28} />
    </button>
  );
}
