import { Grid, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Users from "../../components/Search/Users";
import { RootState } from "../../store";
import { Page, setActivePage } from "../../store/view";
import { MAIN_NAV_HEIGHT } from "../../theme";
import { SearchResults } from "../../types";
import { API_URL } from "../../util/secrets";

export default function Search(): JSX.Element | null {
  const theme = useTheme();
  const dispatch = useDispatch();

  const searchInput = useSelector((state: RootState) => state.search.input);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await axios.post(`${API_URL}/v1/search`, { input: searchInput });
      setSearchResults(response.data);
    }

    if (searchInput) {
      fetchSearchResults();
    }
  }, [searchInput]);

  useEffect(() => {
    dispatch(setActivePage(Page.Search));
  }, []);

  const renderSwitch = () => {
    switch (activeTab) {
      case 0:
        return null;
      case 1:
        return null;
      case 2:
        return null;
      case 3:
        return null;
      case 4:
        return <Users users={searchResults?.users ?? []} />;
    }
  };

  if (!searchResults) return null;

  return (
    <Grid container style={{ minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px)`, flexDirection: "column", alignItems: "center", marginTop: 0 }}>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          width: 800,
          minHeight: `calc(100vh - 32px - ${MAIN_NAV_HEIGHT}px)`,
          marginTop: 16,
          borderRadius: 8,
          padding: 32,
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
        }}
      >
        <Grid container style={{ width: "100%" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Search results for {`"${searchInput}"`}
          </Typography>
        </Grid>

        <Grid container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-start", marginTop: 16 }}>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: 16,
              borderBottom: activeTab == 0 ? "1px solid black" : "none",
              fontWeight: activeTab == 0 ? "bold" : "normal",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab(0)}
          >
            <Typography style={{ marginRight: 4, fontWeight: activeTab == 0 ? "bold" : "normal" }}>Memes</Typography>
            <Typography style={{ fontWeight: activeTab == 0 ? "bold" : "normal" }}>{searchResults.memes.length}</Typography>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: 16,
              borderBottom: activeTab == 1 ? "1px solid black" : "none",
              fontWeight: activeTab == 1 ? "bold" : "normal",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab(1)}
          >
            <Typography style={{ marginRight: 4, fontWeight: activeTab == 1 ? "bold" : "normal" }}>Comments</Typography>
            <Typography style={{ fontWeight: activeTab == 1 ? "bold" : "normal" }}>{searchResults.comments.length}</Typography>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: 16,
              cursor: "pointer",
              borderBottom: activeTab == 2 ? "1px solid black" : "none",
              fontWeight: activeTab == 2 ? "bold" : "normal",
            }}
            onClick={() => setActiveTab(2)}
          >
            <Typography style={{ marginRight: 4, fontWeight: activeTab == 2 ? "bold" : "normal" }}>Tags</Typography>
            <Typography style={{ fontWeight: activeTab == 2 ? "bold" : "normal" }}>{searchResults.tags.length}</Typography>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: 16,
              cursor: "pointer",
              borderBottom: activeTab == 3 ? "1px solid black" : "none",
              fontWeight: activeTab == 3 ? "bold" : "normal",
            }}
            onClick={() => setActiveTab(3)}
          >
            <Typography style={{ marginRight: 4, fontWeight: activeTab == 3 ? "bold" : "normal" }}>Templates</Typography>
            <Typography style={{ fontWeight: activeTab == 3 ? "bold" : "normal" }}>{searchResults.templates.length}</Typography>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: 16,
              cursor: "pointer",
              borderBottom: activeTab == 4 ? "1px solid black" : "none",
            }}
            onClick={() => setActiveTab(4)}
          >
            <Typography style={{ marginRight: 4, fontWeight: activeTab == 4 ? "bold" : "normal" }}>Users</Typography>
            <Typography style={{ fontWeight: activeTab == 4 ? "bold" : "normal" }}>{searchResults.users.length}</Typography>
          </Grid>
        </Grid>

        <Grid container style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: `calc(100vh - ${MAIN_NAV_HEIGHT}px - 132px)`, paddingTop: 16 }}>
          {renderSwitch()}
        </Grid>
      </Grid>
    </Grid>
  );
}
