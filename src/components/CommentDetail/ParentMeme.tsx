import { Box, Typography } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import useTheme from "../../theme";
import { GodMeme } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { STORAGE_URL } from "../../util/secrets";

interface Props {
  meme: GodMeme;
}

export default function ParentMeme(props: Props): JSX.Element | null {
  const theme = useTheme();

  const [profilePicture, setProfilePicture] = useState(FALLBACK_AVATAR);
  const [memeImage, setMemeImage] = useState<HTMLImageElement | null>(null);
  const [memeImageHeight, setMemeImageHeight] = useState<number | null>(null);

  const onLoad = () => {
    const node = document.getElementById("parent-meme") as HTMLImageElement;

    if (node) {
      setMemeImageHeight(node.height);
    }
  };

  useEffect(() => {
    if (props.meme) {
      const memeImage = new Image();
      memeImage.src = `${STORAGE_URL}/${props.meme.template.id}_${props.meme.id}`;
      setMemeImage(memeImage);
    }
  }, [props.meme]);

  useEffect(() => {
    if (props.meme.user) {
      setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${props.meme.user.username}.jpg`);
    }
  }, [props.meme.user]);

  if (!memeImage) return null;

  return (
    <Box>
      <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img
          src={profilePicture ?? ""}
          onError={() => setProfilePicture(FALLBACK_AVATAR)}
          alt="avatar"
          style={{ height: 60, width: 60, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
        />
        <Box style={{ marginLeft: 16 }}>
          <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {props.meme?.user.name}
            </Typography>

            <Typography variant="body2" style={{ color: theme.palette.grey[500], marginLeft: 8 }}>
              {`@${props.meme?.user.username}`}
            </Typography>

            <Typography variant="body2" style={{ marginLeft: 8 }}>
              <ReactTimeAgo date={props.meme.created} />
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box style={{ borderLeft: `1px solid ${theme.palette.divider}`, marginLeft: 28, paddingLeft: 40 }}>
        <img src={memeImage.src} alt="null" style={{ minWidth: 200, maxWidth: 200, height: "auto", objectFit: "cover", objectPosition: "center", display: "flex" }} onLoad={onLoad} id="parent-meme" />
      </Box>
    </Box>
  );
}
