import { Box } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { API_URL } from "../../util/secrets";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

interface Props {
  userId: string;
}

export default function CommenterSquare(props: Props): JSX.Element | null {
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
    <Box>
      <ProfilePicture username={user.username} height={32} width={32} borderRadius={8} />
    </Box>
  );
}
