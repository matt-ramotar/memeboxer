import { Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import { API_URL } from "../../../util/secrets";
import UserPost from "./UserPost";

interface Props {
  userId: string;
}

export default function UserPosts(props: Props): JSX.Element | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUserAsync() {
      const response = await axios.get(`${API_URL}/v1/users/${props.userId}`);
      setUser(response.data);
    }

    fetchUserAsync();
  }, [props.userId]);

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
