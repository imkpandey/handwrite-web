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
            <ul>
            <li><button onClick = {() => handlePopup()}>‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎About ‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎</button></li>
            <li><button onClick = {() => handlePopup()}>How To Use?</button></li>
            <li><button onClick = {() => handlePopup()}>Documentation</button></li>
            {
                popup === true ? <Popup hide = {() => setPopup(false)} /> : ''
            }
            </ul>
        </nav>

     );
}
 
export default Navbar;