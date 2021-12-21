import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import { BaseEmoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Divider from "../../components/Divider";
import { RootState } from "../../store";
import AddLocation from "./AddLocation";
import AddTags from "./AddTags";
import WriteACaption from "./WriteACaption";

export default function ShareMeme(): JSX.Element | null {
  const meme = useSelector((state: RootState) => state.createMeme.data);
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

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

  const onLoad = () => {
    const node = document.getElementById("generated-meme") as HTMLImageElement;
    setImageHeight(node!.height);
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
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        cursor: "auto",
      }}
    >
      <Box style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", overflowY: "scroll", maxHeight: "100%" }}>
        <img src={meme} alt="null" style={{ minWidth: 600, maxWidth: 600, height: "auto", display: "flex" }} onLoad={onLoad} id="generated-meme" />
      </Box>

      <Grid
        container
        style={{
          display: "flex",
          minWidth: 300,
          maxWidth: 330,
          width: 330,
          maxHeight: imageHeight ? imageHeight : "auto",
          overflowY: "scroll",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingLeft: 16,
          backgroundColor: "red",
          paddingRight: 16,
          position: "relative",
          paddingBottom: 0,
          marginBottom: 0,
          flexWrap: "nowrap",
        }}
      >
        <Grid item style={{ width: "100%" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              position: "sticky",
              maxHeight: 50,
              top: 0,
              backgroundColor: theme.palette.background.paper,
              zIndex: 1000,
            }}
          >
            <img src={user.picture} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
            <Typography variant="body1" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", marginLeft: 8 }}>
              {user.name}
            </Typography>
          </Box>
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <WriteACaption />
          <Divider />
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <AddTags />
          <Divider />
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <AddLocation />
          <Divider />
        </Grid>
      </Grid>
    </Box>
  );
}
