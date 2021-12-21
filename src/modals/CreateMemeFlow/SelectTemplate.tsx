import { Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import TemplateGridItem from "../../components/CreateMemeFlow/TemplateGridItem";
import { API_URL } from "../../util/secrets";

export default function SelectTemplate(): JSX.Element {
  const [templates, setTemplates] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      const responseFromServer = await axios.get(`${API_URL}/v1/templates`);

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
