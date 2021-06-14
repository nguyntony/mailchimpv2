# vee-validate v4 
Updated guide on vee-validate. This repo takes the same idea from this [repo](https://github.com/nguyntony/mailchimp). With that being said, please refer to this [repo](https://github.com/nguyntony/mailchimp) for connecting MailChimp and Statamic form submissions. This repo will strictly be about the updated syntax for vee-validate, which means that this repo **only applies to vue 3 projects.**

## Installation 
Refer to this [page](https://vee-validate.logaretm.com/v4/v4/integrations/zod-schema-validation#install) for more information. To get started simply install the package.
* `npm install vee-validate@next`

You will also need to install the library’s rules. This the preferred method to keep the library as light as possible. The goal is to include simple form validation.
* `npm install @vee-validate/rules`

You may also use [yup](https://github.com/jquense/yup) as an alternative for form validation, however this repo focuses on the included rules from the library.

## Validation 
Refer to this [page](https://vee-validate.logaretm.com/v4/guide/global-validators#vee-validaterules) for more information.

It is best to create a separate file that will handle all of the rule declaration. In this file you will import the following:
``` js
import { defineRule, configure } from "vee-validate";
// example of rules to be added
import { required, email, alpha_spaces } from "@vee-validate/rules";
```
* `defineRule` will declare the rule, you may also use this function to create custom rules. 
* `configure` will allow you to customize the error messages that will correspond with each rule.

### Declaring rules & Custom rules
```js
defineRule("required", required);
defineRule("email", email);
defineRule("alpha_spaces", alpha_spaces);
defineRule("honeypot", (value) => {
    return value.length === 0 ? true : false;
});
```
We are defining several rules here, note that the `honeypot` rule is a custom rule that we created.

### Custom messages 
```js
configure({
    generateMessage: (context) => {
        switch (context.rule.name) {
            case "required":
                return "This field is required.*";
            case "email":
                return "Please enter a valid email.*";
            case "alpha_spaces":
                return "Please enter a valid name.";
            case "honeypot":
                return "This should not be filled out.";
            default:
                return "Invalid entry.";
        }
    },
});
```
This is a personal approach on how to generate custom error messages. I could not figure out the *official* way from the docs so this is what I came up with. Essentially we are using a switch case to evaluate which rule is being violated, then it will return the corresponding string. 

### Import
If you created a separate file, (`validation.js`), then all you have to do is to import the file into the desired vue component, `import * as rules from './validation.js'`

If vue is yelling at you about `no unused vars`, add this line before the import statement, `// eslint-disable-next-line no-unused-vars`

It will look like this:
```
// eslint-disable-next-line no-unused-vars
import * as rules from './validation';
```

## Form Construction 
Refer to this [page](https://vee-validate.logaretm.com/v4/guide/components/handling-forms#using-handlesubmit) for more information. This repo focuses on using the `handleSubmit` method described in the docs. This will allow for AJAX/axios requests. 

Import the following components:
* `import {Form as VeeForm, Field, ErrorMessage} from "vee-validate"`
The `Form` component is renamed to `VeeForm` to avoid confusion because you will need to wrap `VeeForm` around your form (which is a `<form>` tag)

### User data
Traditionally you will have to use `v-model` to bind certain values along with the data properties but with this library, you do not need to. Simply pass the `values` prop to  your `onSubmit` function and you will have access to the form data. 

If you’d like you can still use `v-model`.

### CSS
Refer to this [page](https://vee-validate.logaretm.com/v4/guide/components/validation#using-the-field-slot-props) for more information. This method will allow you greater freedom on how the styling.