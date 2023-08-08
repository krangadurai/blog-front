import React from 'react';

const SelectInput = ({field,fieldName,handleInputChange}) => {
  const { name, label, options, value, onChange, required,isValid, invalidMessage }=field;
  return (
    <div>
      <label>{label}</label>
      <select className={`form-select ${isValid ? 'is-valid' : 'is-invalid'}`}  name={fieldName} onChange={handleInputChange}>
        <option value="" disabled selected>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {invalidMessage && <div className="invalid-feedback">{invalidMessage}</div>}
    </div>
  );
};

export default SelectInput;
