import React from 'react';

const Button = ({ type = 'button', value, onClick, className }) => {
    return (
        <button type={type} onClick={onClick} className={`button ${className}`}>
            {value}
        </button>
    );
};

export default Button;
