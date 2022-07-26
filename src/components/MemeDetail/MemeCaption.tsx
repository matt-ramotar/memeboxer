import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GodMeme, User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { API_URL } from "../../util/secrets";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

interface Props {
  meme: GodMeme;
}

export default function MemeCaption(props: Props): JSX.Element | null {
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`${API_URL}/v1/users/${props.meme.user.id}`);
      setUser(response.data);
    }

    fetchUser();
  }, [props.meme.user]);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://app.dropboxer.net/appbox-media/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Box style={{ marginBottom: 12, position: "relative", display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
      <Box style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <ProfilePicture username={props.meme.user.username} />

        <Box style={{ marginLeft: 8 }}>
          <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate(`/${user.username}`)}>
            {user.username}
          </Typography>
          <Typography style={{ fontFamily: "Space Grotesk" }}>{props.meme.caption}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
