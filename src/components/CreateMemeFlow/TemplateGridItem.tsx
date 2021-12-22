import { Box, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { setCurrentJob, setTemplateId } from "../../store/createMeme";
import { STORAGE_URL } from "../../util/secrets";

interface TemplateProps {
  id: string;
}

export default function TemplateGridItem(props: TemplateProps): JSX.Element {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    async function fetchSignedUrl() {
      setSignedUrl(`${STORAGE_URL}/${props.id}`);
    }

    fetchSignedUrl();
  }, [props.id]);

  const onClick = () => {
    dispatch(setTemplateId(props.id));
    dispatch(setCurrentJob(2));
  };

  return (
    <button style={{ margin: 0, padding: 0, border: "none", boxShadow: "none", backgroundColor: "transparent", display: "flex" }} onClick={onClick}>
      {(!isLoaded || !signedUrl) && (
        <Box style={{ height: 150, width: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <BeatLoader color={theme.palette.primary.main} loading={!isLoaded} />
        </Box>
      )}
      <img src={signedUrl ?? ""} alt="null" style={{ height: 150, width: 150, objectFit: "cover", display: isLoaded ? "flex" : "none", margin: 0, padding: 0 }} onLoad={() => setIsLoaded(true)} />
    </button>
  );
}
