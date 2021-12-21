import { Grid, Modal, Typography, useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ArrowLeftLine from "../../assets/icons/ArrowLeftLine";
import { RootState } from "../../store";
import { clearComponents, setCurrentJob } from "../../store/createMeme";
import { Page, setActivePage, toggleCreateTemplate } from "../../store/view";
import CreateMeme from "./CreateMeme";
import PostMeme from "./PostMeme";
import SelectTemplate from "./SelectTemplate";

export default function CreateMemeFlow(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.view.createTemplate);
  const theme = useTheme();
  const currentJob = useSelector((state: RootState) => state.createMeme.currentJob);

  const onClose = () => {
    dispatch(setActivePage(Page.Home));
    dispatch(toggleCreateTemplate());
  };

  const renderSwitch = () => {
    switch (currentJob) {
      case 0:
        return null;
      case 1:
        return <SelectTemplate />;

      case 2:
        return <CreateMeme />;

      case 3:
        return <PostMeme />;
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: currentJob == 1 ? "scroll" : "inherit",
        overscrollBehavior: currentJob == 1 ? "scroll" : "scroll",
        scrollBehavior: currentJob == 1 ? "smooth" : "unset",
      }}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.85)" } }}
    >
      <Grid
        container
        style={{
          backgroundColor: theme.palette.background.paper,
          width: currentJob == 3 ? 900 : 600,
          minHeight: currentJob == 1 ? 600 : 0,
          maxHeight: currentJob == 1 ? 600 : 900,
          borderRadius: 10,
          display: "flex",
          overflowY: currentJob == 1 ? "scroll" : "inherit",
          overscrollBehavior: currentJob == 1 ? "scroll" : "scroll",
          position: "relative",
          paddingBottom: 0,
        }}
      >
        <Grid
          container
          style={{
            backgroundColor: theme.palette.background.paper,
            width: "100vw",
            height: 40,
            position: "sticky",
            top: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <button
            style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", visibility: currentJob == 1 ? "hidden" : "visible" }}
            onClick={() => {
              if (currentJob == 2) dispatch(clearComponents());
              dispatch(setCurrentJob(Math.max(currentJob - 1, 1)));
            }}
          >
            <ArrowLeftLine />
          </button>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Create new meme
          </Typography>
          <button
            style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }}
            onClick={() => dispatch(setCurrentJob(Math.min(currentJob + 1, 3)))}
          >
            <Typography style={{ fontFamily: "Space Grotesk", color: "#0160FE", fontWeight: "bold" }}>Next</Typography>
          </button>
        </Grid>
        {renderSwitch()}
      </Grid>
    </Modal>
  );
}
