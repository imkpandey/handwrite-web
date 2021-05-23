import { Button } from '@material-ui/core';
import { useState } from 'react';
import React from 'react';
const Menu = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    function sendImage(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append("image", event.target.inputfile.files[0]);
        fetch(
            "http://localhost:5000/handwrite/input",
            {
                method: 'POST',
                body: formData
            }
        ).then((r) => r.json()).then(async (data) => {
            const path = data.path;
            var stat = -1;
            for (let i = 0; i < 10; i++) {
                fetch("http://localhost:5000/handwrite/status/" + path).then((r) => r.json()).then((status) => {
                    if (status.status === 0) {
                        console.log("Font file ready!");
                        stat = 0;
                    }
                })
                if (stat == 0) {
                    break;
                }
                await new Promise(r => setTimeout(r, 5000));
            }
        });
    }

    return (
        <div className="menu">
            <form onSubmit={(e) => sendImage(e)}>
                <div className="input-image">
                    <img src={image} />

                </div>
                <label id="image">Upload Image: </label>
                <input name="inputfile" id="contained-button-file" type="file" value={name} onChange={(e) => {
                    setName(e.target.value);
                    setImage(URL.createObjectURL(e.target.files[0]));
                }} accept="image/*" ></input>
                <Button type="submit" variant="outlined">Create Font!</Button>
            </form>
        </div>
    );
}

export default Menu;