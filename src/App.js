import logo from './logo.svg';
import Menu from './Menu';
import React from 'react';

function Handwrite() {
  return (
    <div className="handwrite">
      <img src={logo} alt="handwrite logo" className="Handwrite-Logo" />
      <div className="input-form">
        <Menu />
      </div>
    </div>
  );
}

export default Handwrite;
