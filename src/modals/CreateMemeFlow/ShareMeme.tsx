import { Box, Grid, TextField, Typography, useTheme } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Divider from "../../components/Divider";
import { searchForUsers } from "../../lib/search";
import { RootState } from "../../store";
import { User } from "../../types";
import AddLocation from "./AddLocation";
import AddTags from "./AddTags";
import TagSearchResult from "./TagSearchResult";
import WriteACaption from "./WriteACaption";

export default function ShareMeme(): JSX.Element | null {
    const theme = useTheme();

    const meme = useSelector((state: RootState) => state.createMeme.data);
    const user = useSelector((state: RootState) => state.user);
    const memeTagInputs = useSelector((state: RootState) => state.createMeme.memeTagInputs);

    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [imageHeight, setImageHeight] = useState<number | null>(null);
    const [shouldShowTagTooltip, setShouldShowTagTooltip] = useState(true);
    const [xOffsetTag, setXOffsetTag] = useState<number | null>(null);
    const [yOffsetTag, setYOffsetTag] = useState<number | null>(null);
    const [shouldShowTagPopover, setShouldShowTagPopover] = useState(false);
    const [tagSearchInput, setTagSearchInput] = useState<string | null>(null);
    const [tagSearchResults, setTagSearchResults] = useState<User[] | null>(null);
    const [isFetchingTagSearchResults, setIsFetchingTagSearchResults] = useState(false);

    const onLoad = () => {
        const node = document.getElementById("generated-meme") as HTMLImageElement;

        if (node) {
            setImageHeight(node.height);
        }
    };

    const onTagClick = (e: any) => {
        if (!shouldShowTagPopover) {
            setXOffsetTag(e.nativeEvent.layerX);
            setYOffsetTag(e.nativeEvent.layerY);
            setShouldShowTagPopover(true);
            console.log(e.nativeEvent.y);
            console.log(imageHeight);
        } else {
            setShouldShowTagPopover(false);
            setTagSearchResults(null);
            setTagSearchInput("");
        }
    };

    const onTagSearchInputChange = (e: any) => {
        setTagSearchInput(e.target.value);
    };

    const getId = () => {
        return yOffsetTag && yOffsetTag > Math.min(Math.min((imageHeight ?? 600) - 200, (imageHeight ?? 600) * 0.75), 250) ? "tag-popover-down" : "tag-popover-up";
    };

    useEffect(() => {
        if (tagSearchInput && tagSearchInput.length > 1) {
            fetchSearchResultsAsync(tagSearchInput);
            setIsFetchingTagSearchResults(true);
        } else {
            setTagSearchResults(null);
        }
        async function fetchSearchResultsAsync(input: string) {
            const users = await searchForUsers(input);
            if (users) {
                console.log(users);
                setTagSearchResults(users);
            }
            setIsFetchingTagSearchResults(false);
        }
    }, [tagSearchInput]);

    useEffect(() => {
        if (meme) {
            const nextImage = new Image();
            nextImage.src = meme;
            setImage(nextImage);
        }
    }, [meme]);

    useEffect(() => {
        if (memeTagInputs) setShouldShowTagPopover(false);
    }, [memeTagInputs]);

    if (!meme || !image) return null;

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "100%",
                cursor: "auto",
                position: "relative",
            }}
        >
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    overflowY: "scroll",
                    overflowX: "clip",
                    maxHeight: "100%",
                    cursor: shouldShowTagPopover ? "auto" : "crosshair",
                    position: "relative",
                }}
                onMouseEnter={() => setShouldShowTagTooltip(false)}
                onClick={onTagClick}
            >
                <img
                    src={meme}
                    alt="null"
                    style={{ minWidth: 600, maxWidth: 600, height: imageHeight ? (imageHeight > 600 ? "auto" : "100%") : "auto", display: "flex" }}
                    onLoad={onLoad}
                    id="generated-meme"
                />
            </Box>

            <Box id="tag-tooltip" style={{ display: shouldShowTagTooltip ? "block" : "none" }}>
                <Typography variant="body1" style={{ fontWeight: "bold", color: theme.palette.background.paper, textAlign: "center" }}>
                    Click to tag people
                </Typography>
            </Box>

            <Box
                id={getId()}
                style={{
                    display: shouldShowTagPopover ? "block" : "none",
                    top: yOffsetTag ? (yOffsetTag > Math.min(Math.min((imageHeight ?? 600) - 200, (imageHeight ?? 600) * 0.75), 250) ? yOffsetTag - 208 : yOffsetTag + 12) : 0,
                    left: xOffsetTag ? xOffsetTag - 25 : 0,
                    maxHeight: "100%",
                }}
            >
                <Box style={{ display: "flex", flexDirection: "column", overflowY: "clip", maxHeight: "100%" }}>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            maxHeight: "100%",
                            alignItems: "center",
                            borderBottom: `1px solid ${theme.palette.grey.A200}`,
                            padding: 8,
                            overflowY: "clip",
                        }}
                    >
                        <Typography variant="body1" style={{ fontWeight: "bold" }}>
                            Tag:
                        </Typography>

                        <TextField value={tagSearchInput} InputProps={{ disableUnderline: true }} placeholder="Search" style={{ width: "100%", marginLeft: 8 }} onChange={onTagSearchInputChange} />
                    </Box>

                    <Box style={{ display: isFetchingTagSearchResults ? "none" : "flex", flexDirection: "column", maxHeight: `calc(100% - 24px)`, overflowY: "scroll" }}>
                        {tagSearchResults && tagSearchResults.length > 0
                            ? tagSearchResults.map((user) => (
                                  <Box key={user.id}>
                                      <TagSearchResult user={user} xOffset={xOffsetTag ?? 0} yOffset={yOffsetTag ?? 0} />
                                  </Box>
                              ))
                            : null}
                    </Box>

                    <Box style={{ display: isFetchingTagSearchResults ? "flex" : "none", flexDirection: "column", maxHeight: `calc(100% - 24px)`, alignItems: "center" }}>
                        <ClipLoader color={theme.palette.text.primary} size={24} />
                    </Box>
                </Box>
            </Box>

            {memeTagInputs && memeTagInputs.length > 0
                ? memeTagInputs.map((memeTagInput) => (
                      <Box id="tagged-user" key={memeTagInput.userId} style={{ position: "absolute", top: memeTagInput.yOffset - 24, left: memeTagInput.xOffset - 54 }}>
                          <Typography variant="caption" style={{ fontWeight: "bold" }}>
                              {memeTagInput.username}
                          </Typography>
                      </Box>
                  ))
                : null}

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
                    paddingRight: 16,
                    position: "relative",
                    paddingBottom: 0,
                    marginBottom: 0,
                    flexWrap: "nowrap",
                }}
            >
                <Grid item style={{ width: "100%", position: "sticky", top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1000 }}>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%",

                            maxHeight: 50,
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
