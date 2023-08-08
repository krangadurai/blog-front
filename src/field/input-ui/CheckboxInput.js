import React from 'react';

const CheckboxInput = ({ handleInputChange, fieldName, field }) => {
  const { label, required, isValid, invalidMessage } = field;

  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        name={fieldName}
        className={`form-check-input ${isValid ? 'is-valid' : 'is-invalid'}`}
        onChange={handleInputChange}
        required={required}
      />
      <label className="form-check-label">{label}</label>
      <div id={`invalid_${fieldName}`} className={`invalid-feedback ${isValid ? 'd-none' : ''}`}>
        {invalidMessage}
      </div>
    </div>
  );
};

export default CheckboxInput;