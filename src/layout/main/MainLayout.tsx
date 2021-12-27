import loadable from "@loadable/component";
import { Grid, Typography, useTheme } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Search from "../../components/Search/Search";
import Memeboxer from "../../images/Memeboxer.png";
import CreateMemeFlow from "../../modals/CreateMemeFlow/CreateMemeFlow";
import { MAIN_NAV_HEIGHT } from "../../theme";
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
  const dispatch = useDispatch();

  return (
    <Grid style={{ flexDirection: "column", justifyContent: "start" }}>
      <Grid container style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
        <Grid
          container
          style={{
            width: "100vw",
            height: MAIN_NAV_HEIGHT,
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            position: "fixed",
            flexWrap: "nowrap",
            zIndex: 2,
            top: 0,
          }}
        >
          <Grid item xs={3} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: 0 }}>
            <img src={Memeboxer} alt="Memeboxer" style={{ height: 50 }} />
            <Typography variant="h5" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", marginLeft: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
              memeboxer
            </Typography>
          </Grid>

          <Search />

          <Grid item xs={3} container style={{ display: "flex", flexDirection: "row", alignItems: "center", maxWidth: 220, justifyContent: "space-between", flexWrap: "nowrap" }}>
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
        </Grid>
        <Grid
          container
          style={{
            paddingTop: MAIN_NAV_HEIGHT,
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          <CreateMemeFlow />
          <Page user={props.user} />
        </Grid>
      </Grid>
    </Grid>
  );
}
