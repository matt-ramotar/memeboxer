import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GodComment } from "../../types";
import ChildComment from "./ChildComment";

interface Props {
  comment: GodComment;
}

export default function ChildComments(props: Props): JSX.Element | null {
  const theme = useTheme();

  const childComments = useSelector((state: RootState) => state.comment.children);

  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (childComments && childComments.length > 0) setShouldShow(true);
    else setShouldShow(false);
  }, [childComments]);

  if (!childComments) return null;

  return (
    <Grid style={{ display: shouldShow ? "flex" : "none", flexDirection: "column", padding: 8, border: `1px solid ${theme.palette.grey.A100}`, borderRadius: 8 }}>
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        Replies
      </Typography>

      <Box style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {childComments.map((childComment) => (
          <Grid key={childComment.id} style={{ marginBottom: 8 }}>
            <ChildComment comment={childComment} />
          </Grid>
        ))}
      </Box>
    </Grid>
  );
}
