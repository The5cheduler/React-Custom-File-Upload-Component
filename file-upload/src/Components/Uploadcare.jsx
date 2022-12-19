import React, {useState} from 'react';
import { Widget } from "@uploadcare/react-widget";
import FilesList from "./FilesList";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ImagePreview from "./ImagePreview";


function Uploadcare() {


    const acceptedFileTypes = "image/jpg,image/jpeg,image/png";
    const dataTabsValue = "file camera url facebook gdrive gphotos";

    const [updateList, setUpdateList] = useState(false);
    const [value, setValue] = useState();
    const [fileToPreview, setFileToPreview] = useState(null);
    const [previewTitle, setPreviewTitle] = useState('');
    const [preview, setPreview] = useState(false);

    const handlePreviewClose = () => setPreview(false);
    const handlePreview = () => setPreview(true);

    const uploadFileChange = (info) => {
      // console.log(info);
      setPreviewTitle(info?.name);
      setFileToPreview(info);
      handlePreview();
      setValue(null);
    }; 

    const maxUploadLimit = 1

    const uploadSelectedFile = (file) => {
        console.log(`file changed ${file}`, file);
        setUpdateList(false);
        //setShowModal(false);
        if (file) {
        file.progress((info) => console.log("File progress: ", info.progress));
        file.done((info) => setUpdateList(true));
        }
        Widget.value(null);
    };

  return (
   <>
      <Modal show={preview} onHide={handlePreviewClose} dialogClassName="my-modal" size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="font-loader text-center">{previewTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
        <ImagePreview file={fileToPreview}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePreviewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="ucare">
        <div className="upload">
        <h2 className="text-center font-loader"> Image Uploader</h2>
          <div className="text-center font-loader">
            <Widget
            value={value}
            publicKey={process.env.REACT_APP_UPLOADCARE_API_PUBLIC_KEY}
            id="file"
            Clearable={true}
            onChange={(info) => uploadFileChange(info)}
            onFileSelect={(file) => uploadSelectedFile(file)}
            dataTabs={dataTabsValue}
            multipleMax={maxUploadLimit}
            inputAcceptTypes={acceptedFileTypes}
            
          />
          </div>
        </div>
        <FilesList updateList={updateList} />
      </div>
    
   </>
  )
}

export default Uploadcare