import React, { useState } from 'react';

const PasswordInput = ({ handleInputChange, fieldName, field }) => {
  const { label, placeholder, required, isValid, invalidMessage } = field;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-3">
      <label htmlFor={fieldName} className="form-label">
        {label}
      </label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          name={fieldName}
          id={fieldName}
          className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
          placeholder={placeholder}
          onChange={handleInputChange}
          required={required}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div id={`invalid_${fieldName}`} className={`invalid-feedback ${isValid ? 'd-none' : ''}`}>
        {invalidMessage}
      </div>
    </div>
  );
};

export default PasswordInput;