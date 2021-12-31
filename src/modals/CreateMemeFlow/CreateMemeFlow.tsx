import { Grid, Modal, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import domtoimage from "dom-to-image";
import { useDispatch, useSelector } from "react-redux";
import ArrowLeftLine from "../../assets/icons/ArrowLeftLine";
import { RootState } from "../../store";
import { clearComponents, setActiveComponent, setCurrentJob, setData, setTextList } from "../../store/createMeme";
import { Page, setActivePage, toggleCreateMeme } from "../../store/view";
import { API_URL } from "../../util/secrets";
import CreateMeme from "./CreateMeme";
import SelectTemplate from "./SelectTemplate";
import ShareMeme from "./ShareMeme";

export default function CreateMemeFlow(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.view.createMeme);
  const theme = useTheme();
  const currentJob = useSelector((state: RootState) => state.createMeme.currentJob);

  const componentMap = useSelector((state: RootState) => state.createMeme.componentMap);
  const dataRedux = useSelector((state: RootState) => state.createMeme.data);
  const templateIdRedux = useSelector((state: RootState) => state.createMeme.templateId);
  const userRedux = useSelector((state: RootState) => state.user);
  const captionRedux = useSelector((state: RootState) => state.createMeme.caption);
  const tagsRedux = useSelector((state: RootState) => state.createMeme.tags);
  const locationRedux = useSelector((state: RootState) => state.createMeme.location);
  const textListRedux = useSelector((state: RootState) => state.createMeme.textList);

  const onClose = () => {
    dispatch(setActivePage(Page.Home));
    dispatch(toggleCreateMeme());
  };

  const createMemeAsync = async () => {
    const input = {
      data: dataRedux,
      templateId: templateIdRedux,
      userId: userRedux.id,
      caption: captionRedux ?? undefined,
      tags: tagsRedux ?? undefined,
      location: locationRedux ?? undefined,
      text: textListRedux ?? undefined,
    };

    const response = await axios.post(`${API_URL}/v1/memes`, input);

    if (response.data) {
      onClose();
    }
  };

  const onNext = () => {
    if (currentJob == 1) dispatch(setCurrentJob(2));
    else if (currentJob == 2) {
      dispatch(setActiveComponent(null));
      const node = document.getElementById("meme");
      const scale = 1.5;

      const style = {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: node?.offsetWidth + "px",
        height: node?.offsetHeight + "px",
      };

      const param = {
        height: (node?.offsetHeight ?? 1) * scale,
        width: (node?.offsetWidth ?? 1) * scale,
        quality: 1,
        style,
        type: "image/png",
      };

      const textList = Object.values(componentMap).map((textComponent) => textComponent.text);

      if (node) {
        return domtoimage.toPng(node, param).then((data) => {
          dispatch(setData(data));
          dispatch(setTextList(textList));
          dispatch(setCurrentJob(Math.min(currentJob + 1, 3)));
        });
      }
    } else if (currentJob == 3) {
      createMemeAsync();
    }
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
        return <ShareMeme />;
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
            <ArrowLeftLine fill={theme.palette.text.primary} height={32} width={32} />
          </button>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Create new meme
          </Typography>
          <button style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex", cursor: "pointer" }} onClick={onNext}>
            <Typography style={{ fontFamily: "Space Grotesk", color: "#0160FE", fontWeight: "bold" }}>{currentJob == 3 ? "Share" : "Next"}</Typography>
          </button>
        </Grid>
        {renderSwitch()}
      </Grid>
    </Modal>
  );
}
