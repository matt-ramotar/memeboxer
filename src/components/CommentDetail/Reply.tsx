import { Grid, TextField, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GodComment } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";

interface Props {
  comment: GodComment;
}

export default function Reply(props: Props): JSX.Element {
  const theme = useTheme();

  const user = useSelector((state: RootState) => state.user);

  const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);
  const [isFocused, setIsFocused] = useState(false);
  const [reply, setReply] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${user.username}.jpg`);
    }
  }, [user]);

  if (isFocused || reply) {
    return (
      <Grid container style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Grid container style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
          <Grid item style={{ marginRight: 16 }}>
            <img
              src={profilePicture ?? ""}
              onError={() => setProfilePicture(FALLBACK_AVATAR)}
              alt="avatar"
              style={{ height: 60, width: 60, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
            />
          </Grid>

          <TextField
            multiline
            placeholder="Type your reply"
            InputProps={{ disableUnderline: true }}
            inputProps={{ style: { fontSize: 18 } }}
            style={{ width: "100%" }}
            onClick={() => setIsFocused(true)}
            onChange={(e) => setReply(e.target.value)}
            onBlur={() => setIsFocused(false)}
            value={reply}
          />
        </Grid>

        <Grid item style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
          <button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.paper, border: "none", borderRadius: 4, padding: "8px 32px", cursor: "pointer" }}>
            <Typography style={{ fontWeight: "bold" }}>Reply</Typography>
          </button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "nowrap" }}>
      <Grid item style={{ marginRight: 16 }}>
        <img
          src={profilePicture ?? ""}
          onError={() => setProfilePicture(FALLBACK_AVATAR)}
          alt="avatar"
          style={{ height: 60, width: 60, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
        />
      </Grid>

      <TextField
        multiline
        placeholder="Type your reply"
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { fontSize: 18 } }}
        style={{ width: "100%" }}
        onClick={() => setIsFocused(true)}
      />

      <Grid item>
        <button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.paper, opacity: 0.4, border: "none", borderRadius: 4, padding: "8px 32px", cursor: "pointer" }}>
          <Typography style={{ fontWeight: "bold" }}>Reply</Typography>
        </button>
      </Grid>
    </Grid>
  );
}
