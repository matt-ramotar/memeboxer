import { Box, Grid, Popover, TextField, Typography, useTheme } from "@material-ui/core";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmojiSmileLine from "../../assets/icons/EmojiSmileLine";
import HashtagLine from "../../assets/icons/HashtagLine";
import { RootState } from "../../store";

export default function ShareMeme(): JSX.Element | null {
  const meme = useSelector((state: RootState) => state.createMeme.data);
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  const [caption, setCaption] = useState("");
  const getNumCharacters = () => caption.length;

  const onChange = (e: any) => {
    const numCharacters = e.target.value.length;

    if (numCharacters <= 2000) setCaption(e.target.value);
    else setCaption(e.target.value.slice(2000));
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

  const hashtagFormatter = (s: string) => {
    return s.replace(/(^|\s)(#[a-z\d-]+)/gi, (m, g1, g2) => {
      return g1 + "<span style={color:'#0160FE'}>" + g2 + "< /span>";
    });
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

  if (!meme) return null;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        maxHeight: 900,
        width: "100%",
      }}
    >
      <Grid container style={{ display: "flex", overflowY: "scroll", overscrollBehavior: "scroll" }}>
        <Box style={{ position: "relative" }}>
          <img src={meme} alt="null" style={{ minWidth: 600, maxWidth: 600, maxHeight: "100%", display: "flex", margin: 0, padding: 0 }} />
        </Box>
      </Grid>

      <Grid style={{ display: "flex", minWidth: 300, maxWidth: 330, width: 330, height: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", paddingRight: 16 }}>
        <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
          <img src={user.picture} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
          <Typography variant="body1" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", marginLeft: 8 }}>
            {user.name}
          </Typography>
        </Grid>

        <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", height: 280, width: "100%", marginTop: 16 }}>
          <TextField
            placeholder="Write a caption..."
            style={{ border: "none", fontFamily: "Space Grotesk", height: 240, width: "100%", overflowY: "scroll" }}
            InputProps={{ disableUnderline: true }}
            inputProps={{ style: { fontFamily: "Space Grotesk", color: theme.palette.text.primary }, maxLength: 2000 }}
            onChange={onChange}
            value={caption}
            multiline
          />

          <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div>
              <button onClick={onClick} style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", padding: 0, margin: 0 }}>
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

            <Typography variant="body2" style={{ fontFamily: "Space Grotesk", color: theme.palette.divider, fontWeight: "bold" }}>{`${getNumCharacters()}/2,000`}</Typography>
          </Grid>
        </Box>

        <Box style={{ backgroundColor: theme.palette.divider, height: 1, width: "100%", marginTop: 8, marginBottom: 8, visibility: "visible" }}></Box>

        <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", maxHeight: 100, overflowY: "scroll", alignItems: "flex-start", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "70%", flexWrap: "wrap", alignItems: "flex-start" }}>
            {Array.from(new Set(caption.split(" ").filter((word) => word.startsWith("#") && word.length > 1)))
              .sort()
              .map((word) => {
                return (
                  <span key={word} style={{ marginRight: 2 }}>
                    <Typography style={{ fontFamily: "Space Grotesk", color: theme.palette.divider, fontWeight: "bold", fontStyle: "italic", wordBreak: "break-word" }}>{word}</Typography>
                  </span>
                );
              })}
          </div>

          <HashtagLine width={24} height={24} fill="#0160FE" />
        </Grid>
      </Grid>
    </Box>
  );
}
