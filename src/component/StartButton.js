import React from 'react';

const StartButton = (props) => (
        <button 
            className="pure-button"
            onClick={props.onClick}
            disabled={props.disabled}
        >スタート</button>
);

export default StartButton;