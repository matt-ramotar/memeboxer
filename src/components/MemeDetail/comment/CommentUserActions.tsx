import { Box, useTheme } from "@material-ui/core";
import { GodComment } from "../../../types";
import AddComment from "./actions/AddComment";
import AddHeart from "./actions/AddHeart";
import AddReaction from "./actions/AddReaction";
import CommentMoreInfo from "./actions/CommentMoreInfo";

interface Props {
  comment: GodComment;
  isVisible: boolean;
}

export default function CommentUserActions(props: Props): JSX.Element {
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
      <AddReaction comment={props.comment} />

      <AddComment comment={props.comment} />

      <AddHeart comment={props.comment} />

      <CommentMoreInfo comment={props.comment} parentIsOpen={props.isVisible} />
    </Box>
  );
}
