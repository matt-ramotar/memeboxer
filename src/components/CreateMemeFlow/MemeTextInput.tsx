import { Box, TextField, useTheme } from "@material-ui/core";
import buzzphrase from "buzzphrase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { RootState } from "../../store";
import { removeComponent, setActiveComponent, setText, TextComponent } from "../../store/createMeme";

export default function MemeTextInput({ textComponent }: { textComponent: TextComponent }): JSX.Element | null {
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

  if (!realComponent) return null;

  return (
    <Rnd minWidth={100} size={{ width: 200, height: 200 }}>
      <Box onClick={onClick} onContextMenu={onClick} style={{ cursor: "pointer", padding: 4, border: "3px solid #00D9E1", display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <TextField
          placeholder={buzzphrase.get({
            format: "{i} {a} {n}",
            iterations: 1,
          })}
          value={input}
          id="no"
          multiline
          InputProps={{
            disableUnderline: true,
            style: {
              fontSize: realComponent.style.fontSize,
              fontFamily: realComponent.style.fontFamily,
              color: realComponent.style.color,
              fontWeight: realComponent.style.isBold ? "bold" : "normal",
              fontStyle: realComponent.style.isItalic ? "italic" : "normal",
              WebkitTextStrokeWidth: realComponent.style.fontFamily == "Impact" ? 2 : 0,
              WebkitTextStrokeColor: realComponent.style.fontFamily == "Impact" ? "#000" : "transparent",
              letterSpacing: realComponent.style.fontFamily == "Impact" ? 4 : 0,
              textTransform: realComponent.style.fontFamily == "Impact" ? "uppercase" : "none",
              paddingLeft: 8,
              textAlign: "center",
            },
          }}
          onChange={onChange}
        />
      </Box>
    </Rnd>
  );
}
