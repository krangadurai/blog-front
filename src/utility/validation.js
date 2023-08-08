// validationUtils.js

import * as validationRules from './validationRules';

const checkValidation = (name, value, field) => {
  const { label, validation } = field[name];
  let isValid = true;
  let invalidMessage = '';
    
  if (validation) {
    for (const rule of validation) {
      let ruleFunction;
  
      if (typeof rule === 'object') {
        const [ruleName] = rule; // Using object destructuring
        const keys = Object.keys(rule);
        ruleFunction = validationRules[keys[0]];
        if (typeof ruleFunction === 'function') {
          invalidMessage = ruleFunction(value, label, rule[keys[0]]);
        } else {
          console.warn(`Validation rule "${rule}" not found.`);
        }
      } else if (typeof rule === 'function') {
        ruleFunction = rule;
        invalidMessage = ruleFunction(value, label);
      } else {
        console.warn(`Invalid validation rule "${rule}".`);
      }
      if (invalidMessage !== '') {
        isValid = false;
        break;
      }
    }
  }

  return { isValid, invalidMessage };
};

export default checkValidation;
