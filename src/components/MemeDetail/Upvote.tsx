import { useTheme } from "@material-ui/core";
import HeartLine from "../../assets/icons/HeartLine";
import { GodComment } from "../../types";

interface Props {
  comment: GodComment;
}

export default function Upvote(props: Props): JSX.Element {
  const theme = useTheme();

  return (
    <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}>
      <HeartLine fill={theme.palette.text.primary} height={28} width={28} />
    </button>
  );
}
