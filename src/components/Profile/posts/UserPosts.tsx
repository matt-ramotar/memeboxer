import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import UserPost from "./UserPost";

interface Props {
  user: User;
}

export default function UserPosts(props: Props): JSX.Element | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  if (!user) return null;

  return (
    <Grid container spacing={2} style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
      {user.memeIds?.map((memeId) => (
        <Grid item xs={4} key={memeId} style={{ display: "flex", maxHeight: "100%", maxWidth: "100%" }}>
          <UserPost memeId={memeId} />
        </Grid>
      ))}
    </Grid>
  );
}
