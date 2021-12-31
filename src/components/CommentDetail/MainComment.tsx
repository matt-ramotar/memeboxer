import { Box, Typography } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import useTheme from "../../theme";
import { GodComment } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import Divider from "../Divider";
import MainCommentReactions from "./MainCommentReactions";
import MainCommentUserActions from "./MainCommentUserActions";
import Reply from "./Reply";

interface Props {
  comment: GodComment;
}

export default function MainComment(props: Props): JSX.Element | null {
  const theme = useTheme();

  const [profilePicture, setProfilePicture] = useState(FALLBACK_AVATAR);

  useEffect(() => {
    if (props.comment.user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${props.comment.user.username}.jpg`);
    }
  }, [props.comment.user]);
  return (
    <Box>
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img
          src={profilePicture ?? ""}
          onError={() => setProfilePicture(FALLBACK_AVATAR)}
          alt="avatar"
          style={{ height: 90, width: 90, borderRadius: "50%", objectFit: "cover", objectPosition: "center", marginLeft: -16 }}
        />
        <Box style={{ marginLeft: 16 }}>
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {props.comment?.user.name}
            </Typography>
          </Box>
          <Typography variant="body1" style={{ color: theme.palette.grey[500] }}>
            {`@${props.comment?.user.username}`}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" style={{ marginTop: 8 }}>
        {props.comment.body}
      </Typography>

      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <Typography variant="body2" style={{ color: theme.palette.grey[500] }}>
          {`${new Date(props.comment.created).toLocaleTimeString()}`}
        </Typography>

        <Typography variant="body2" style={{ color: theme.palette.grey[500], marginLeft: 8 }}>
          •
        </Typography>

        <Typography variant="body2" style={{ marginLeft: 8, color: theme.palette.grey[500] }}>
          {`${new Date(props.comment.created).toLocaleDateString()}`}
        </Typography>

        <Typography variant="body2" style={{ color: theme.palette.grey[500], marginLeft: 8 }}>
          •
        </Typography>

        <Typography variant="body2" style={{ marginLeft: 8, color: theme.palette.grey[500] }}>
          Memeboxer Web App
        </Typography>
      </Box>

      <Box style={{ marginTop: 16 }}>
        <MainCommentReactions comment={props.comment} />
      </Box>

      <Box style={{ marginTop: 16 }}>
        <Divider />
      </Box>

      <Box style={{ marginTop: 16 }}>
        <MainCommentUserActions comment={props.comment} />
      </Box>

      <Box style={{ marginTop: 16 }}>
        <Divider />
      </Box>

      <Box style={{ marginTop: 16 }}>
        <Reply comment={props.comment} />
      </Box>

      <Box style={{ marginTop: 16 }}>
        <Divider />
      </Box>
    </Box>
  );
}
