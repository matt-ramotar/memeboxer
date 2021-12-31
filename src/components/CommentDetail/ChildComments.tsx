import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GodComment } from "../../types";

interface Props {
  comment: GodComment;
}

export default function ChildComments(props: Props): JSX.Element | null {
  const childComments = useSelector((state: RootState) => state.comment.children);

  if (!childComments) return null;

  return (
    <Grid>
      {childComments.map((childComment) => (
        <Grid key={childComment.id}>
          <Typography>{childComment.body}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
