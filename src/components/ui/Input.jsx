import React from 'react';
import './FormFields.css';

function Input({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    required = false,
    ...props
}) {
    return (
        <div className="form-group">
            {label && (
                <label htmlFor={name}>
                    {label} {required && '*'}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                placeholder={placeholder}
                {...props}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

export default Input;
