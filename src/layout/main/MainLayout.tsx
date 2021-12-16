import loadable from "@loadable/component";
import { Box, Grid, TextField, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import HomeIcon from "../../assets/icons/HomeIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import { User } from "../../types";

interface Props {
  user: User;
  pageName: string;
}

export default function MainLayout(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/Main/${props.pageName}`));
  const theme = useTheme();
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
            <HomeIcon fill={theme.palette.text.primary} height={32} width={32} />
            <img src={props.user.picture} alt="avatar" style={{ width: 30, height: 30, borderRadius: 50 }} />
          </Box>
        </Box>
        <Box style={{ marginTop: 100 }}>
          <Page user={props.user} />
        </Box>
      </Box>
    </Grid>
  );
}
