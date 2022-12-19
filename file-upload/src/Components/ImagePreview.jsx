import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ImagePreview = ({file}) => {
  console.log(file);
  const CDN_URI = `https://ucarecdn.com/${file.uuid}/-/preview/-/quality/smart/`;
  const Type = file?.image_info?.format || file?.originalImageInfo?.format ;
  const Size = file?.size;
  const height = file?.image_info?.height || file?.originalImageInfo?.height;
  const width = file?.image_info?.width || file?.originalImageInfo?.width;


  return(
    <div >
      <div>
        <Container className="text-left">
          <Row>
            <Col><h5><Badge bg="secondary">Type : </Badge> {Type}</h5></Col>
            <Col><h5><Badge bg="secondary">Size : </Badge> {Math.floor(((Size / 1024)/1024) * 100) / 100} MB </h5></Col>
          </Row>
          <Row>
            <Col><h5><Badge bg="secondary">Dimensions : </Badge> {height} X {width} pixels </h5></Col>
            <Col><h5> <Badge bg="secondary">Megapixels : </Badge> {Math.floor((height * width / 1000000) * 100) / 100} Megapixels </h5></Col>
          </Row>
        </Container>
      </div>
      <div className="font-loader uc-ip-preview text-center">
        <img src={CDN_URI} alt={file.original_filename}/>
      </div>
  </div>
  )
}

export default React.memo(ImagePreview);