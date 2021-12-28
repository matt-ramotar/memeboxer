import { Box, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";
import { RootState } from "../../store";
import useTheme from "../../theme";
import { Meme, User } from "../../types";
import { API_URL, STORAGE_URL } from "../../util/secrets";

interface Props {
  meme: Meme;
}

export default function MemeSearchResult(props: Props): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.user);
  const searchInput = useSelector((state: RootState) => state.search.input);

  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("https://dropbox-appbox-static.s3.amazonaws.com/static/dropabout/img/nophoto.png");
  const [cardIsFocused, setCardIsFocused] = useState(false);

  useEffect(() => {
    async function fetchUserAsync() {
      const response = await axios.get(`${API_URL}/v1/users/${props.meme.userId}`);
      setUser(response.data);
    }

    fetchUserAsync();
  }, [props.meme.userId]);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  const isIn = (haystack: string | string[], needle: string | null) => {
    if (!needle) return false;

    if (typeof haystack == "string") return haystack.toLowerCase().includes(needle.toLowerCase());

    if (typeof haystack == "object") return haystack.find((word) => word.toLowerCase().includes(needle.toLowerCase()));
  };

  const showWords = (words: string | null) => (words && searchInput ? words.toLowerCase().includes(searchInput.toLowerCase()) : false);
  const addMarginLeft = (array: string[], item: string, currentIndex: number) => {
    if (currentIndex == 0 || !array) return false;

    const previousItem = array[currentIndex - 1];
    const lastCharacterPreviousItem = previousItem.slice(-1);
    return /\s/.test(lastCharacterPreviousItem);
  };

  if (!searchInput) return null;

  return (
    <Grid
      onMouseEnter={() => setCardIsFocused(true)}
      onMouseLeave={() => setCardIsFocused(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: cardIsFocused ? theme.palette.grey.A100 : theme.palette.background.paper,
        padding: 16,
        border: `1px solid ${theme.palette.grey.A200}`,
        borderRadius: 8,
        marginBottom: 8,
      }}
    >
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
        <img
          src={profilePicture}
          onError={() => setProfilePicture(`https://dropbox-appbox-static.s3.amazonaws.com/static/dropabout/img/nophoto.png`)}
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: 50, objectPosition: "center", objectFit: "cover" }}
        />

        <Typography variant="h6" style={{ fontWeight: "bold", marginLeft: 8 }}>
          {user?.username}
        </Typography>

        <Typography variant="body1" style={{ marginLeft: 8 }}>
          <ReactTimeAgo date={props.meme.created} />
        </Typography>
      </Box>

      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 16, cursor: "pointer" }} onClick={() => navigate(`/m/${props.meme._id}`)}>
        <img alt="meme" src={`${STORAGE_URL}/${props.meme.templateId}_${props.meme._id}`} style={{ width: 180, height: 180, borderRadius: 8, objectFit: "cover", objectPosition: "center" }} />
      </Box>

      <Box style={{ display: "flex", flexDirection: "column", borderLeft: `1px solid ${theme.palette.divider}`, paddingLeft: 16, marginTop: 16 }}>
        <Box style={{ display: props.meme.caption && isIn(props.meme.caption, searchInput) ? "flex" : "none" }}>
          <Typography>{props.meme.caption}</Typography>
        </Box>

        <Box style={{ flexDirection: "column" }}>
          {props.meme.text?.map((words: string) => {
            return (
              <Box key={words} style={{ display: showWords(words) ? "flex" : "none", flexDirection: "row", justifyContent: "flex-start", margin: 0 }}>
                {words
                  .toLowerCase()
                  .split(searchInput.toLowerCase() ?? "")
                  .map((item: string, index: number, array: string[]) => (
                    <Box key={item} style={{ marginLeft: addMarginLeft(array, item, index) ? 6 : 0 }}>
                      <Typography key={item} style={{ display: "flex", flexDirection: "row" }}>
                        {item.toLowerCase()}
                        <Typography style={{ fontWeight: "bold", display: index == array.length - 1 ? "none" : "flex", marginLeft: /\s/.test(item.slice(-1)) ? 6 : 0 }}>
                          {searchInput.toLowerCase()}
                        </Typography>
                      </Typography>
                    </Box>
                  ))}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
}
