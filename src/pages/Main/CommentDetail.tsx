import { Box, Grid, Modal, useTheme } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import MainComment from "../../components/CommentDetail/MainComment";
import ParentMeme from "../../components/CommentDetail/ParentMeme";
import { fetchGodComment } from "../../lib/comment";
import { RootState } from "../../store";
import { Page } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { CommentReaction, GodComment, GodMeme, User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";
import { STORAGE_URL } from "../../util/secrets";

export default function CommentDetail(): JSX.Element | null {
  const theme = useTheme();
  const navigate = useNavigate();
  const { commentId } = useParams();

  const [comment, setComment] = useState<GodComment | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState(FALLBACK_AVATAR);
  const [parentComment, setParentComment] = useState<GodComment | null>(null);
  const [meme, setMeme] = useState<GodMeme | null>(null);
  const [memeImage, setMemeImage] = useState<HTMLImageElement | null>(null);
  const [memeImageHeight, setMemeImageHeight] = useState<number | null>(null);

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
              width: 600,
              borderRight: `1px solid ${theme.palette.grey.A100}`,
              backgroundColor: theme.palette.background.paper,
              padding: "32px 64px",
            }}
          >
            {comment.meme ? <ParentMeme meme={comment.meme} /> : null}
            <MainComment comment={comment} />
          </Grid>

          <Grid
            container
            style={{
              display: "flex",
              minWidth: 300,
              maxWidth: 330,
              width: 330,
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
          ></Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
