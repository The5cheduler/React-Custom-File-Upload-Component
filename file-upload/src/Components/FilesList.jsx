import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import { FiEdit, FiTrash2, FiDownload } from "react-icons/fi";
import ProcessImage from "./ProcessImage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ImagePreview from "./ImagePreview";


function FilesList({ updateList }) {
  const URI = "https://api.uploadcare.com/files/";

  const headers = {
    Authorization: `Uploadcare.Simple ${process.env.REACT_APP_UPLOADCARE_API_PUBLIC_KEY}:${process.env.REACT_APP_UPLOADCARE_API_SECRET_KEY}`
  };
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [fileToProcess, setFileToProcess] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePreviewClose = () => setPreview(false);
  const handlePreview = () => setPreview(true);

  useEffect(() => {
    fetch(URI, { headers })
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.results);
        setLoading(false);
      });
  }, [updateList]);

  const downloadFile = (file) => {
   saveAs(file.original_file_url, file.original_filename, file.mime_type);
  };

  const previewImage = (file) => {
    console.log(file);
    setFileToPreview(file);
    setPreviewTitle(file.original_filename);
    handlePreview();
  };

  const deleteFile = (fileId) => {
    const URI = `https://api.uploadcare.com/files/${fileId}/`;
    const options = {
      method: "DELETE",
      headers: headers,
    };
    fetch(URI, options)
      .then((res) => res.json())
      .then((data) => {
        // filter out deleted file
        const newFiles = files.filter((file) => file.uuid !== fileId);
        setFiles(newFiles);
      })
      .catch((err) => console.log(err));
  };

  const editFile = (file) => {
    console.log(file);
    setFileToProcess(file);
    handleShow();
  };

  if (loading) {
    return <p className="font-loader">Loading...</p>;
  }

  if (files.length === 0) {
    return <p className="no-file font-loader text-center">So empty here, please upload.</p>;
  }

  return (
    <div className="file-list font-loader" >
      <Modal show={show} onHide={handleClose} dialogClassName="my-modal">
        <Modal.Header closeButton>
          <Modal.Title className="font-loader text-center">Process Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProcessImage file={fileToProcess} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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

      <h1 className="text-center">Gallery</h1>
      <ul className="uc-list-images">
        {files.map((file) => (
          <ImageCard 
            key={file.uuid} 
            file={file} 
            deleteFile={deleteFile}
            downloadFile={downloadFile}
            editFile={editFile} 
            previewImage={previewImage}
            />
        ))}
      </ul>
    </div>
  );
};



const ImageCard = ({ file, deleteFile, downloadFile, editFile, previewImage }) => {
  return (
    <li className="item">
      <div className="header">
        <span className="name">{file.original_filename}</span>
        <div className="actions">
        <span className="icon" onClick={(image) => downloadFile(file)}>
            <FiDownload/>
          </span>
          <span className="icon" onClick={(image) => editFile(file)}>
            <FiEdit />
          </span>
          <span className="icon" onClick={(id) => deleteFile(file.uuid)}>
            <FiTrash2 />
          </span>
        </div>
      </div>
      <div className="file" onClick={(image) => previewImage(file)}>
        <img src={file.original_file_url} alt={file.original_filename} />
      </div>
    </li>
  );
}

export default FilesList