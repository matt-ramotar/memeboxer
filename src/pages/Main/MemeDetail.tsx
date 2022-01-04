import { Box, Grid, Modal, TextField, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import AnalyticsLine from "../../assets/icons/AnalyticsLine";
import PersonFill from "../../assets/icons/PersonFill";
import Divider from "../../components/Divider";
import MoreInfo from "../../components/MemeDetail/actions/MoreInfo/MoreInfo";
import UserComment from "../../components/MemeDetail/comment/MemeComment";
import Follow from "../../components/MemeDetail/Follow";
import MemeCaption from "../../components/MemeDetail/MemeCaption";
import MemeMetadata from "../../components/MemeDetail/MemeMetadata";
import MemeReactions from "../../components/MemeDetail/MemeReactions";
import MemeUserActions from "../../components/MemeDetail/MemeUserActions";
import UserTag from "../../components/MemeDetail/UserTag";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { godCommentToComment } from "../../helpers/comment";
import { createComment } from "../../lib/comment";
import { createMemeView } from "../../lib/meme";
import { RootState } from "../../store";
import { setComments, setId, setReactions } from "../../store/meme";
import { Page } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { Comment, GodMeme } from "../../types";
import { API_URL, STORAGE_URL } from "../../util/secrets";

export default function MemeDetail(): JSX.Element | null {
  const IS_DIRECT = true;

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memeId } = useParams();

  const user = useSelector((state: RootState) => state.user);
  const lastActivePage = useSelector((state: RootState) => state.view.activePage);
  const lastUsername = useSelector((state: RootState) => state.view.username);
  const reactions = useSelector((state: RootState) => state.meme.reactions);
  const comments = useSelector((state: RootState) => state.meme.comments);

  const [meme, setMeme] = useState<GodMeme | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [memeComments, setMemeComments] = useState<Comment[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [shouldShowUserTags, setShouldShowUserTags] = useState(false);
  const [comment, setComment] = useState("");

  const onComment = () => {
    async function createCommentAsync(userId: string, memeId: string) {
      const godComment = await createComment(userId, comment, memeId, IS_DIRECT);
      const memeComment = godCommentToComment(godComment);
      const nextMemeComments = [...memeComments, memeComment];
      setMemeComments(nextMemeComments);
      setComment("");
    }

    if (user && user.id && meme && meme.id) {
      createCommentAsync(user.id, meme.id);
    }
  };

  useEffect(() => {
    if (comment) setIsDisabled(false);
    else setIsDisabled(true);
  }, [comment]);

  const onLoad = () => {
    const node = document.getElementById("generated-meme") as HTMLImageElement;

    if (node) {
      setImageHeight(node.height);
    }
  };

  useEffect(() => {
    if (meme) {
      const nextImage = new Image();
      nextImage.src = `${STORAGE_URL}/${meme.template.id}_${meme.id}`;
      setImage(nextImage);
      console.log("meme", meme);
    }
  }, [meme]);

  useEffect(() => {
    async function fetchMemeAsync() {
      const response = await axios.get(`${API_URL}/v1/memes/${memeId}`);
      setMeme(response.data);
    }

    fetchMemeAsync();
  }, []);

  useEffect(() => {
    async function createMemeViewAsync(memeId: string, userId: string) {
      await createMemeView(memeId, userId);
    }

    if (meme && meme.id && user.id) createMemeViewAsync(meme.id, user.id);
  }, [meme?.id, user.id]);

  useEffect(() => {
    if (meme?.comments) {
      setMemeComments(meme.comments);
    }
  }, [meme?.comments]);

  useEffect(() => {
    if (meme) {
      dispatch(setId(meme.id));
      dispatch(setReactions(meme.reactions ?? []));
      dispatch(setComments(meme.comments ?? []));
    }
  }, [meme]);

  if (!meme || !image) return null;

  const onClose = () => {
    switch (lastActivePage) {
      case Page.Explore:
        navigate("/explore");
        break;
      case Page.Profile:
        if (lastUsername) {
          navigate(`/${lastUsername}`);
          break;
        }
        navigate("/");
        break;
      case Page.Notifications:
        navigate("/notifications");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0, position: "relative" }}>
      <Modal
        open={true}
        onClose={onClose}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          outline: "none",
          border: "none",
          overflowY: "scroll",
        }}
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.85)" } }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 900,
            width: 900,
            cursor: "auto",
            border: "none",
            outline: "none",
            position: "relative",
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflowY: "scroll",
              height: 900,
              width: 550,
              borderRight: `1px solid ${theme.palette.grey.A200}`,
              backgroundColor: theme.palette.background.paper,
              position: "relative",
            }}
          >
            <Box style={{ position: "relative" }}>
              <img src={image.src} alt="null" style={{ minWidth: 550, maxWidth: 550, height: imageHeight ? imageHeight : "auto", display: "flex" }} onLoad={onLoad} id="generated-meme" />

              <Box style={{ display: shouldShowUserTags ? "flex" : "none" }}>
                {meme.memeTags?.map((memeTag) => (
                  <Box id="tagged-user-meme-post" key={memeTag.id} style={{ position: "absolute", top: memeTag.yOffset - 50, left: memeTag.xOffset - 40 }}>
                    <UserTag memeTag={memeTag} />
                  </Box>
                ))}
              </Box>

              <Box
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  bottom: 8,
                  left: 8,
                  backgroundColor: "black",
                  visibility: "visible",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: meme.memeTags && meme.memeTags.length > 0 ? "flex" : "none",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setShouldShowUserTags(!shouldShowUserTags)}
              >
                <PersonFill width={24} height={24} fill="white" />
              </Box>
            </Box>
          </Grid>

          <Grid
            container
            style={{
              display: "flex",
              minWidth: 350,
              maxWidth: 380,
              width: 380,
              height: "100%",
              maxHeight: 900,
              overflowY: "scroll",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",

              position: "relative",
              backgroundColor: theme.palette.background.paper,

              flexWrap: "nowrap",
            }}
          >
            <Grid item style={{ width: "100%", position: "sticky", top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1000 }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  maxHeight: 50,
                  padding: 4,
                  borderBottom: `1px solid ${theme.palette.grey.A200}`,
                }}
              >
                <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }} onClick={() => navigate(`/${meme.user.username}`)}>
                  <ProfilePicture username={meme.user.username} />
                  <Box>
                    <Typography variant="body1" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", marginLeft: 8 }}>
                      {meme.user.name}
                    </Typography>

                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                      {meme.location}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Follow meme={meme} />
                </Box>

                <MoreInfo meme={meme} parentIsOpen={true} />
              </Box>
            </Grid>

            <Grid container style={{ height: "100%", width: "100%", overflowY: "scroll", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: 8, paddingTop: 16 }}>
              <Box style={{ display: meme.caption ? "flex" : "none" }}>
                <MemeCaption meme={meme} />
              </Box>

              {comments?.map((memeComment) => (
                <UserComment key={memeComment.id} commentId={memeComment.id} />
              ))}
            </Grid>

            <Box style={{ width: "100%" }}>
              <Box
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderTop: `1px solid ${theme.palette.grey.A200}`,
                  display: "flex",
                  flexWrap: "nowrap",
                  flexDirection: "column",
                  width: "100%",
                  overflowX: "hidden",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box style={{ width: `calc(100% - 8px)`, margin: 4 }}>
                  <MemeMetadata meme={meme} />
                </Box>

                <Grid item xs={12} style={{ width: `calc(100% - 8px)`, margin: 4, display: "flex" }}>
                  <MemeReactions meme={meme} />
                </Grid>

                <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", margin: 4 }}>
                  <AnalyticsLine width={20} height={20} fill={theme.palette.text.primary} />
                  <Typography variant="caption">{meme.memeViews?.length}</Typography>

                  <Typography variant="caption" style={{ marginLeft: 4 }}>
                    views
                  </Typography>
                </Box>

                <Divider />

                <Box style={{ width: `calc(100% - 8px)`, margin: 4 }}>
                  <MemeUserActions meme={meme} />
                </Box>
              </Box>

              <Box
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderTop: `1px solid ${theme.palette.grey.A200}`,
                  display: "flex",
                  flexWrap: "nowrap",
                  flexDirection: "row",
                  maxHeight: 148,
                  minHeight: 48,
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box style={{ maxHeight: "100%", overflowY: "scroll" }}>
                  <TextField
                    placeholder="Add a comment..."
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                    style={{
                      padding: 0,
                      overflowY: "scroll",
                      border: "none",
                      width: "100%",
                      boxShadow: "none",
                      fontFamily: "Space Grotesk",
                      fontSize: 18,
                      display: "flex",
                      flexDirection: "row",
                      maxHeight: 148,
                      alignItems: "center",
                    }}
                  />
                </Box>

                <button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", padding: 0, margin: 0 }} disabled={isDisabled} onClick={onComment}>
                  <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold", cursor: "pointer", color: isDisabled ? "rgba(1, 96, 254, 0.4)" : theme.palette.primary.main }}>
                    Comment
                  </Typography>
                </button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
