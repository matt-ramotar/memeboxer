import { TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import UploadFileIcon from "../../assets/icons/UploadFileIcon";
import { RootState } from "../../store";

export default function CreateTemplate(): JSX.Element {
  const [name, setName] = useState<string | null>(null);

  const userId = useSelector((state: RootState) => state.user.id);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDropAccepted: async (files) => await uploadFile(files),
  });

  async function uploadFile(files: any[]) {
    const responseFromServer = await axios.post("http://localhost:5000/v1/templates", { name, userId });
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

      await axios.post(`http://localhost:5000/v1/templates/${await id}/tag`, { entityTag: cleanEntityTag });
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
    </div>
  );
}
