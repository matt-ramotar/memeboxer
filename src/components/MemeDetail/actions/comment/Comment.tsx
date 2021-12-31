import { useTheme } from "@material-ui/core";
import CommentLine from "../../../../assets/icons/CommentLine";
import { GodComment } from "../../../../types";

interface Props {
  comment: GodComment;
}

export default function AddComment(props: Props): JSX.Element {
  const theme = useTheme();

  return (
    <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}>
      <CommentLine fill={theme.palette.text.primary} height={32} width={32} />
    </button>
  );
}
