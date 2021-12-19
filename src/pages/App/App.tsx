import { Box, Grid, Typography } from "@material-ui/core";
import domtoimage from "dom-to-image";
import React, { useEffect, useState } from "react";

export default function App(): JSX.Element {
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

  useEffect(() => {
    console.log(start, end);
  }, [start, end]);

  return (
    <Grid style={{ width: "100vw", height: "100vh" }}>
      <Typography style={{ color: "black" }}>App</Typography>

      <Grid style={{ position: "relative", width: 600 }} onClick={handleClick} id="meme">
        <img src="https://memeboxer.s3.us-east-2.amazonaws.com/tag" alt="bad-luck-brian" style={{ width: 600 }} />

        {textInputs.map((textInput) => (
          <Box key={`${textInput.x}, ${textInput.y}`} style={{ position: "absolute", top: textInput.y, left: textInput.x }}>
            <TextInput />
          </Box>
        ))}
      </Grid>

      <button
        onClick={() => {
          const node = document.getElementById("meme");
          const scale = 1.25;

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
          };

          return domtoimage.toPng(node!, param).then((dataUrl) => {
            const img = new window.Image();
            img.src = dataUrl;
            console.log(JSON.stringify(dataUrl));
            document.body.appendChild(img);
          });
        }}
      >
        <Typography>Snap</Typography>
      </button>
    </Grid>
  );
}

interface TextInput {
  x: number;
  y: number;
}

function TextInput() {
  return (
    <Typography variant="h3" style={{ backgroundColor: "white", fontFamily: "roboto", fontWeight: "bold" }}>
      TODO
    </Typography>
  );
}
