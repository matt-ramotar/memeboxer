import { Box, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store";
import useTheme from "../../theme";
import { User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { API_URL } from "../../util/secrets";

interface Props {
  user: User;
}

export default function UserSearchResult(props: Props): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const currentUser = useSelector((state: RootState) => state.user);
  const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);
  const [numFollowers, setNumFollowers] = useState(props.user.usersFollowedByIds?.length ?? 0);
  const [unfollowButtonIsFocused, setUnfollowButtonIsFocused] = useState(false);
  const [cardIsFocused, setCardIsFocused] = useState(false);

  const onFollow = (userId: string, otherUserId: string) => {
    async function followUserAsync(userId: string, otherUserId: string) {
      const response = await axios.put(`${API_URL}/v1/users/${userId}/followers/${otherUserId}/follow`);

      setIsFollowing(true);
      setNumFollowers(numFollowers + 1);
    }

    followUserAsync(userId, otherUserId);
  };

  const onUnfollow = (userId: string, otherUserId: string) => {
    async function unfollowUserAsync(userId: string, otherUserId: string) {
      const response = await axios.put(`${API_URL}/v1/users/${userId}/followers/${otherUserId}/unfollow`);

      setIsFollowing(false);
      setNumFollowers(numFollowers - 1);
    }

    unfollowUserAsync(userId, otherUserId);
  };

  useEffect(() => {
    setIsCurrentUser(props.user._id == currentUser.id);

    if (props.user._id) {
      setIsFollowing(Boolean(currentUser.usersFollowingIds?.includes(props.user._id)));
    }
  }, [props.user, currentUser]);

  useEffect(() => {
    if (props.user) {
      setProfilePicture(`https://app.dropboxer.net/appbox-media/dropboxer-photos/${props.user.username}.jpg`);
    }

    if (props.user.usersFollowedByIds) {
      setNumFollowers(props.user.usersFollowedByIds.length);
    }
  }, [props.user]);

  return (
    <Grid
      onMouseEnter={() => setCardIsFocused(true)}
      onMouseLeave={() => setCardIsFocused(false)}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: cardIsFocused ? theme.palette.grey.A100 : theme.palette.background.paper,
        padding: 16,
        border: `1px solid ${theme.palette.grey.A200}`,
        borderRadius: 8,
        marginBottom: 8,
      }}
    >
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={profilePicture} onError={() => setProfilePicture(FALLBACK_AVATAR)} alt="avatar" style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", objectPosition: "center" }} />

        <Box style={{ marginLeft: 24 }}>
          <Typography variant="h6" style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate(`/${props.user.username}`)}>
            {props.user.name}
          </Typography>

          <Typography variant="body1" style={{ cursor: "pointer" }} onClick={() => navigate(`/${props.user.username}`)}>{`@${props.user.username}`}</Typography>

          <Box style={{ display: "flex", flexDirection: "row", marginTop: 4 }}>
            <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
              <Typography style={{ marginRight: 4 }}>{props.user.memeIds ? props.user.memeIds.length : 0}</Typography>
              <Typography>posts</Typography>
            </Box>

            <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
              <Typography style={{ marginRight: 4 }}>{numFollowers}</Typography>
              <Typography>{numFollowers == 1 ? "follower" : "followers"}</Typography>
            </Box>

            <Box style={{ display: "flex", flexDirection: "row", marginRight: 8 }}>
              <Typography style={{ marginRight: 4 }}>{props.user.usersFollowingIds ? props.user.usersFollowingIds.length : 0}</Typography>
              <Typography>following</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box style={{ display: isCurrentUser ? "flex" : "none" }}>
        <button
          style={{ backgroundColor: theme.palette.primary.main, opacity: 0.4, color: theme.palette.background.paper, border: "none", borderRadius: 4, padding: "8px 32px" }}
          onClick={() => onFollow(props.user.id, currentUser.id ?? "")}
        >
          <Typography style={{ fontWeight: "bold" }}>Follow</Typography>
        </button>
      </Box>

      <Box style={{ display: !isCurrentUser && !isFollowing ? "flex" : "none" }}>
        <button
          style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.paper, border: "none", borderRadius: 4, padding: "8px 32px", cursor: "pointer" }}
          onClick={() => onFollow(props.user._id ?? "", currentUser.id ?? "")}
        >
          <Typography style={{ fontWeight: "bold" }}>Follow</Typography>
        </button>
      </Box>

      <Box style={{ display: !isCurrentUser && isFollowing ? "flex" : "none" }} onMouseEnter={() => setUnfollowButtonIsFocused(true)} onMouseLeave={() => setUnfollowButtonIsFocused(false)}>
        <button
          style={{
            backgroundColor: theme.palette.background.default,
            border: unfollowButtonIsFocused ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
            padding: "8px 32px",
            cursor: "pointer",
          }}
          onClick={() => onUnfollow(props.user._id ?? "", currentUser.id ?? "")}
        >
          <Typography style={{ fontWeight: "bold", color: unfollowButtonIsFocused ? theme.palette.error.main : theme.palette.text.primary }}>
            {unfollowButtonIsFocused ? "Unfollow" : "Following"}
          </Typography>
        </button>
      </Box>
    </Grid>
  );
}
