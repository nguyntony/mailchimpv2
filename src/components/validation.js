import { defineRule, configure } from 'vee-validate';
import { required, email, alpha_spaces } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('alpha_spaces', alpha_spaces);
defineRule('honeypot', (value) => {
  return value.length === 0 ? true : false;
});
configure({
  generateMessage: (context) => {
    switch (context.rule.name) {
      case 'required':
        return 'This field is required.*';
      case 'email':
        return 'Please enter a valid email.*';
      case 'alpha_spaces':
        return 'Please enter a valid name.';
      case 'honeypot':
        return 'This should not be filled out.';
      default:
        return 'Invalid entry.';
    }
  },
});
