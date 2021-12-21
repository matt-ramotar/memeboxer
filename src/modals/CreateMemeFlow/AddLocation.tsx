import { Box, Typography, useTheme } from "@material-ui/core";
import { BaseEmoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompassLine from "../../assets/icons/CompassLine";
import { RootState } from "../../store";

export default function AddLocation(): JSX.Element | null {
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
    <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: 60, overflowY: "scroll", alignItems: "flex-start", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "70%", flexWrap: "wrap", alignItems: "flex-start" }}>
        {caption.split(" ").filter((word) => word.startsWith("#") && word.length > 1).length > 0 ? (
          Array.from(new Set(caption.split(" ").filter((word) => word.startsWith("#") && word.length > 1)))
            .sort()
            .map((word) => {
              return (
                <span key={word} style={{ marginRight: 2 }}>
                  <Typography variant="body2" style={{ fontFamily: "Space Grotesk", color: theme.palette.text.primary, fontWeight: "bold", fontStyle: "italic", wordBreak: "break-word" }}>
                    {word}
                  </Typography>
                </span>
              );
            })
        ) : (
          <Typography style={{ fontFamily: "Space Grotesk", color: theme.palette.text.primary, opacity: 0.4 }}>Add location</Typography>
        )}
      </div>

      <button onClick={onClick} style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", padding: 0, margin: 0, cursor: "pointer" }}>
        <CompassLine width={24} height={24} fill="#0160FE" />
      </button>
    </Box>
  );
}
