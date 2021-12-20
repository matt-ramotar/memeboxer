import { Box, Grid } from "@material-ui/core";
import axios from "axios";
import domtoimage from "dom-to-image";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import MemeTextInput from "../../components/CreateMemeFlow/MemeTextInput";
import Toolbar from "../../components/Toolbar";
import { TextInput } from "../../pages/App/App";
import { RootState } from "../../store";
import { addComponent, setColor, setData, TextComponent } from "../../store/createMeme";
import { setLastColorPicked, toggleColorPicker } from "../../store/view";
import { API_URL } from "../../util/secrets";

export default function CreateMeme(): JSX.Element {
  const templateId = useSelector((state: RootState) => state.createMeme.templateId);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const [textInputs, setTextInputs] = useState<TextInput[]>([]);
  const componentMap = useSelector((state: RootState) => state.createMeme.componentMap);
  const activeComponent = useSelector((state: RootState) => state.createMeme.activeComponent);
  const [textComponents, setTextComponents] = useState<TextComponent[]>([]);

  const colorPickerIsVisible = useSelector((state: RootState) => state.view.colorPicker);
  const color = useSelector((state: RootState) => state.createMeme.componentMap[activeComponent ?? ""]);

  const handleClick = (e: any) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const id = uuidv4().split("-")[0];

    const textComponent: TextComponent = {
      id,
      text: "TODO",
      layout: { startX: x, startY: y, rotation: { isPositive: true, degrees: 0 } },
      style: { color: "#000", fontSize: 40, fontFamily: "roboto", isBold: false, isItalic: false },
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
      const response = await axios.get(`${API_URL}/storage/${templateId}`);
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
        overflowY: "scroll",
      }}
    >
      <Toolbar />

      <div style={{ position: "relative", display: "flex", overflowY: "scroll" }}>
        <div style={{ display: colorPickerIsVisible ? "flex" : "none", position: "absolute", top: 0, right: 10, zIndex: 1000 }}>
          <SketchPicker
            onChange={(color: any) => {
              dispatch(setColor(color.hex));
              dispatch(setLastColorPicked(color.hex));
              dispatch(toggleColorPicker(!colorPickerIsVisible));
            }}
            style={{ zIndex: 10001 }}
            color={color}
          />
        </div>

        <Grid container style={{ display: "flex", overflowY: "scroll", overscrollBehavior: "scroll" }}>
          {(!isLoaded || !signedUrl) && (
            <Box style={{ height: 550, width: 600, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <BeatLoader color="#0160FE" loading={!isLoaded} />
            </Box>
          )}

          <Grid style={{ display: "flex", cursor: "text", position: "relative" }} onClick={handleClick} id="meme">
            <img src={signedUrl!} alt="null" style={{ minWidth: 600, maxWidth: 600, display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
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
                <MemeTextInput textComponent={textComponent} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
