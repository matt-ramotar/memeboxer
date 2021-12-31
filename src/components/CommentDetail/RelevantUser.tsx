import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGodUser } from "../../lib/user";
import { RootState } from "../../store";
import { GodUser } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { API_URL } from "../../util/secrets";

interface Props {
  userId: string;
}

export default function RelevantUser(props: Props): JSX.Element | null {
  const theme = useTheme();

  const currentUser = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState<GodUser | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [profilePicture, setProfilePicture] = useState(FALLBACK_AVATAR);
  const [unfollowButtonIsFocused, setUnfollowButtonIsFocused] = useState(false);

  const onFollow = (userId: string, otherUserId: string) => {
    async function followUserAsync(userId: string, otherUserId: string) {
      const response = await axios.put(`${API_URL}/v1/users/${userId}/followers/${otherUserId}/follow`);
      setUser(response.data);
      setIsFollowing(true);
    }

    followUserAsync(userId, otherUserId);
  };

  const onUnfollow = (userId: string, otherUserId: string) => {
    async function unfollowUserAsync(userId: string, otherUserId: string) {
      const response = await axios.put(`${API_URL}/v1/users/${userId}/followers/${otherUserId}/unfollow`);
      setUser(response.data);
      setIsFollowing(false);
    }

    unfollowUserAsync(userId, otherUserId);
  };

  useEffect(() => {
    async function getRelevantUserAsync() {
      const response = await getGodUser(props.userId);
      setUser(response);
    }

    getRelevantUserAsync();
  }, [props.userId]);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  useEffect(() => {
    setIsCurrentUser(user?.id == currentUser.id);

    if (user) {
      setIsFollowing(Boolean(currentUser.usersFollowingIds?.includes(user?.id)));
    }
  }, [user, currentUser]);

  if (!user) return null;

  return (
    <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img
          src={profilePicture ?? ""}
          onError={() => setProfilePicture(FALLBACK_AVATAR)}
          alt="avatar"
          style={{ height: 40, width: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
        />

        <Grid style={{ display: "flex", flexDirection: "column", marginLeft: 8 }}>
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="body2">{`@${user.username}`}</Typography>

          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
              <Typography variant="caption" style={{ marginRight: 4 }}>
                {user.memes ? user.memes.length : 0}
              </Typography>
              <Typography variant="caption">{user.memes?.length == 1 ? "post" : "posts"}</Typography>
            </Box>

            <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
              <Typography variant="caption" style={{ marginRight: 4 }}>
                {user.usersFollowedBy ? user.usersFollowedBy.length : 0}
              </Typography>
              <Typography variant="caption">{user.usersFollowedBy?.length == 1 ? "follower" : "followers"}</Typography>
            </Box>

            <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
              <Typography variant="caption" style={{ marginRight: 4 }}>
                {user.usersFollowing ? user.usersFollowing.length : 0}
              </Typography>
              <Typography variant="caption">following</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box style={{ display: !isCurrentUser && !isFollowing ? "flex" : "none" }}>
        <button
          style={{ backgroundColor: theme.palette.text.primary, color: theme.palette.background.paper, border: "none", borderRadius: 4, padding: 4, margin: 0, cursor: "pointer", height: 40 }}
          onClick={() => onFollow(user.id, currentUser.id ?? "")}
        >
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            Follow
          </Typography>
        </button>
      </Box>

      <Box style={{ display: !isCurrentUser && !isFollowing ? "flex" : "none" }} onMouseEnter={() => setUnfollowButtonIsFocused(true)} onMouseLeave={() => setUnfollowButtonIsFocused(false)}>
        <button
          style={{
            backgroundColor: theme.palette.background.default,
            border: unfollowButtonIsFocused ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
            height: 40,
            padding: 4,
            margin: 0,
            cursor: "pointer",
          }}
          onClick={() => onUnfollow(user.id, currentUser.id ?? "")}
        >
          <Typography variant="body2" style={{ fontWeight: "bold", color: unfollowButtonIsFocused ? theme.palette.error.main : theme.palette.text.primary }}>
            {unfollowButtonIsFocused ? "Unfollow" : "Following"}
          </Typography>
        </button>
      </Box>
    </Grid>
  );
}
