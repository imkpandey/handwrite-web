import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { CloudUploadOutlined } from '@material-ui/icons';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return 'black';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  height: 450px;
  width: 350px;
  margin-top: 50px;
  margin-left: 100px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-width: 1px;
  justify-content: center;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: solid;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function Dropzone(props) {
  const [image, setImage] = useState(["", ""]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDrop: acceptedFiles => {
      console.log(acceptedFiles[0])
      setImage([URL.createObjectURL(acceptedFiles[0]), acceptedFiles[0].path]);
    }
  });

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {image[0] ? <div className="input-image">
          <img src={image[0]} />
        </div> :
          <div>
            <h3>Drag 'n' drop your handwritten sample</h3>
            <h2>OR</h2>
            <button type="button" onClick={open}><CloudUploadOutlined />
              ‎ ‎ ‎Choose file
            </button>
          </div>
        }
      </Container>
      <h6>{image[1]}</h6>
    </div>
  );
}


export default Dropzone;