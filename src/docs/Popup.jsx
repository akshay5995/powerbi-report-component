import React, { useState } from 'react';
import './styles.css';

const Popup = ({ handleClose, show }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    const [ text, setText ] = useState('');

    const handleText = (event) => {
        setText(event.target.value);
    }

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <textarea className="themeText" rows="5" cols="40" value={text} onChange={handleText}></textarea>
        <button onClick={() => handleClose(text)}>Apply</button>
        </section>
      </div>
    );
  };

  export default Popup;