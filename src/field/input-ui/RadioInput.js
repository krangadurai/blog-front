// RadioInput.js
import React from 'react';

const RadioInput = ({ handleInputChange, fieldName, field }) => {
  const { label, required, isValid, invalidMessage, options } = field;

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      {options.map((option) => (
        <div key={option} className="form-check">
          <input
            type="radio"
            name={fieldName}
            value={option}
            className={`form-check-input ${isValid ? 'is-valid' : 'is-invalid'}`}
            onChange={handleInputChange}
            required={required}
          />
          <label className="form-check-label">{option}</label>
        </div>
      ))}
      <div id={`invalid_${fieldName}`} className={`invalid-feedback ${isValid ? 'd-none' : ''}`}>
        {invalidMessage}
      </div>
    </div>
  );
};

export default RadioInput;