// HiddenInput.js
import React from 'react';

const HiddenInput = ({ handleInputChange, fieldName, field }) => {
  const { value, isValid } = field;

  return (
    <input
      type="hidden"
      name={fieldName}
      value={value}
      className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
      onChange={handleInputChange}
    />
  );
};

export default HiddenInput;
