import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVerticalLine from "../../../assets/icons/MoreVerticalLine";
import { RootState } from "../../../store";
import { setOverrideFromChild } from "../../../store/feed";
import { GodMeme } from "../../../types";
import { API_URL } from "../../../util/secrets";
import CopyLink from "./CopyLink";
import Delete from "./Delete";
import GoToMeme from "./GoToMeme";

interface Props {
  meme: GodMeme;
  parentIsOpen: boolean;
}

export default function MoreInfo(props: Props): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const overrideFromChild = useSelector((state: RootState) => state.feed.overrideMoreInfoFromChild);

  const [isVisible, setIsVisible] = useState(false);
  const [isPoster, setIsPoster] = useState(false);

  const onDelete = () => {
    async function deleteMemeAsync() {
      const meme = await axios.delete(`${API_URL}/v1/memes/${props.meme.id}`, { data: { userId: user.id, token: user.token } });
      if (meme) {
        window.location.reload();
      }
    }

    deleteMemeAsync();
  };

  useEffect(() => {
    if (!props.parentIsOpen) {
      setIsVisible(false);
    }
  }, [props.parentIsOpen]);

  useEffect(() => {
    setIsPoster(props.meme.user.id == user.id);
  }, [props.meme, user]);

  return (
    <Box style={{ position: "relative" }}>
      <button
        style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", margin: 0, padding: 0, cursor: "pointer", marginLeft: 2 }}
        onClick={() => {
          dispatch(setOverrideFromChild(false));
          setIsVisible(!isVisible);
        }}
      >
        <MoreVerticalLine fill={theme.palette.text.primary} height={28} width={28} />
      </button>

      <Box
        style={{
          display: isVisible && props.parentIsOpen && !overrideFromChild ? "flex" : "none",
          position: "absolute",
          top: 48,
          right: -8,
          backgroundColor: theme.palette.background.paper,
          width: 200,

          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "flex-start",
          border: `1px solid ${theme.palette.grey.A200}`,
          borderRadius: 8,
          zIndex: 10000,
        }}
      >
        <GoToMeme meme={props.meme} />

        {/* <Box
          style={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography style={{ fontFamily: "Space Grotesk" }}>Share</Typography>
        </Box> */}

        <CopyLink meme={props.meme} />
        {/* <Box
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
        </Box> */}

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

        <Delete meme={props.meme} />

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
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            color: theme.palette.error.main,
          }}
        >
          <Typography style={{ fontFamily: "Space Grotesk" }}>Unfollow</Typography>
        </Box>
      </Box>
    </Box>
  );
}
