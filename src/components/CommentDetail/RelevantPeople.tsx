import { Grid, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import RelevantUser from "./RelevantUser";

interface Props {
  userIds: string[];
}

export default function RelevantPeople(props: Props): JSX.Element | null {
  const theme = useTheme();

  const [uniqueUserIds, setUniqueUserIds] = useState(Array.from(new Set(props.userIds)));

  useEffect(() => {
    setUniqueUserIds(Array.from(new Set(props.userIds)));
  }, [props.userIds]);

  if (!uniqueUserIds) return null;

  return (
    <Grid style={{ width: "100%", padding: 8, borderRadius: 8, backgroundColor: theme.palette.grey.A100 }}>
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        Relevant people
      </Typography>

      <Grid style={{ width: "100%" }}>
        {uniqueUserIds.map((userId) => (
          <Grid key={userId} style={{ width: "100%" }}>
            <RelevantUser userId={userId} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
