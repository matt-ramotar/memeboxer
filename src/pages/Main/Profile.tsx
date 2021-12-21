import { Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store";
import { User } from "../../types";

const rootUrl = "http://localhost:5000";

export default function Profile(): JSX.Element | null {
  const theme = useTheme();
  const { userId } = useParams();

  const currentUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`${rootUrl}/v1/users/${userId}`);
      setUser(response.data);
    }

    fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <Grid style={{ width: "100vw", height: `calc(100vh - 100px)`, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", width: 800 }}>
        <img
          src={`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`}
          alt="avatar"
          style={{ height: 170, width: 170, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
        />
        <Grid style={{ marginLeft: 100, width: 300 }}>
          <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6">{user.name}</Typography>

            <button style={{ backgroundColor: theme.palette.background.default, border: `1px solid ${theme.palette.divider}`, borderRadius: 4, padding: "4px 8px" }}>
              <Typography>Edit Profile</Typography>
            </button>
          </Grid>
          <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
            <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography>0</Typography>
              <Typography style={{ marginLeft: 5 }}>posts</Typography>
            </Grid>

            <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography>0</Typography>
              <Typography style={{ marginLeft: 5 }}>posts</Typography>
            </Grid>

            <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography>0</Typography>
              <Typography style={{ marginLeft: 5 }}>posts</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Typography>Tab panels</Typography>
      </Grid>
    </Grid>
  );
}
