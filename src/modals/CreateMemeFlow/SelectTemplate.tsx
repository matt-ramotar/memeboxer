import { Box, Grid, TextField, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import domtoimage from "dom-to-image";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { BeatLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import Toolbar from "../../components/Toolbar";
import { TextInput } from "../../pages/App/App";
import { RootState } from "../../store";
import { addComponent, removeComponent, setActiveComponent, setCurrentJob, setData, setTemplateId, setText, TextComponent } from "../../store/createMeme";

const rootUrl = "http://localhost:5000";

export default function SelectTemplate(): JSX.Element {
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
          <BeatLoader color="#0160FE" loading={!isLoaded} />
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
  const componentMap = useSelector((state: RootState) => state.createMeme.componentMap);
  const [textComponents, setTextComponents] = useState<TextComponent[]>([]);
  const theme = useTheme();

  const [color, setColor] = useState("#0160FE");

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (e: any) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const id = uuidv4().split("-")[0];

    const textComponent: TextComponent = {
      id,
      text: "TODO",
      layout: { startX: x, startY: y, rotation: { isPositive: true, degrees: 0 } },
      style: { color: "#262626", fontSize: 40 },
      size: { width: 200 },
    };

    dispatch(addComponent(textComponent));

    const nextTextInputs = [...textInputs];
    nextTextInputs.push({ x, y, id });
    setTextInputs(nextTextInputs);
  };

  useEffect(() => {
    setTextComponents(Object.values(componentMap));
  }, [Object.keys(componentMap).length]);

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
      dispatch(setData(data));
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
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: 900,
        width: "100%",
      }}
    >
      <Toolbar />

      <div style={{ position: "relative" }}>
        <div style={{ display: isVisible ? "inline" : "none", position: "absolute", top: 0, right: 10, zIndex: 1000 }}>
          <SketchPicker
            onChange={(color: any) => {
              setColor(color.hex);
              setIsVisible(false);
            }}
            style={{ zIndex: 10001 }}
            color={color}
          />
        </div>
        <Grid container style={{ display: "flex", overflowY: "scroll", overscrollBehavior: "scroll" }}>
          {(!isLoaded || !signedUrl) && (
            <Box style={{ height: 550, width: 550, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <BeatLoader color="#0160FE" loading={!isLoaded} />
            </Box>
          )}

          <Box style={{ cursor: "text", position: "relative" }} onClick={handleClick} id="meme">
            <img src={signedUrl!} alt="null" style={{ minWidth: 600, maxWidth: 600, maxHeight: "100%", display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
            {textComponents.map((textComponent) => (
              <Box
                key={textComponent.id}
                style={{
                  position: "absolute",
                  top: textComponent.layout.startY,
                  left: textComponent.layout.startX,
                  transform: `rotate(${textComponent.layout.rotation.isPositive ? "+" : "-"}${textComponent.layout.rotation.degrees}deg)`,
                }}
              >
                <UserInput textComponent={textComponent} />
              </Box>
            ))}
          </Box>
        </Grid>
      </div>
    </Box>
  );
}

function UserInput({ textComponent }: { textComponent: TextComponent }): JSX.Element {
  const dispatch = useDispatch();

  const [input, setInput] = useState<string | null>();
  const theme = useTheme();

  const onClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "contextmenu") {
      dispatch(removeComponent(textComponent.id));
    }

    dispatch(setActiveComponent(textComponent.id));
  };
  const onChange = (e: any) => {
    setInput(e.target.value);
    dispatch(setText(e.target.value));
  };

  return (
    <Rnd>
      <Box onClick={onClick} onContextMenu={onClick} style={{ cursor: "pointer", padding: 8, border: "3px solid #00D9E1" }}>
        <TextField placeholder="Todo" value={input} InputProps={{ disableUnderline: true }} onChange={onChange} />
      </Box>
    </Rnd>
  );
}

function PostMeme(): JSX.Element | null {
  const meme = useSelector((state: RootState) => state.createMeme.data);

  if (!meme) return null;

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
        <Box style={{ position: "relative" }}>
          <img src={meme} alt="null" style={{ minWidth: 600, maxWidth: 600, maxHeight: "100%", display: "flex", margin: 0, padding: 0 }} />
        </Box>
      </Grid>

      <Grid style={{ display: "flex", backgroundColor: "red", minWidth: 300 }}>
        <Typography>Inspect</Typography>
      </Grid>
    </Box>
  );
}
