import { Box, Grid, Modal, TextField, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import UserComment from "../../components/MemeDetail/Comment";
import MemeMetadata from "../../components/MemeDetail/MemeMetadata";
import MemeReactions from "../../components/MemeDetail/MemeReactions";
import MemeUserActions from "../../components/MemeDetail/MemeUserActions";
import MoreInfo from "../../components/MemeDetail/MoreInfo";
import { createMemeView } from "../../lib/meme";
import { RootState } from "../../store";
import { setComments, setId, setReactions } from "../../store/meme";
import { Page } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { Comment, GodMeme } from "../../types";
import { API_URL, STORAGE_URL } from "../../util/secrets";

export default function MemeDetail(): JSX.Element | null {
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
  const [comment, setComment] = useState("");

  const onComment = () => {
    async function createCommentAsync() {
      const body = {
        userId: user.id,
        memeId,
        body: comment,
      };
      const response = await axios.post(`${API_URL}/v1/comments`, body);
      const nextMemeComments = [...memeComments, response.data];
      setMemeComments(nextMemeComments);
      setComment("");
    }

    createCommentAsync();
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
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0 }}>
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
              borderRight: `1px solid ${theme.palette.grey.A100}`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <img src={image.src} alt="null" style={{ minWidth: 550, maxWidth: 550, height: imageHeight ? imageHeight : "auto", display: "flex" }} onLoad={onLoad} id="generated-meme" />
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
                  borderBottom: `1px solid ${theme.palette.grey.A100}`,
                }}
              >
                <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={meme.user.picture} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                  <Typography variant="body1" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", marginLeft: 8 }}>
                    {meme.user.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold", color: theme.palette.primary.main }}>Follow</Typography>
                </Box>

                <MoreInfo meme={meme} parentIsOpen={true} />
              </Box>
            </Grid>

            <Grid container style={{ height: "100%", width: "100%", overflowY: "scroll", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: 8, paddingTop: 16 }}>
              {comments?.map((memeComment) => (
                <UserComment key={memeComment.id} commentId={memeComment.id} />
              ))}
            </Grid>

            <Grid style={{ width: "100%" }}>
              <Grid
                item
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderTop: `1px solid ${theme.palette.grey.A100}`,
                  display: "flex",
                  flexWrap: "nowrap",
                  flexDirection: "column",
                  maxHeight: 148,
                  minHeight: 48,
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <MemeMetadata meme={meme} />
                </Box>

                <Box>
                  <MemeReactions meme={meme} />
                </Box>

                <Grid>
                  <MemeUserActions meme={meme} />
                </Grid>

                <Grid>
                  <Typography>Number of views</Typography>
                  <Typography>{meme.memeViews?.length}</Typography>
                </Grid>
              </Grid>

              <Grid
                item
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderTop: `1px solid ${theme.palette.grey.A100}`,
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
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
