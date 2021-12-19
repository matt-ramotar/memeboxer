import { Box, Modal, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { RootState } from "../../store";
import { Page, setActivePage, toggleCreateTemplate } from "../../store/view";

const rootUrl = "http://localhost:5000";

export default function NewMemeFlow(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.view.createTemplate);
  const theme = useTheme();

  const onClose = () => {
    dispatch(setActivePage(Page.Home));
    dispatch(toggleCreateTemplate());
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.85)" } }}
    >
      <Box style={{ backgroundColor: theme.palette.background.paper, width: 600, height: 600, overflowY: "scroll" }}>
        <TemplateGrid />
      </Box>
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
    <Box style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {templates?.map((template) => (
        <Template key={template._id} id={template._id} />
      ))}
    </Box>
  );
}

interface TemplateProps {
  id: string;
}

function Template(props: TemplateProps): JSX.Element {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${rootUrl}/storage/${props.id}`);
      console.log("response", response);
      setSignedUrl(response.data.data);
    }

    fetchSignedUrl();
  }, []);

  return (
    <div>
      {(!isLoaded || !signedUrl) && (
        <Box style={{ height: 150, width: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <BeatLoader color="#2F7EFE" loading={!isLoaded} />
        </Box>
      )}
      <img src={signedUrl!} alt="null" style={{ height: 150, width: 150, objectFit: "cover", display: isLoaded ? "inline" : "none" }} onLoad={() => setIsLoaded(true)} />
    </div>
  );
}
