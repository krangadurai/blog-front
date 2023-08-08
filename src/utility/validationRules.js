// validations.js

export const required = (value, label) => {
    if (!value || value.trim() === '') {
      return `${label} is required.`;
    }
    return '';
  };
  /********************** Datatype Validation Functions **************************************/

// String validation function
export const StringOnly = (value, label) => {
  if (!/^[a-zA-Z]*$/.test(value)) {
    return `${label} should contain only alphabets.`;
  }
  return '';
};

// Integer validation function
export const integerOnly = (value, label) => {
  if (!/^\d+$/.test(value)) {
    return `${label} should contain only integer values.`;
  }
  return '';
};

// Float validation function
export const floatOnly = (value, label) => {
  if (!/^\d+(\.\d+)?$/.test(value)) {
    return `${label} should contain only floating-point numbers.`;
  }
  return '';
};

// Boolean validation function
export const booleanOnly = (value, label) => {
  if (!/^(true|false)$/.test(value.toLowerCase())) {
    return `${label} should be either 'true' or 'false'.`;
  }
  return '';
};

/********************** End of Datatype Validation Functions **************************************/

  
  
/********************** Length Validation Functions **************************/

// minLength validation function
export const minLength = (value, label, minLength) => {
  if (value.length < minLength) {
    return `${label} should be at least ${minLength} characters long.`;
  }
  return '';
};

// maxLength validation function
export const maxLength = (value, label, maxLength) => {
  if (value.length > maxLength) {
    return `${label} should not exceed ${maxLength} characters.`;
  }
  return '';
};

/********************** End of Length Validation Functions *******************/


/************************************** FORMAT VALIDATION **************************************/

// String validation: Allow only alphabets and spaces
export const stringAlpha = (value, label) => {
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return `${label} should contain only alphabets and spaces.`;
  }
  return '';
};

// String validation: Allow alphanumeric characters
export const stringAlphanumeric = (value, label) => {
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    return `${label} should contain only alphanumeric characters.`;
  }
  return '';
};

// Email validation
export const email = (value, label) => {
  // Simplified email validation, may not cover all edge cases
  if (!/\S+@\S+\.\S+/.test(value)) {
    return `Invalid ${label}. Please enter a valid email address.`;
  }
  return '';
};

// Phone number validation: Allow numbers, dashes, and parentheses
export const phoneNumber = (value, label) => {
  if (!/^[0-9()\-\s]+$/.test(value)) {
    return `Invalid ${label}. Please enter a valid phone number.`;
  }
  return '';
};

// Date validation: Allow date in the format YYYY-MM-DD
export const date = (value, label) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `Invalid ${label}. Please enter a date in the format YYYY-MM-DD.`;
  }
  return '';
};

// Custom format validation: Example - Validate a custom pattern
export const customFormat = (value, label, pattern) => {
  if (!pattern.test(value)) {
    return `Invalid ${label}. Please enter a value that matches the required format.`;
  }
  return '';
};

/************************************** FORMAT VALIDATION END **************************************/


/************************************** VALIDATION LIST **************************************/

// Whitelisting: Allow only letters (both uppercase and lowercase), numbers, and underscores
export const checkUsername = (value, label) => {
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return `${label} should contain only letters, numbers, and underscores.`;
  }
  return '';
};

// Whitelisting: Allow only positive integers
export const checkPositiveInteger = (value, label) => {
  if (!/^[1-9]\d*$/.test(value)) {
    return `${label} should be a positive integer greater than zero.`;
  }
  return '';
};

// Whitelisting: Allow only valid country codes (ISO 3166-1 alpha-2)
export const checkCountryCode = (value, label) => {
  // Example: Whitelist for ISO 3166-1 alpha-2 country codes
  const countryCodes = [
    'AF', 'AL', 'DZ', 'AD', 'AO', // Add more country codes as needed
    // ...
    'ZW'
  ];

  if (!countryCodes.includes(value.toUpperCase())) {
    return `Invalid ${label}. Please enter a valid country code.`;
  }
  return '';
};

// Blacklisting: Prevent SQL injection by disallowing semicolons and common SQL keywords
export const checkSQLInjection = (value, label) => {
  const blacklistedPatterns = /(;|\b(DELETE|DROP|UPDATE|INSERT|SELECT|ALTER)\b)/i;
  if (blacklistedPatterns.test(value)) {
    return `Invalid ${label}. Please avoid using SQL keywords.`;
  }
  return '';
};

/************************************** VALIDATION LIST END **************************************/


/************************************** ESCAPE INPUT DATA **************************************/

// Escape HTML special characters
export const escapeHTML = (value) => {
  return value.replace(/[&<>"'/]/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      case "/":
        return '&#x2F;';
      default:
        return match;
    }
  });
};

