import { Box, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckmarkLine from "../../../assets/icons/CheckmarkLine";
import { markAllNotificationsRead } from "../../../lib/notification";
import { RootState } from "../../../store";
import { setLastUpdated, setOverrideFromChild } from "../../../store/notification";

export default function MarkAllRead(): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.user);

  const [isFocused, setIsFocused] = useState(false);

  const onClick = () => {
    async function markAllReadAsync(userId: string) {
      const isSuccess = await markAllNotificationsRead(userId);

      if (isSuccess) {
        dispatch(setLastUpdated(new Date().toString()));
        dispatch(setOverrideFromChild(false));
      }
    }

    if (currentUser && currentUser.id) markAllReadAsync(currentUser.id);
    dispatch(setOverrideFromChild(true));
  };

  return (
    <Box
      style={{
        width: "100%",

        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        cursor: "pointer",
        color: theme.palette.text.primary,
        padding: 8,
        borderRadius: 8,
        backgroundColor: isFocused ? theme.palette.grey.A100 : theme.palette.background.paper,
      }}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={onClick}
    >
      <CheckmarkLine width={24} height={24} fill={theme.palette.text.primary} />

      <Typography style={{ fontFamily: "Space Grotesk", marginLeft: 8 }}>Mark all read</Typography>
    </Box>
  );
}
