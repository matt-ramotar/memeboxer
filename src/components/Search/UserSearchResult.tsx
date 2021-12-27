import { Box, Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router";
import useTheme from "../../theme";
import { User } from "../../types";

interface Props {
  user: User;
}

export default function UserSearchResult(props: Props): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.palette.grey.A100,
        padding: 24,
        border: `1px solid ${theme.palette.grey.A200}`,
        borderRadius: 8,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/${props.user.username}`)}
    >
      <img src={props.user.picture} alt="avatar" style={{ width: 60, height: 60, borderRadius: 8 }} />

      <Box style={{ marginLeft: 24 }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {props.user.name}
        </Typography>
        <Typography variant="body1">{`@${props.user.username}`}</Typography>
      </Box>
    </Grid>
  );
}
