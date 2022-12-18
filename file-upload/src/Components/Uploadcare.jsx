import React, {useState} from 'react';
import { Widget } from "@uploadcare/react-widget";
import FilesList from "./FilesList";
import Alert from "react-bootstrap/Alert";

function Uploadcare() {

    const [updateList, setUpdateList] = useState(false);
    const [showSizeAlert, setShowSizeAlert] = useState(false);
    const uploadFileChange = (info) => {
      console.log(info);
    };

    const acceptedFileTypes = "image/jpg,image/jpeg,image/png"

    const fileSizeLimit = () => {
        return function (fileInfo: FileInfo) {
          console.log(fileInfo);
          if (fileInfo.size > 1024 * 1024 * 5) {
            console.log("File is too big!");
            setShowSizeAlert(true);
            throw new Error("File is too big");
          }
        };
      };

    const validators = [fileSizeLimit()];
    const maxUploadLimit = 1

    const uploadFileSelect = (file) => {
        console.log(`file changed ${file}`);
        setUpdateList(false);
        //setShowSizeAlert(false);
        if (file) {
        file.progress((info) => console.log("File progress: ", info.progress));
        file.done((info) => setUpdateList(true));
        }
    };

  return (
   <>
    {showSizeAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowSizeAlert(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You can't upload files bigger than 5MB.</p>
        </Alert>
      )}

      <div className="ucare">
        <div className="upload">
          <label htmlFor="file"></label>{""}
          <Widget
            publicKey={process.env.REACT_APP_UPLOADCARE_API_PUBLIC_KEY}
            id="file"
            Clearable={true}
            onChange={(info) => uploadFileChange(info)}
            onFileSelect={(file) => uploadFileSelect(file)}
            validators={validators}
            multipleMax={maxUploadLimit}
            inputAcceptTypes={acceptedFileTypes}
          />
        </div>
        <FilesList updateList={updateList} />
      </div>
   </>
  )
}

export default Uploadcare