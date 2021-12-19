import { Box, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import UploadFileIcon from "../../assets/icons/UploadFileIcon";
import { RootState } from "../../store";
const rootUrl = "http://localhost:5000";

export default function CreateTemplate(): JSX.Element {
  const [name, setName] = useState<string | null>(null);
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

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDropAccepted: async (files) => await uploadFile(files),
  });

  async function uploadFile(files: any[]) {
    const responseFromServer = await axios.post(`${rootUrl}/v1/templates`, { name, userId });
    const { id } = responseFromServer.data;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target?.result;

      const body = {
        content,
        key: await id,
        contentEncoding: "base64",
        contentType: "image/png",
      };

      const response = await axios.post("http://localhost:5000/storage/png", body);

      const entityTag = (await response.data.data.ETag) as string;
      const cleanEntityTag = entityTag.replaceAll(/['"]+/g, "");

      await axios.post(`${rootUrl}/v1/templates/${await id}/tag`, { entityTag: cleanEntityTag });
    };

    reader.readAsDataURL(files[0]);
  }

  return (
    <div className="container">
      <TextField placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ color: "black" }} />
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{ backgroundColor: "#fdfdfd", border: "1px dashed #bdbdbd", height: 300, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      >
        <input {...getInputProps()} />
        <UploadFileIcon height={32} width={32} fill="#262626" />
        <Typography variant="h5" style={{ fontFamily: "roboto", color: "#262626", marginTop: 20 }}>
          Drag image here
        </Typography>
      </div>

      <Box>
        {templates?.map((template) => (
          <Template key={template._id} id={template._id} />
        ))}
      </Box>
    </div>
  );
}

interface TemplateProps {
  id: string;
}

function Template(props: TemplateProps): JSX.Element {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      const response = await axios.get(`${rootUrl}/storage/${props.id}`);
      console.log("response", response);
      setSignedUrl(response.data.data);
    }

    fetchSignedUrl();
  }, []);

  if (signedUrl) {
    return <img src={signedUrl} alt="null" style={{ height: 200, width: 200, objectFit: "cover" }} />;
  }
  return <Typography>Loading</Typography>;
}
