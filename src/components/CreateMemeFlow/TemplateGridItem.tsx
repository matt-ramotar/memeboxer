import { Box } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { setCurrentJob, setTemplateId } from "../../store/createMeme";
import { API_URL } from "../../util/secrets";

interface Props {
  id: string;
}

function TemplateGridItem(props: Props): JSX.Element {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${API_URL}/storage/${props.id}`);
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
          <BeatLoader color="#0160FE" loading={!isLoaded} />
        </Box>
      )}
      <img src={signedUrl!} alt="null" style={{ height: 150, width: 150, objectFit: "cover", display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
    </button>
  );
}
