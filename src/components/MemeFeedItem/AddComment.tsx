import { useTheme } from "@material-ui/core";
import { useNavigate } from "react-router";
import CommentLine from "../../assets/icons/CommentLine";
import { GodMeme } from "../../types";

interface Props {
  meme: GodMeme;
}

export default function AddComment(props: Props): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <button
      style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}
      onClick={() => navigate(`/m/${props.meme.id}`)}
    >
      <CommentLine fill={theme.palette.text.primary} height={28} width={28} />
    </button>
  );
}
