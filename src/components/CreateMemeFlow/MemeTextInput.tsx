import { Box, TextField, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { RootState } from "../../store";
import { removeComponent, setActiveComponent, setText, TextComponent } from "../../store/createMeme";

export default function MemeTextInput({ textComponent }: { textComponent: TextComponent }): JSX.Element {
  const dispatch = useDispatch();
  const realComponent = useSelector((state: RootState) => state.createMeme.componentMap[textComponent.id]);

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
        <TextField
          placeholder="Todo"
          value={input}
          InputProps={{
            disableUnderline: true,
            style: {
              fontSize: realComponent.style.fontSize,
              fontFamily: realComponent.style.fontFamily,
              color: realComponent.style.color,
              fontWeight: realComponent.style.isBold ? "bold" : "normal",
              fontStyle: realComponent.style.isItalic ? "italic" : "normal",
            },
          }}
          onChange={onChange}
        />
      </Box>
    </Rnd>
  );
}
