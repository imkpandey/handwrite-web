import React, { useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUploadOutlined } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';


function Mainform(props) {
  const [image, setImage] = useState(["", ""]);
  const [font, setFont] = useState("");
  const [fetching, setFetching] = useState(false);
  const {
    getInputProps,
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

  function sendImage(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", image[0]);
    var stat = -1;
    var path;
    var font_url;
    setFetching(true);
    fetch(
        "http://handwritetest.herokuapp.com/handwrite/input",
        {
            method: 'POST',
            body: formData
        }
    ).then((r) => r.json()).then(async (data) => {
        path = data.path;
        for (let i = 0; i < 10; i++) {
            fetch("http://handwritetest.herokuapp.com/handwrite/status/" + path).then((r) => r.json()).then((status) => {
                if (status.status === 0) {
                    console.log("Font file ready!");
                    stat = 0;
                }
            })
            console.log(stat);
            if (stat === 0) {
                break;
            }
            await new Promise(r => setTimeout(r, 5000));
        }
    }).then(() => { 
        if (stat === 0) {
            fetch(
                "http://handwritetest.herokuapp.com/handwrite/fetch/" + path,
                {
                    method: 'POST'
                }
            ).then((r) => r.blob()).then(data => {
                console.log(data);
                font_url = URL.createObjectURL(data);
                console.log(font_url);
                setFont(font_url);
                setFetching(false);
            });
        }
    });
}

  return (
    <div>
      <form onSubmit={(e) => sendImage(e)}>
      <Grid container direction="row" justify="space-around" alignItems="center">
        <div><br/>
          <div className="image-container"> <input {...getInputProps()} />
            {image[0] ?
              <div className="input-image">
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
          </div>
          <center><h6>{image[1]}</h6></center>
        </div>
        <div className="submit-form">
            <button type="submit" variant="outlined" disabled={fetching}>
              CREATE FONT
            </button>
            &emsp;&emsp;&emsp;
            <Button variant="outlined" href={font} download="font.ttf" style={{display: Boolean(font) ? "" : "none"}}>Download your font</Button>
        </div> 
      </Grid>
      </form>
    </div>
  );
}


export default Mainform;