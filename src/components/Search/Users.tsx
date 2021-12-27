import { Grid } from "@material-ui/core";
import { User } from "../../types";
import UserSearchResult from "./UserSearchResult";

interface Props {
  users: User[];
}

export default function Users(props: Props): JSX.Element {
  return (
    <Grid container style={{ width: "100%", height: "100%" }}>
      {props.users.map((user) => (
        <UserSearchResult key={user.id} user={user} />
      ))}
    </Grid>
  );
}
