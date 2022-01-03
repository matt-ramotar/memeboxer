import { Box, Grid, Modal, Typography, useTheme } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ArrowLeftLine from "../../assets/icons/ArrowLeftLine";
import ChildComments from "../../components/CommentDetail/ChildComments";
import MainComment from "../../components/CommentDetail/MainComment";
import ParentMeme from "../../components/CommentDetail/ParentMeme";
import RelevantPeople from "../../components/CommentDetail/RelevantPeople";
import { fetchGodComment } from "../../lib/comment";
import { RootState } from "../../store";
import { setChildComments as setChildren, setId, setReactions } from "../../store/comment";
import { Page } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { CommentReaction, GodComment, GodMeme, User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { STORAGE_URL } from "../../util/secrets";

export default function CommentDetail(): JSX.Element | null {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { commentId } = useParams();

  const [comment, setComment] = useState<GodComment | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState(FALLBACK_AVATAR);
  const [parentComment, setParentComment] = useState<GodComment | null>(null);
  const [meme, setMeme] = useState<GodMeme | null>(null);
  const [memeImage, setMemeImage] = useState<HTMLImageElement | null>(null);
  const [memeImageHeight, setMemeImageHeight] = useState<number | null>(null);
  const [relevantPeople, setRelevantPeople] = useState<string[] | null>(null);

  const [childComments, setChildComments] = useState<GodComment[] | null>(null);
  const [commentReactions, setCommentReactions] = useState<CommentReaction[] | null>(null);

  const currentUser = useSelector((state: RootState) => state.user);
  const lastActivePage = useSelector((state: RootState) => state.view.activePage);
  const lastUsername = useSelector((state: RootState) => state.view.username);

  const onLoad = () => {
    const node = document.getElementById("parent-meme") as HTMLImageElement;

    if (node) {
      setMemeImageHeight(node.height);
    }
  };

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

  useEffect(() => {
    async function fetchAsync(commentId: string) {
      const comment = await fetchGodComment(commentId);
      setComment(comment);
    }

    if (commentId) {
      fetchAsync(commentId);
    }
  }, [commentId]);

  useEffect(() => {
    if (comment?.meme) {
      const memeImage = new Image();
      memeImage.src = `${STORAGE_URL}/${comment.meme.template.id}_${comment.meme.id}`;
      setMemeImage(memeImage);
    }
  }, [comment?.meme]);

  useEffect(() => {
    if (comment) {
      dispatch(setId(comment.id));
      dispatch(setReactions(comment.commentReactions ?? []));
      dispatch(setChildren(comment.childrenComments ?? []));
    }
  }, [comment]);

  useEffect(() => {
    const relevantPeople: string[] = [];

    if (comment?.user) relevantPeople.push(comment.user.id);
    if (comment?.meme) relevantPeople.push(comment.meme.user.id);
    if (comment?.parentComment) relevantPeople.push(comment.parentComment.userId);

    setRelevantPeople(relevantPeople);
    console.log("relevant people", relevantPeople);
  }, [comment]);

  if (!comment || !memeImage) return null;

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
              justifyContent: "flex-start",
              overflowY: "scroll",
              height: 900,
              width: 550,
              borderRight: `1px solid ${theme.palette.grey.A100}`,
              backgroundColor: theme.palette.background.paper,
              padding: 32,
            }}
          >
            <Box style={{ display: comment.meme ? "flex" : "none", flexDirection: "row", alignItems: "center", marginLeft: -16 }}>
              <button
                style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2, marginRight: 2 }}
                onClick={() => {
                  if (comment.parentComment) {
                    navigate(`/c/${comment.parentComment.id}`);
                  } else {
                    navigate(`/m/${comment.meme?.id}`);
                  }
                }}
              >
                <ArrowLeftLine fill={theme.palette.text.primary} height={32} width={32} strokeWidth="1.5" />
              </button>

              <Typography
                variant="h6"
                style={{ marginLeft: 16, cursor: "pointer", fontWeight: "bold" }}
                onClick={() => {
                  if (comment.parentComment) {
                    navigate(`/c/${comment.parentComment.id}`);
                  } else {
                    navigate(`/m/${comment.meme?.id}`);
                  }
                }}
              >
                {comment.parentComment ? "Parent" : "Meme"}
              </Typography>
            </Box>

            <Box style={{ marginTop: 16 }}>{comment.meme ? <ParentMeme meme={comment.meme} /> : null}</Box>
            <MainComment comment={comment} />
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
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingRight: 32,
              paddingLeft: 8,
              paddingTop: 8,
              paddingBottom: 8,

              position: "relative",
              backgroundColor: theme.palette.background.paper,

              flexWrap: "nowrap",
            }}
          >
            <Box style={{ width: "100%" }}>{relevantPeople ? <RelevantPeople userIds={relevantPeople} /> : null}</Box>

            <Box style={{ marginTop: 16, width: "100%" }}>
              <ChildComments comment={comment} />
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
