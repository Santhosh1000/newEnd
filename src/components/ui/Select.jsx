import React from 'react';
import './FormFields.css';

function Select({
    label,
    name,
    value,
    onChange,
    error,
    options = [],
    placeholder = 'Select an option',
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
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

export default Select;
