import { useTheme } from "@material-ui/core";
import MoreVerticalLine from "../../assets/icons/MoreVerticalLine";
import { GodMeme } from "../../types";

interface Props {
  meme: GodMeme;
}

export default function MoreInfo(props: Props): JSX.Element {
  const theme = useTheme();

  return (
    <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2 }}>
      <MoreVerticalLine fill={theme.palette.text.primary} height={28} width={28} />
    </button>
  );
}
