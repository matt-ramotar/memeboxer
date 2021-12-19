import loadable from "@loadable/component";
import { Box, Grid, TextField, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "../../assets/icons/SearchIcon";
import { RootState } from "../../store";
import { User } from "../../types";
import CreateButton from "./CreateButton";
import HomeButton from "./HomeButton";
import NewMemeFlow from "./NewMemeFlow";

interface Props {
  user: User;
  pageName: string;
}

export default function MainLayout(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/Main/${props.pageName}`));
  const theme = useTheme();

  const activePage = useSelector((state: RootState) => state.view.activePage);

  const [searchInput, setSearchInput] = useState("");

  return (
    <Grid style={{ flexDirection: "column", justifyContent: "start" }}>
      <Box>
        <Box
          style={{
            width: "100vw",
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "10%",
            paddingRight: "10%",
            paddingTop: 20,
            paddingBottom: 20,

            position: "fixed",
            top: 0,
          }}
        >
          <Typography variant="h5" style={{ fontFamily: "Space Mono", fontWeight: "bold" }}>
            Memeboxer
          </Typography>

          <TextField
            style={{ width: 300, padding: 5, border: `1px solid ${theme.palette.divider}` }}
            InputProps={{ disableUnderline: true, startAdornment: <SearchIcon fill={theme.palette.divider} height={32} width={32} />, endAdornment: null }}
            value={searchInput}
            onChange={(value) => setSearchInput(value.target.value)}
          />

          <Box>
            <HomeButton fill={theme.palette.text.primary} height={32} width={32} />
            <CreateButton fill={theme.palette.text.primary} height={32} width={32} />
            <img src={props.user.picture} alt="avatar" style={{ width: 30, height: 30, borderRadius: 50 }} />
          </Box>
        </Box>
        <Box style={{ marginTop: 100, width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <NewMemeFlow />
          <Page user={props.user} />
        </Box>
      </Box>
    </Grid>
  );
}
