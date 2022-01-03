import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MoreVerticalLine from "../../assets/icons/MoreVerticalLine";
import { RootState } from "../../store";
import { GodComment } from "../../types";
import { API_URL } from "../../util/secrets";

interface Props {
  comment: GodComment;
  parentIsOpen: boolean;
}

export default function CommentMoreInfo(props: Props): JSX.Element {
  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const [isPoster, setIsPoster] = useState(false);

  const onDelete = () => {
    async function deleteCommentAsync() {
      const comment = await axios.delete(`${API_URL}/v1/comments/${props.comment.id}`, { data: { userId: user.id, token: user.token } });
      if (comment) {
        window.location.reload();
      }
    }

    deleteCommentAsync();
  };

  useEffect(() => {
    if (!props.parentIsOpen) {
      setIsVisible(false);
    }
  }, [props.parentIsOpen]);

  useEffect(() => {
    setIsPoster(props.comment.user._id == user.id);
  }, [props.comment, user]);

  return (
    <Box style={{ position: "relative" }}>
      <button
        style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
      >
        <MoreVerticalLine fill={theme.palette.text.primary} height={28} width={28} />
      </button>

      <Box
        style={{
          display: isVisible && props.parentIsOpen ? "flex" : "none",
          position: "absolute",
          top: 0,
          right: -32,
          backgroundColor: theme.palette.background.paper,
          width: 200,

          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "flex-start",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 10,
        }}
      >
        <Box
          style={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: 48,
            display: isPoster ? "none" : "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: theme.palette.error.main,
          }}
        >
          <Typography style={{ fontFamily: "Space Grotesk" }}>Report</Typography>
        </Box>

        <Box
          style={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: 48,
            display: isPoster ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography style={{ fontFamily: "Space Grotesk" }}>Edit</Typography>
        </Box>
        <Box
          style={{
            width: "100%",

            height: 48,
            display: isPoster ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: theme.palette.error.main,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          onClick={onDelete}
        >
          <Typography style={{ fontFamily: "Space Grotesk" }}>Delete</Typography>
        </Box>
      </Box>
    </Box>
  );
}
