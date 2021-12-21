import { Box, Grid, Popover, TextField, Typography, useTheme } from "@material-ui/core";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiSmileLine from "../../assets/icons/EmojiSmileLine";
import { RootState } from "../../store";
import { setCaption } from "../../store/createMeme";

export default function WriteACaption(): JSX.Element | null {
  const dispatch = useDispatch();
  const meme = useSelector((state: RootState) => state.createMeme.data);

  const theme = useTheme();

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const caption = useSelector((state: RootState) => state.createMeme.caption);

  const getNumCharacters = () => caption?.length ?? 0;

  const onChange = (e: any) => {
    const nextCaption = e.target.value.slice(0, 280);

    dispatch(setCaption(nextCaption));
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
