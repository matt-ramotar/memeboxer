import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import MemeTextInput from "../../components/CreateMemeFlow/MemeTextInput";
import Toolbar from "../../components/Toolbar";
import { RootState } from "../../store";
import { addComponent, setActiveComponent, setColor, TextComponent } from "../../store/createMeme";
import { setLastColorPicked } from "../../store/theme";
import { toggleColorPicker } from "../../store/view";
import { STORAGE_URL } from "../../util/secrets";

export default function CreateMeme(): JSX.Element {
  const templateId = useSelector((state: RootState) => state.createMeme.templateId);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const componentMap = useSelector((state: RootState) => state.createMeme.componentMap);
  const activeComponent = useSelector((state: RootState) => state.createMeme.activeComponent);
  const [textComponents, setTextComponents] = useState<TextComponent[]>([]);

  const colorPickerIsVisible = useSelector((state: RootState) => state.view.colorPicker);
  const color = useSelector((state: RootState) => state.createMeme.componentMap[activeComponent ?? ""]);

  const lastColorPicked = useSelector((state: RootState) => state.theme.lastColorPicked);
  const lastFontFamilyPicked = useSelector((state: RootState) => state.theme.lastFontFamilyPicked);
  const lastFontSize = useSelector((state: RootState) => state.theme.lastFontSize);
  const lastIsBold = useSelector((state: RootState) => state.theme.lastIsBold);
  const lastIsItalic = useSelector((state: RootState) => state.theme.lastIsItalic);

  const numComponents = Object.keys(componentMap).length;

  const handleClick = (e: any) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const id = uuidv4().split("-")[0];

    const textComponent: TextComponent = {
      id,
      text: "",
      layout: { startX: x, startY: y, rotation: { isPositive: true, degrees: 0 } },
      style: { color: lastColorPicked, fontSize: lastFontSize, fontFamily: lastFontFamilyPicked, isBold: lastIsBold, isItalic: lastIsItalic },
      size: { width: 200 },
    };

    dispatch(addComponent(textComponent));
    dispatch(setActiveComponent(id));
  };

  useEffect(() => {
    setTextComponents(Object.values(componentMap));
  }, [numComponents, componentMap]);

  useEffect(() => {
    async function fetchSignedUrl() {
      setSignedUrl(`${STORAGE_URL}/${templateId}`);
    }

    fetchSignedUrl();
  }, [templateId]);

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
            <img src={signedUrl ?? ""} alt="null" style={{ minWidth: 600, maxWidth: 600, display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
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
