import { Box, Grid, Modal, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import ArrowLeftLine from "../../assets/icons/ArrowLeftLine";
import ArrowRightLine from "../../assets/icons/ArrowRightLine";
import { TextInput } from "../../pages/App/App";
import { RootState } from "../../store";
import { setCurrentJob, setTemplateId } from "../../store/createMeme";
import { Page, setActivePage, toggleCreateTemplate } from "../../store/view";

const rootUrl = "http://localhost:5000";

export default function NewMemeFlow(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.view.createTemplate);
  const theme = useTheme();
  const currentJob = useSelector((state: RootState) => state.createMeme.currentJob);

  const scroll = {
    overflowY: "scroll",
  };

  const onClose = () => {
    dispatch(setActivePage(Page.Home));
    dispatch(toggleCreateTemplate());
  };

  const renderSwitch = () => {
    switch (currentJob) {
      case 0:
        return null;
      case 1:
        return <TemplateGrid />;

      case 2:
        return <CreateMeme />;
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
          width: currentJob == 2 ? 900 : 600,
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
          }}
        >
          <button
            style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }}
            onClick={() => dispatch(setCurrentJob(Math.max(currentJob - 1, 1)))}
          >
            <ArrowLeftLine />
          </button>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Create new meme
          </Typography>
          <button
            style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }}
            onClick={() => dispatch(setCurrentJob(Math.min(currentJob + 1, 2)))}
          >
            <ArrowRightLine />
          </button>
        </Grid>
        {renderSwitch()}
      </Grid>
    </Modal>
  );
}

export function TemplateGrid(): JSX.Element {
  const [templates, setTemplates] = useState<any[] | null>(null);

  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    async function fetchTemplates() {
      const responseFromServer = await axios.get(`${rootUrl}/v1/templates`);
      console.log(responseFromServer);
      setTemplates([...responseFromServer.data]);
    }

    fetchTemplates();
  }, []);

  return (
    <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start", overflowY: "scroll" }}>
      {templates?.map((template) => (
        <Grid key={template._id}>
          <TemplateGridItem key={template._id} id={template._id} />
        </Grid>
      ))}
    </Grid>
  );
}

interface TemplateProps {
  id: string;
}

function TemplateGridItem(props: TemplateProps): JSX.Element {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${rootUrl}/storage/${props.id}`);
      console.log("response", response);
      setSignedUrl(response.data.data);
    }

    fetchSignedUrl();
  }, []);

  const onClick = () => {
    dispatch(setTemplateId(props.id));
    dispatch(setCurrentJob(2));
  };

  return (
    <button style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }} onClick={onClick}>
      {(!isLoaded || !signedUrl) && (
        <Box style={{ height: 150, width: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <BeatLoader color="#2F7EFE" loading={!isLoaded} />
        </Box>
      )}
      <img src={signedUrl!} alt="null" style={{ height: 150, width: 150, objectFit: "cover", display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
    </button>
  );
}

function CreateMeme(): JSX.Element {
  const templateId = useSelector((state: RootState) => state.createMeme.templateId);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState<number[] | null>(null);
  const [textInputs, setTextInputs] = useState<TextInput[]>([]);

  const handleClick = (e: any) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const nextTextInputs = [...textInputs];
    nextTextInputs.push({ x, y });
    setTextInputs(nextTextInputs);
  };

  const onClick = () => {
    const node = document.getElementById("meme");
    const scale = 1.5;

    const style = {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
      width: node!.offsetWidth + "px",
      height: node!.offsetHeight + "px",
    };

    const param = {
      height: node!.offsetHeight * scale,
      width: node!.offsetWidth * scale,
      quality: 1,
      style,
      type: "image/png",
    };

    return domtoimage.toPng(node!, param).then((data) => {
      saveAs(data, "img.png");
    });
  };

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${rootUrl}/storage/${templateId}`);
      console.log("response", response);
      setSignedUrl(response.data.data);
    }

    fetchSignedUrl();
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        maxHeight: 900,
        width: "100%",
      }}
    >
      <Grid container style={{ display: "flex", overflowY: "scroll", overscrollBehavior: "scroll" }}>
        {(!isLoaded || !signedUrl) && (
          <Box style={{ height: 550, width: 550, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <BeatLoader color="#2F7EFE" loading={!isLoaded} />
          </Box>
        )}
        <Box style={{ cursor: "text", position: "relative" }} onClick={handleClick} id="meme">
          <img src={signedUrl!} alt="null" style={{ minWidth: 600, maxWidth: 600, maxHeight: "100%", display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
          {textInputs.map((textInput) => (
            <Box key={`${textInput.x}, ${textInput.y}`} style={{ position: "absolute", top: textInput.y, left: textInput.x }}>
              <UserInput />
            </Box>
          ))}
        </Box>
      </Grid>

      <Grid style={{ display: "flex", backgroundColor: "red", minWidth: 300 }}>
        <Typography>Inspect</Typography>

        <button onClick={onClick}>Create Meme</button>
      </Grid>
    </Box>
  );
}

function UserInput(): JSX.Element {
  const [input, setInput] = useState<string | null>(null);
  const theme = useTheme();

  const onClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    // <input
    //   value={input ?? ""}
    //   placeholder="TODO"
    //   onClick={onClick}
    //   onChange={onChange}
    //   style={{
    //     boxShadow: "none",
    //     border: "none",
    //     backgroundColor: "transparent",
    //     fontFamily: "roboto",
    //     color: "black",
    //     fontSize: 36,
    //     fontWeight: "bold",
    //     outline: "none",
    //     textTransform: "uppercase",
    //     maxWidth: 200,
    //   }}
    // />

    <Typography
      style={{
        boxShadow: "none",
        border: "none",
        backgroundColor: "white",
        fontFamily: "roboto",
        color: "black",
        fontSize: 48,
        fontWeight: "bold",
        outline: "none",
      }}
    >
      TODO
    </Typography>
  );
}
