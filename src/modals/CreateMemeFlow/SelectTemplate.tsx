import { Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TemplateGridItem from "./TemplateGridItem";

const rootUrl = "http://localhost:5000";

export default function SelectTemplate(): JSX.Element {
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
