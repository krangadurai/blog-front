// TextInput.js
import React from 'react';

const TextInput = ({ handleInputChange, fieldName, field }) => {
  const { label, placeholder, required, isValid, invalidMessage } = field;

  return (
    <div className="mb-3">
      <label htmlFor={fieldName} className="form-label">
        {label}
      </label>
      <input
        type="text"
        name={fieldName}
        id={fieldName}
        className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
        placeholder={placeholder}
        onChange={handleInputChange}
        required={required}
      />
      <div id={`invalid_${fieldName}`} className={`invalid-feedback ${isValid ? 'd-none' : ''}`}>
        {invalidMessage}
      </div>
    </div>
  );
};

export default TextInput;