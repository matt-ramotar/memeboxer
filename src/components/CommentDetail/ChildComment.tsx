import { Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { Comment, User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { API_URL } from "../../util/secrets";

interface Props {
  comment: Comment;
}

export default function ChildComment(props: Props): JSX.Element | null {
  const theme = useTheme();

  const [user, setUser] = useState<User | null>(null);

  const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`${API_URL}/v1/users/${props.comment.userId}`);
      setUser(response.data);
    }

    fetchUser();
  }, [props.comment.userId]);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <img
        src={profilePicture ?? ""}
        onError={() => setProfilePicture(FALLBACK_AVATAR)}
        alt="avatar"
        style={{ height: 40, width: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
      />

      <Grid style={{ display: "flex", flexDirection: "column" }}>
        <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography>{user.username}</Typography>
          <Typography>
            <ReactTimeAgo date={props.comment.created} />
          </Typography>
        </Grid>

        <Typography>{props.comment.body}</Typography>
      </Grid>
    </Grid>
  );
}
