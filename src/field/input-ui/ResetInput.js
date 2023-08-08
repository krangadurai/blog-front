// ResetInput.js
import React from 'react';

const ResetInput = ({ handleInputChange, fieldName, field }) => {
  const { label, required, isValid, invalidMessage } = field;

  return (
    <div className="mb-3">
      <button
        type="reset"
        name={fieldName}
        className={`btn btn-secondary ${isValid ? 'is-valid' : 'is-invalid'}`}
        onClick={handleInputChange}
        required={required}
      >
        {label}
      </button>
      <div id={`invalid_${fieldName}`} className={`invalid-feedback ${isValid ? 'd-none' : ''}`}>
        {invalidMessage}
      </div>
    </div>
  );
};

export default ResetInput;