// RangeInput.js
import React from 'react';

const RangeInput = ({ handleInputChange, fieldName, field }) => {
  const { label, required, isValid, invalidMessage } = field;

  return (
    <div className="mb-3">
      <label htmlFor={fieldName} className="form-label">
        {label}
      </label>
      <input
        type="range"
        name={fieldName}
        id={fieldName}
        className={`form-range ${isValid ? 'is-valid' : 'is-invalid'}`}
        onChange={handleInputChange}
        required={required}
      />
      <div id={`invalid_${fieldName}`} className={`invalid-feedback ${isValid ? 'd-none' : ''}`}>
        {invalidMessage}
      </div>
    </div>
  );
};

export default RangeInput;