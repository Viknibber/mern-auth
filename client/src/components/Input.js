import React from 'react';
import './Input.css';

const Input = ({ labelText, errorText, id, name, value, type, onChange, onKeyDown, className }) => {
    return (
        <div className={`input ${className}`}>
            {labelText && <label htmlFor={id}>{labelText}</label>}
            {errorText && (
                <label htmlFor={id} className='error'>
                    {errorText}
                </label>
            )}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete='off'
            />
        </div>
    );
};

export default Input;
