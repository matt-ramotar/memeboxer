import { Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "../../assets/icons/UploadFileIcon";

export default function CreateTemplate(): JSX.Element {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDropAccepted: async (files) => await uploadFile(files),
  });

  async function uploadFile(files: any[]) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      console.log(e);

      const content = e.target?.result;

      const body = {
        content,
        key: "test",
        contentEncoding: "base64",
        contentType: "image/png",
      };

      const response = await axios.post("http://localhost:5000/storage/png", body);

      console.log(response.data);
    };
    reader.readAsDataURL(files[0]);
  }

  return (
    <div className="container">
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
