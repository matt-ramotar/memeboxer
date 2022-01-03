import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GodMeme } from "../../types";
import { API_URL } from "../../util/secrets";

interface Props {
  meme: GodMeme;
}

export default function Follow(props: Props): JSX.Element | null {
  const theme = useTheme();

  const currentUser = useSelector((state: RootState) => state.user);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [unfollowButtonIsFocused, setUnfollowButtonIsFocused] = useState(false);

  const onFollow = (userId: string, otherUserId: string) => {
    async function followUserAsync(userId: string, otherUserId: string) {
      const response = await axios.put(`${API_URL}/v1/users/${userId}/followers/${otherUserId}/follow`);

      setIsFollowing(true);
    }

    followUserAsync(userId, otherUserId);
  };

  const onUnfollow = (userId: string, otherUserId: string) => {
    async function unfollowUserAsync(userId: string, otherUserId: string) {
      const response = await axios.put(`${API_URL}/v1/users/${userId}/followers/${otherUserId}/unfollow`);

      setIsFollowing(false);
    }

    unfollowUserAsync(userId, otherUserId);
  };

  useEffect(() => {
    setIsCurrentUser(props.meme.user.id == currentUser.id);

    setIsFollowing(Boolean(currentUser.usersFollowingIds?.includes(props.meme.user.id)));
  }, [props.meme.user, currentUser]);

  if (!props.meme.user) return null;

  return (
    <Box>
      <Box style={{ display: !isCurrentUser && !isFollowing ? "flex" : "none" }}>
        <Typography variant="body1" style={{ fontWeight: "bold", cursor: "pointer", color: theme.palette.primary.main }} onClick={() => onFollow(props.meme.user.id, currentUser.id ?? "")}>
          Follow
        </Typography>
      </Box>

      <Box style={{ display: !isCurrentUser && isFollowing ? "flex" : "none" }} onMouseEnter={() => setUnfollowButtonIsFocused(true)} onMouseLeave={() => setUnfollowButtonIsFocused(false)}>
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", color: unfollowButtonIsFocused ? theme.palette.error.main : theme.palette.text.primary, cursor: "pointer" }}
          onClick={() => onUnfollow(props.meme.user.id, currentUser.id ?? "")}
        >
          {unfollowButtonIsFocused ? "Unfollow" : "Following"}
        </Typography>
      </Box>
    </Box>
  );
}
