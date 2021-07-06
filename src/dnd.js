import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUploadOutlined } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


function Dropzone(props) {
  const [image, setImage] = useState(["", ""]);
  const {
    getRootProps,
    getInputProps,
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
    <div>
        <Container> <input {...getInputProps()} />
        {image[0] ? <div className="input-image">
          <img src={image[0]} />
        </div> :
          <div>
            <h3>Drag 'n' drop your handwritten sample</h3>
            <h2>OR</h2>
            <center><button type="button" onClick={open}><CloudUploadOutlined />
              ‎ ‎ ‎Choose file
            </button></center>
          </div>
        }
      <h6>{image[1]}</h6>
      </Container>
    <div className="main-form">
      <button>CREATE FONT</button>
    </div>
    </div>
  );
}


export default Dropzone;