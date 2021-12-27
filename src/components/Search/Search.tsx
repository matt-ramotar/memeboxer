import { Grid, TextField, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import SearchIcon from "../../assets/icons/SearchIcon";
import { setInput } from "../../store/search";

export default function Search(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const onChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      dispatch(setInput(searchInput));
      navigate(`/search`);
    }
  };
  return (
    <Grid item xs={4}>
      <TextField
        onKeyDown={onKeyDown}
        style={{ padding: 5, border: `1px solid ${theme.palette.divider}`, width: 300 }}
        InputProps={{ disableUnderline: true, startAdornment: <SearchIcon fill={theme.palette.divider} height={32} width={32} />, endAdornment: null }}
        value={searchInput}
        onChange={onChange}
      />
    </Grid>
  );
}
