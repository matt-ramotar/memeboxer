import { Box, Grid, Popover, TextField, Typography, useTheme } from "@material-ui/core";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmojiSmileLine from "../../assets/icons/EmojiSmileLine";
import { RootState } from "../../store";

export default function WriteACaption(): JSX.Element | null {
  const meme = useSelector((state: RootState) => state.createMeme.data);
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const [caption, setCaption] = useState("");
  const getNumCharacters = () => caption.length;

  const onChange = (e: any) => {
    const numCharacters = e.target.value.length;

    if (numCharacters <= 280) setCaption(e.target.value);
    else setCaption(e.target.value.slice(280));
  };

  const [shouldShow, setShouldShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!shouldShow) {
      setAnchorEl(event.currentTarget);
      setShouldShow(true);
    } else {
      setShouldShow(false);
      setAnchorEl(null);
    }
  };

  const onClose = () => {
    setAnchorEl(null);
    setShouldShow(false);
  };

  const onPick = (emoji: BaseEmoji) => {
    setCaption(caption + `${emoji.native}`);
    setShouldShow(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (meme) {
      console.log("hitting");
      const nextImage = new Image();
      nextImage.src = meme;
      setImage(nextImage);
    }
  }, [meme]);

  if (!meme || !image) return null;

  return (
    <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginTop: 16 }}>
      <TextField
        placeholder="Write a caption..."
        style={{ border: "none", fontFamily: "Space Grotesk", width: "100%", height: 200 }}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          style: {
            fontFamily: "Space Grotesk",
          },
          maxLength: 280,
        }}
        onChange={onChange}
        value={caption}
        multiline
      />

      <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div>
          <button onClick={onClick} style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", padding: 0, margin: 0, cursor: "pointer" }}>
            <EmojiSmileLine height={24} width={24} fill="#0160FE" />
          </button>

          <Popover
            open={shouldShow}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Picker showPreview={false} showSkinTones={false} onClick={onPick} color="primary" />
          </Popover>
        </div>

        <Typography variant="body2" style={{ fontFamily: "Space Grotesk", color: theme.palette.divider, fontWeight: "bold" }}>{`${getNumCharacters()}/280`}</Typography>
      </Grid>
    </Box>
  );
}
