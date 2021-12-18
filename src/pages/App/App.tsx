import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

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

      <Grid style={{ position: "relative", width: 400 }} onClick={handleClick}>
        <img src="https://memegenerator.net/img/images/400x/3459374.jpg" alt="bad-luck-brian" style={{ width: 400 }} />

        {textInputs.map((textInput) => (
          <Box key={`${textInput.x}, ${textInput.y}`} style={{ position: "absolute", top: textInput.y, left: textInput.x }}>
            <TextInput />
          </Box>
        ))}
      </Grid>
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
