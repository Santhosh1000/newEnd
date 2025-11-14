import React from 'react';
import './FormFields.css';

function TextArea({
    label,
    name,
    value,
    onChange,
    error,
    placeholder,
    required = false,
    rows = 4,
    ...props
}) {
    return (
        <div className="form-group">
            {label && (
                <label htmlFor={name}>
                    {label} {required && '*'}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                placeholder={placeholder}
                rows={rows}
                {...props}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

export default TextArea;
