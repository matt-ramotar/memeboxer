import { Box, Typography, useTheme } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HashtagLine from "../../assets/icons/HashtagLine";
import { RootState } from "../../store";

export default function AddTags(): JSX.Element | null {
  const theme = useTheme();

  const caption = useSelector((state: RootState) => state.createMeme.caption);

  const [tags, setTags] = useState<string[] | null>(null);

  useEffect(() => {
    if (caption) {
      const allTags = caption.split(" ").filter((word) => word.startsWith("#") && word.length > 1);
      const nextTags = Array.from(new Set(allTags));
      setTags(nextTags);
    }
  }, [caption]);

  if (!tags || tags.length === 0) {
    <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "70%", height: 120, flexWrap: "wrap", alignItems: "flex-start" }}>
        <Typography style={{ fontFamily: "Space Grotesk", color: theme.palette.text.primary, opacity: 0.4 }}>Add tags</Typography>
      </div>

      <HashtagLine width={24} height={24} fill={theme.palette.primary.main} />
    </Box>;
  }

  return (
    <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "70%", height: 120, flexWrap: "wrap", alignItems: "flex-start" }}>
        {tags?.sort().map((word) => {
          return (
            <span key={word} style={{ marginRight: 2 }}>
              <Typography variant="body2" style={{ fontFamily: "Space Grotesk", color: theme.palette.text.primary, fontWeight: "bold", fontStyle: "italic", wordBreak: "break-word" }}>
                {word}
              </Typography>
            </span>
          );
        })}
      </div>

      <HashtagLine width={24} height={24} fill={theme.palette.primary.main} />
    </Box>
  );
}
