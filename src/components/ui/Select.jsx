// import React from 'react';
// import './FormFields.css';

// function Select({
//     label,
//     name,
//     value,
//     onChange,
//     error,
//     options = [],
//     placeholder = 'Select an option',
//     required = false,
//     ...props
// }) {
//     return (
//         <div className="form-group">
//             {label && (
//                 <label htmlFor={name}>
//                     {label} {required && '*'}
//                 </label>
//             )}
//             <select
//                 id={name}
//                 name={name}
//                 value={value}
//                 onChange={onChange}
//                 className={error ? 'error' : ''}
//                 {...props}
//             >
//                 <option value="">{placeholder}</option>
//                 {options.map((option) => (
//                     <option key={option} value={option}>
//                         {option}
//                     </option>
//                 ))}
//             </select>
//             {error && <span className="error-text">{error}</span>}
//         </div>
//     );
// }

// export default Select;
import React from 'react';

function Select({ label, name, value, onChange, error, options, placeholder, required }) {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={error ? 'error' : ''}
            >
                <option value="">{placeholder || 'Select an option'}</option>
                {options.map((option, index) => {
                    // Handle both string array and object array
                    const optionValue = typeof option === 'object' ? option.value : option;
                    const optionLabel = typeof option === 'object' ? option.label : option;

                    return (
                        <option key={index} value={optionValue}>
                            {optionLabel}
                        </option>
                    );
                })}
            </select>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
}

export default Select;