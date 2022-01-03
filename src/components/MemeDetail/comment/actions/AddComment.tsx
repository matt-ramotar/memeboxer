import { useTheme } from "@material-ui/core";
import { useNavigate } from "react-router";
import CommentLine from "../../../../assets/icons/CommentLine";
import { GodComment } from "../../../../types";

interface Props {
  comment: GodComment;
}

export default function AddComment(props: Props): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const onClick = (e: any) => {
    e.stopPropagation();
    navigate(`/c/${props.comment.id}`);
  };

  return (
    <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }} onClick={onClick}>
      <CommentLine fill={theme.palette.text.primary} height={28} width={28} />
    </button>
  );
}
