import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import { Widget } from "@uploadcare/react-widget";
import FilesList from "./Components/FilesList";

function Uploadcare() {

    const [updateList, setUpdateList] = useState(false);
    const [showSizeAlert, setShowSizeAlert] = useState(false);
    const uploadFileChange = (info) => {
      console.log(info);
    };

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
   <div className="ucare">
        <div className="upload">
          <label htmlFor="file">Please upload an Image</label>{" "}
          <Widget
            publicKey={process.env.REACT_APP_UPLOADCARE_API_PUBLIC_KEY}
            id="file"
            Clearable={true}
            onChange={(info) => uploadFileChange(info)}
            onFileSelect={(file) => uploadFileSelect(file)}
            validators={validators}
          />
        </div>
        <FilesList updateList={updateList} />
      </div>
   </>
  )
}

export default Uploadcare