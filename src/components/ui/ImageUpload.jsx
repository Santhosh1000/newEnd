import React from 'react';
import './FormFields.css';

function ImageUpload({
    label,
    name,
    onChange,
    previews = [],
    onRemove,
    multiple = true
}) {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <div className="upload-box">
                <input
                    type="file"
                    id={name}
                    name={name}
                    accept="image/*"
                    multiple={multiple}
                    onChange={onChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor={name} className="upload-label">
                    <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <span>Click to upload or drag and drop</span>
                    <span className="upload-hint">PNG, JPG, GIF up to 10MB</span>
                </label>
            </div>

            {previews.length > 0 && (
                <div className="image-previews">
                    {previews.map((preview, index) => (
                        <div key={index} className="preview-item">
                            <img src={preview} alt={`Preview ${index + 1}`} />
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="remove-btn"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
