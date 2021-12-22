import loadable from "@loadable/component";
import { Box, Grid, TextField, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "../../assets/icons/SearchIcon";
import Memeboxer from "../../images/Memeboxer.png";
import CreateMemeFlow from "../../modals/CreateMemeFlow/CreateMemeFlow";
import { User } from "../../types";
import CreateButton from "./CreateButton";
import ExploreButton from "./ExploreButton";
import HomeButton from "./HomeButton";
import NotificationButton from "./NotificationButton";

interface Props {
  user: User;
  pageName: string;
}

export default function MainLayout(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/Main/${props.pageName}`));
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  return (
    <Grid style={{ flexDirection: "column", justifyContent: "start" }}>
      <Box>
        <Box
          style={{
            width: "100vw",
            height: 80,
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
            zIndex: 100000,

            position: "fixed",
            top: 0,
          }}
        >
          <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={Memeboxer} alt="Memeboxer" style={{ height: 50 }} />
            <Typography variant="h5" style={{ fontFamily: "Space Mono", fontWeight: "bold", marginLeft: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
              Memeboxer
            </Typography>
          </Box>

          <TextField
            style={{ width: 300, padding: 5, border: `1px solid ${theme.palette.divider}` }}
            InputProps={{ disableUnderline: true, startAdornment: <SearchIcon fill={theme.palette.divider} height={32} width={32} />, endAdornment: null }}
            value={searchInput}
            onChange={(value) => setSearchInput(value.target.value)}
          />

          <Grid container style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 8, paddingRight: 8, justifyContent: "space-between", width: 220, flexWrap: "nowrap" }}>
            <HomeButton fill={theme.palette.text.primary} height={32} width={32} />

            <ExploreButton fill={theme.palette.text.primary} height={32} width={32} />

            <CreateButton fill={theme.palette.text.primary} height={32} width={32} />
            <NotificationButton fill={theme.palette.text.primary} height={32} width={32} />

            <button
              style={{ margin: 0, padding: 0, height: 32, backgroundColor: "transparent", boxShadow: "none", border: "none", display: "flex", cursor: "pointer" }}
              onClick={() => navigate(`/${props.user.username}`)}
            >
              <img src={props.user.picture} alt="avatar" style={{ width: 30, height: 30, borderRadius: 50 }} />
            </button>
          </Grid>
        </Box>
        <Box style={{ marginTop: 100, width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <CreateMemeFlow />
          <Page user={props.user} />
        </Box>
      </Box>
    </Grid>
  );
}