// Escape data for use in SQL queries (to prevent SQL injection)
export const escapeSQL = (value) => {
  // Example: Escaping single quotes
  return value.replace(/'/g, "''");
};

// Escape data for use in URL parameters (to prevent injection and maintain URL encoding)
export const escapeURL = (value) => {
  return encodeURIComponent(value);
};

/************************************** ESCAPE INPUT DATA END **************************************/



/************************************** INPUT SANITIZATION LIST **************************************/

// Sanitize HTML input to prevent XSS attacks
export const sanitizeHTML = (value) => {
  const sanitizedValue = document.createElement('div');
  sanitizedValue.innerText = value;
  return sanitizedValue.innerHTML;
};

// Sanitize data for use in SQL queries to prevent SQL injection
export const sanitizeSQL = (value) => {
  // Example: Remove single quotes to prevent SQL injection
  return value.replace(/'/g, "");
};

// Sanitize data for use in shell commands to prevent command injection
export const sanitizeShell = (value) => {
  // Example: Remove semicolons to prevent command injection
  return value.replace(/;/g, "");
};

// Sanitize data for use in URL parameters to prevent injection
export const sanitizeURL = (value) => {
  // Example: Remove characters not allowed in URLs
  return value.replace(/[^a-zA-Z0-9-_]/g, "");
};

/************************************** INPUT SANITIZATION LIST END **************************************/



/************************************** FILE UPLOAD VALIDATION LIST **************************************/

// Check file size
export const checkFileSize = (file, maxSizeInBytes) => {
  if (file.size > maxSizeInBytes) {
    return `File size should not exceed ${maxSizeInBytes} bytes.`;
  }
  return '';
};

// Check file type
export const checkFileType = (file, allowedTypes) => {
  const fileType = file.type.split('/')[1];
  if (!allowedTypes.includes(fileType)) {
    return `Invalid file type. Allowed types are: ${allowedTypes.join(', ')}.`;
  }
  return '';
};

// Check file extension
export const checkFileExtension = (file, allowedExtensions) => {
  const fileExtension = file.name.split('.').pop();
  if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
    return `Invalid file extension. Allowed extensions are: ${allowedExtensions.join(', ')}.`;
  }
  return '';
};

/************************************** FILE UPLOAD VALIDATION LIST END **************************************/



/************************************** BUSINESS LOGIC VALIDATION LIST **************************************/

// Check if the selected number of items exceeds the maximum allowed limit
export const checkMaxItems = (selectedItems, maxLimit) => {
  if (selectedItems.length > maxLimit) {
    return `You can select up to ${maxLimit} items.`;
  }
  return '';
};

// Check if the selected items meet the minimum required quantity
export const checkMinQuantity = (selectedItems, minQuantity) => {
  const totalQuantity = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  if (totalQuantity < minQuantity) {
    return `Select at least ${minQuantity} items in total.`;
  }
  return '';
};

// Check if the user's account balance is sufficient for a purchase
export const checkSufficientBalance = (userBalance, totalPrice) => {
  if (userBalance < totalPrice) {
    return 'Insufficient balance. Please add funds to your account.';
  }
  return '';
};

// Check if the selected delivery address is within the service area
export const checkServiceArea = (selectedAddress, serviceArea) => {
  if (!serviceArea.includes(selectedAddress)) {
    return 'Delivery is not available to the selected address.';
  }
  return '';
};

/************************************** BUSINESS LOGIC VALIDATION LIST END **************************************/






/************************************** INPUT ORDER VALIDATION LIST **************************************/

// Check if the input numbers are in ascending order
export const checkAscendingOrder = (numbers) => {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] <= numbers[i - 1]) {
      return 'Input numbers should be in ascending order.';
    }
  }
  return '';
};

// Check if the input numbers are in descending order
export const checkDescendingOrder = (numbers) => {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] >= numbers[i - 1]) {
      return 'Input numbers should be in descending order.';
    }
  }
  return '';
};

// Check if the input dates are in chronological order
export const checkChronologicalOrder = (dates) => {
  for (let i = 1; i < dates.length; i++) {
    if (new Date(dates[i]) < new Date(dates[i - 1])) {
      return 'Input dates should be in chronological order.';
    }
  }
  return '';
};

// Check if the input steps in a process are in the correct sequence
export const checkProcessStepsSequence = (steps) => {
  // Define the correct sequence of process steps
  const correctSequence = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  
  if (JSON.stringify(steps) !== JSON.stringify(correctSequence)) {
    return 'Incorrect sequence of process steps.';
  }
  return '';
};

/************************************** INPUT ORDER VALIDATION LIST END **************************************/



/************************************** SECURE ERROR HANDLING VALIDATION LIST **************************************/

// Sanitize error messages to prevent potential information leakage
export const sanitizeErrorMessage = (errorMessage) => {
  // Replace sensitive information or error details with generic messages
  if (errorMessage.includes('Database connection failed')) {
    return 'An unexpected error occurred. Please try again later.';
  } else if (errorMessage.includes('Invalid credentials')) {
    return 'Invalid username or password.';
  }
  // Add more sanitization rules as per your application's requirements
  return 'An error occurred. Please contact support for assistance.';
};

// Log errors securely without exposing sensitive information
export const logSecureError = (error) => {
  // Create a sanitized error message
  const sanitizedErrorMessage = sanitizeErrorMessage(error.message);
  
  // Log the sanitized error message along with any necessary details for troubleshooting
  // Avoid logging sensitive information such as passwords or database connection details
  console.error('Secure Error:', sanitizedErrorMessage, error.stack);
};

/************************************** SECURE ERROR HANDLING VALIDATION LIST END **************************************/




  