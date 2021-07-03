import React, {useState, useEffect}from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import { CloudUploadOutlined } from '@material-ui/icons';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};
  
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    maxWidth: 350,
    maxHeight: 450,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

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
  const [files, setFiles] = useState([]);
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
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })));
  }});

  const filepath = acceptedFiles.map(file => (
    <h6 key={file.path}>
      {file.path}
    </h6>
  ));
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  return (
    <div className="container">
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <div style={thumbsContainer}>
        {thumbs}
        </div>
        <div>
        <h3>Drag 'n' drop your handwritten sample</h3>
        <h2>OR</h2>
        <button type="button" onClick={open}><CloudUploadOutlined />
        ‎ ‎ ‎Choose file
        </button>
        </div>
      </Container>
    <h6>{filepath}</h6>
    </div>
  );
}


export default Dropzone;