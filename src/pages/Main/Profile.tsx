import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Divider from "../../components/Divider";
import UserPosts from "../../components/Profile/UserPosts";
import { RootState } from "../../store";
import { Page, setActivePage, setUsername } from "../../store/view";
import { User } from "../../types";
import { API_URL } from "../../util/secrets";

export default function Profile(): JSX.Element | null {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { username } = useParams();

  const currentUser = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("https://dropbox-appbox-static.s3.amazonaws.com/static/dropabout/img/nophoto.png");
  const [activeTab, setActiveTab] = useState(0);
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
    dispatch(setActivePage(Page.Profile));

    if (username) {
      dispatch(setUsername(username));
    }
  }, [username]);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`${API_URL}/v1/users/${username}`);
      setUser(response.data);
    }

    fetchUser();
  }, [username]);

  useEffect(() => {
    setIsCurrentUser(user?.id == currentUser.id);

    if (user) {
      setIsFollowing(Boolean(currentUser.usersFollowingIds?.includes(user?.id)));
    }
  }, [user, currentUser]);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  if (!user || !currentUser) return null;

  const renderSwitch = () => {
    switch (activeTab) {
      case 0:
        return <UserPosts userId={user.id} />;
      case 1:
        return <Typography>1</Typography>;
      case 2:
        return <Typography>2</Typography>;
    }
  };

  return (
    <Grid style={{ width: "100vw", minHeight: `calc(100vh - 100px)`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 32 }}>
      <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", width: 800 }}>
        <img
          src={profilePicture ?? ""}
          onError={() => setProfilePicture(`https://dropbox-appbox-static.s3.amazonaws.com/static/dropabout/img/nophoto.png`)}
          alt="avatar"
          style={{ height: 170, width: 170, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
        />
        <Grid style={{ marginLeft: 100, width: 300 }}>
          <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body1" style={{ color: theme.palette.grey[400] }}>{`@${user.username}`}</Typography>
            </Box>

            <Box style={{ display: isCurrentUser ? "flex" : "none" }}>
              <button style={{ backgroundColor: theme.palette.background.default, border: `1px solid ${theme.palette.divider}`, borderRadius: 4, padding: "4px 8px" }}>
                <Typography>Edit Profile</Typography>
              </button>
            </Box>

            <Box style={{ display: !isCurrentUser && !isFollowing ? "flex" : "none" }}>
              <button
                style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.paper, border: "none", borderRadius: 4, padding: "8px 32px", cursor: "pointer" }}
                onClick={() => onFollow(user.id, currentUser.id ?? "")}
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
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
                onClick={() => onUnfollow(user.id, currentUser.id ?? "")}
              >
                <Typography style={{ fontWeight: "bold", color: unfollowButtonIsFocused ? theme.palette.error.main : theme.palette.text.primary }}>
                  {unfollowButtonIsFocused ? "Unfollow" : "Following"}
                </Typography>
              </button>
            </Box>
          </Grid>
          <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
            <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography style={{ fontWeight: "bold" }}>{user.memeIds ? user.memeIds.length : 0}</Typography>
              <Typography style={{ marginLeft: 5 }}>{user.memeIds && user.memeIds.length == 1 ? "post" : "posts"}</Typography>
            </Grid>

            <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography style={{ fontWeight: "bold" }}>{user.usersFollowedByIds ? user.usersFollowedByIds.length : 0}</Typography>
              <Typography style={{ marginLeft: 5 }}>{user.usersFollowedByIds && user.usersFollowedByIds.length == 1 ? "follower" : "followers"}</Typography>
            </Grid>

            <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography style={{ fontWeight: "bold" }}>{user.usersFollowingIds ? user.usersFollowingIds.length : 0}</Typography>
              <Typography style={{ marginLeft: 5 }}>following</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ width: 800, minHeight: "100%", marginTop: 32, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", flexWrap: "nowrap" }}>
        <Divider />
        <Grid style={{ display: "flex", flexDirection: "row" }}>
          <Box style={{ margin: 16 }}>
            <Typography style={{ fontWeight: activeTab == 0 ? "bold" : "normal", cursor: "pointer" }} onClick={() => setActiveTab(0)}>
              Posts
            </Typography>
          </Box>

          <Box style={{ margin: 16 }}>
            <Typography style={{ fontWeight: activeTab == 1 ? "bold" : "normal", cursor: "pointer" }} onClick={() => setActiveTab(1)}>
              Reactions
            </Typography>
          </Box>

          <Box style={{ margin: 16 }}>
            <Typography style={{ fontWeight: activeTab == 2 ? "bold" : "normal", cursor: "pointer" }} onClick={() => setActiveTab(2)}>
              Comments
            </Typography>
          </Box>
        </Grid>
        <Grid style={{ width: "100%", height: "100%" }}>{renderSwitch()}</Grid>
      </Grid>
    </Grid>
  );
}
