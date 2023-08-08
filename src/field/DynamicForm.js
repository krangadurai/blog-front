import React, { useState } from 'react';
import checkValidation from '../utility/validation';
import  * as inputUI  from './input-ui/';


const DynamicForm = () => {
  const fieldConfig = {
    name: {
      type: 'text',
      placeholder: 'Enter the Name',
      validation: ['srtonly', 'minLength', 'maxlength'],
      label: 'Name',
      order: 1,
      minLength: 3,
      maxLength: 50,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    phone: {
      type: 'tel',
      placeholder: 'Enter the Phone Number',
      validation: ['required', 'phonenumber',{minLength:10}],
      label: 'Phone Number',
      order: 2,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    password: {
      type: 'password',
      placeholder: 'Enter the Password',
      validation: ['required', {minLength:6}],
      label: 'Password',
      order: 9,
      minLength: 6,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    email: {
      type: 'email',
      placeholder: 'Enter the Email Address',
      validation: ['required', 'email'],
      label: 'Email Address',
      order: 4,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    country: {
      type: 'select',
      placeholder: 'Select your Country',
      validation: ['required'],
      label: 'Country',
      order: 6,
      required: true,
      options: ['Male', 'Female', 'Other'],
      invalidMessage: '',
      isValid: false,
    },
    age: {
      type: 'number',
      placeholder: 'Enter your Age',
      validation: ['required', 'integer', { minLength:3},{maxLength:10}],
      label: 'Age',
      order: 5,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    gender: {
      type: 'radio',
      validation: ['required'],
      label: 'Gender',
      order: 7,
      options: ['Male', 'Female', 'Other'],
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    address: {
      type: 'textarea',
      placeholder: 'Enter your Address',
      validation: ['required'],
      label: 'Address',
      order: 8,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    confirmPassword: {
      type: 'password',
      placeholder: 'Confirm Password',
      validation: ['required', 'matchPassword'],
      label: 'Confirm Password',
      order: 10,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    dateOfBirth: {
      type: 'date',
      label: 'Date of Birth',
      placeholder: 'Date of Birth',
      validation: ['required', 'less current year'],
      order: 11,
      required: true,
      invalidMessage: '',
      isValid: false,
    },
    meetingTime: {
      type: 'time',
      label: 'Meeting Time',
      order: 12,
      placeholder: 'Meeting Time',
      validation: ['required', 'abov current time'],
      required: true,
      invalidMessage: '',
      isValid: false,
    },
  };
  
  const [Field, setField] = useState(fieldConfig);
  const [formData, setFormData] = useState({});
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const {isValid,invalidMessage}=checkValidation(name,value,fieldConfig);
    console.log(invalidMessage)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setField((prevField) => ({
      ...prevField,
      [name]: {
        ...prevField[name],
        isValid: isValid,
        invalidMessage: invalidMessage,
      },
    }));
    console.log(Field[name])
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
      // You can perform further actions with the form data, such as submitting it to a server.
  };

  return (
    <div className='container text-center py-5'>
        <h4> Dynamic Form</h4>
    <form className='needs-validation text-start' onSubmit={handleSubmit}>
      <div className='row'>
      {Object.entries(Field)
        .sort((a, b) => {
          return a[1].order - b[1].order;
        })
        .map(([fieldName, field]) => {
          const { type } = field;
          const str2 = type.charAt(0).toUpperCase() + type.slice(1);
          console.log(str2)
          console.log(inputUI[str2])

           const InputComponent = inputUI[str2]; // Get the appropriate input component
           if(InputComponent ===undefined){
            return 2;
           }
           return (
              <div className='col-6'>
             <InputComponent
               key={fieldName}
               field={field}
               fieldName={fieldName}
               handleInputChange={handleInputChange}
             />
             </div>
           );
 
        })}
        </div>
      <button className='btn btn-outline-primary' type="submit">Submit</button>
    </form>
    </div>
  );
};

export default DynamicForm;





