import { Box, Modal, Typography, useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Page, setActivePage, toggleCreateTemplate } from "../../store/view";

export default function NewMemeFlow(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.view.createTemplate);
  const theme = useTheme();

  const onClose = () => {
    dispatch(setActivePage(Page.Home));
    dispatch(toggleCreateTemplate());
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.85)" } }}
    >
      <Box style={{ backgroundColor: theme.palette.background.paper, width: 900, height: 900 }}>
        <Typography>Modal</Typography>
      </Box>
    </Modal>
  );
}
