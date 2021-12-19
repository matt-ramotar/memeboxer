import { Box, Grid, Modal, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import ArrowLeftLine from "../../assets/icons/ArrowLeftLine";
import ArrowRightLine from "../../assets/icons/ArrowRightLine";
import { RootState } from "../../store";
import { setCurrentJob, setTemplateId } from "../../store/createMeme";
import { Page, setActivePage, toggleCreateTemplate } from "../../store/view";

const rootUrl = "http://localhost:5000";

export default function NewMemeFlow(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.view.createTemplate);
  const theme = useTheme();
  const currentJob = useSelector((state: RootState) => state.createMeme.currentJob);

  const scroll = {
    overflowY: "scroll",
  };

  const onClose = () => {
    dispatch(setActivePage(Page.Home));
    dispatch(toggleCreateTemplate());
  };

  const renderSwitch = () => {
    switch (currentJob) {
      case 0:
        return null;
      case 1:
        return <TemplateGrid />;

      case 2:
        return <CreateMeme />;
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: currentJob == 1 ? "scroll" : "hidden",
        overscrollBehavior: currentJob == 1 ? "scroll" : "none",
        scrollBehavior: currentJob == 1 ? "smooth" : "unset",
      }}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.85)" } }}
    >
      <Grid
        container
        style={{
          backgroundColor: theme.palette.background.paper,
          width: currentJob == 2 ? 900 : 600,
          height: 600,
          borderRadius: 10,
          display: "flex",
          overflowY: currentJob == 1 ? "scroll" : "hidden",
          overscrollBehavior: currentJob == 1 ? "scroll" : "none",
          position: "relative",
          paddingBottom: 0,
        }}
      >
        <Grid
          container
          style={{
            backgroundColor: theme.palette.background.paper,
            width: "100vw",
            height: 40,
            position: "sticky",
            top: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }}
            onClick={() => dispatch(setCurrentJob(Math.max(currentJob - 1, 1)))}
          >
            <ArrowLeftLine />
          </button>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Create new meme
          </Typography>
          <button
            style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }}
            onClick={() => dispatch(setCurrentJob(Math.min(currentJob + 1, 2)))}
          >
            <ArrowRightLine />
          </button>
        </Grid>
        {renderSwitch()}
      </Grid>
    </Modal>
  );
}

export function TemplateGrid(): JSX.Element {
  const [templates, setTemplates] = useState<any[] | null>(null);

  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    async function fetchTemplates() {
      const responseFromServer = await axios.get(`${rootUrl}/v1/templates`);
      console.log(responseFromServer);
      setTemplates([...responseFromServer.data]);
    }

    fetchTemplates();
  }, []);

  return (
    <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start", overflowY: "scroll" }}>
      {templates?.map((template) => (
        <Grid key={template._id}>
          <TemplateGridItem key={template._id} id={template._id} />
        </Grid>
      ))}
    </Grid>
  );
}

interface TemplateProps {
  id: string;
}

function TemplateGridItem(props: TemplateProps): JSX.Element {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${rootUrl}/storage/${props.id}`);
      console.log("response", response);
      setSignedUrl(response.data.data);
    }

    fetchSignedUrl();
  }, []);

  const onClick = () => {
    dispatch(setTemplateId(props.id));
    dispatch(setCurrentJob(2));
  };

  return (
    <button style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }} onClick={onClick}>
      {(!isLoaded || !signedUrl) && (
        <Box style={{ height: 150, width: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <BeatLoader color="#2F7EFE" loading={!isLoaded} />
        </Box>
      )}
      <img src={signedUrl!} alt="null" style={{ height: 150, width: 150, objectFit: "cover", display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
    </button>
  );
}

function CreateMeme(): JSX.Element {
  const templateId = useSelector((state: RootState) => state.createMeme.templateId);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${rootUrl}/storage/${templateId}`);
      console.log("response", response);
      setSignedUrl(response.data.data);
    }

    fetchSignedUrl();
  }, []);

  const onClick = () => {
    dispatch(setCurrentJob(3));
  };

  const onScroll = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box
      style={{
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
        height: "100%",

        display: "flex",
        flexDirection: "row",
        overscrollBehaviorY: "contain",
      }}
      onClick={onClick}
    >
      <Grid container style={{ display: "flex", overflowY: "scroll" }}>
        {(!isLoaded || !signedUrl) && (
          <Box style={{ height: 550, width: 550, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <BeatLoader color="#2F7EFE" loading={!isLoaded} />
          </Box>
        )}
        <div style={{ overflowY: "scroll" }}>
          <img src={signedUrl!} alt="null" style={{ width: 600, height: "100%", display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
        </div>
      </Grid>

      <Inspect />
    </Box>
  );
}

function Inspect(): JSX.Element {
  return (
    <Box>
      <Typography>Inspect</Typography>
    </Box>
  );
}
