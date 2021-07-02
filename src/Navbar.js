import React,{useState} from 'react';
import Popup from './Popup';
import navdata from './navdata';
const Navbar = () => {
    const [popup, setPopup] = useState(false);
    const handlePopup = () => {
        return setPopup (true);
    }
    return ( 
        <nav className="navbar">
            <div className="links">
            <button onClick = {() => handlePopup()}>‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎About ‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎</button>
            <button onClick = {() => handlePopup()}>How To Use?</button>
            <button onClick = {() => handlePopup()}>Documentation</button>
            </div>
            {
                popup === true ? <Popup hide = {() => setPopup(false)} /> : ''
            }
        </nav>

     );
}
 
export default Navbar;