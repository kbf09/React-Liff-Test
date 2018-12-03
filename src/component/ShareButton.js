import React from 'react';

const ShareButton = (props) => (
        <button 
            className="pure-button"
            onClick={props.onClick}
        >シェアする</button>
);

export default ShareButton;