import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { API_URL } from "../../util/secrets";

interface Props {
  userId?: string;
  username?: string;
  height?: number;
  width?: number;
  borderRadius?: number | string;
}

export default function ProfilePicture(props: Props): JSX.Element {
  const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (props.username) {
      setProfilePicture(`https://app.dropboxer.net/appbox-media/dropboxer-photos/${props.username}.jpg`);
    }
  }, [props.username]);

  useEffect(() => {
    async function fetchUserAsync(userId: string) {
      const response = await axios.get(`${API_URL}/v1/users/${userId}`);
      setUser(response.data);
    }

    if (props.userId && !props.username) fetchUserAsync(props.userId);
  }, [props.userId]);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://app.dropboxer.net/appbox-media/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  return (
    <img
      src={profilePicture ?? ""}
      onError={() => setProfilePicture(FALLBACK_AVATAR)}
      alt="avatar"
      style={{ height: props.height ?? 40, width: props.width ?? 40, borderRadius: props.borderRadius ?? "50%", objectFit: "cover", objectPosition: "center" }}
    />
  );
}
