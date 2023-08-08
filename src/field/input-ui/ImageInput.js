import React from 'react';

const ImageInput = ({ handleInputChange, fieldName, field }) => {
  const { label, required, isValid, invalidMessage } = field;

  return (
    <div className="mb-3">
      <label htmlFor={fieldName} className="form-label">
        {label}
      </label>
      <input
        type="file"
        name={fieldName}
        id={fieldName}
        className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
        onChange={handleInputChange}
        required={required}
        accept="image/*"
      />
      <div id={`invalid_${fieldName}`} className={`invalid-feedback ${isValid ? 'd-none' : ''}`}>
        {invalidMessage}
      </div>
    </div>
  );
};

export default ImageInput;