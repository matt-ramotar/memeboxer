import { Box, useTheme } from "@material-ui/core";
import { GodMeme } from "../../types";
import AddComment from "./AddComment";
import AddReaction from "./AddReaction";
import MoreInfo from "./MoreInfo";
import Upvote from "./Upvote";

interface Props {
  meme: GodMeme;
  isVisible: boolean;
}

export default function MemeUserActions(props: Props): JSX.Element {
  const theme = useTheme();

  return (
    <Box
      style={{
        display: "flex",
        padding: 8,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 10,
      }}
    >
      <AddReaction meme={props.meme} />

      <AddComment meme={props.meme} />

      <Upvote meme={props.meme} />

      <MoreInfo meme={props.meme} parentIsOpen={props.isVisible} />
    </Box>
  );
}
