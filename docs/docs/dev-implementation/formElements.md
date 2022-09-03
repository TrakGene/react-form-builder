---
sidebar_position: 1
---

# Form Elements

This is a developer implementation of Form elements.

## How it is implemented?

`FormElements`are just basically an object with the required details that a question needs.

A sample is

```js
// A singular form element

{
  id: "296a393d-5b0a-4a96-9322-67c0e0c7182d",
  isRequired: false,
  isIdentifier: true,
  label: "Sample Question 1",
  options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  type: "CHECKBOX_INPUT"
}
```

- Now `id` is a unique `uuid` which is generated every time when a form element gets created

- `isRequired` and `isIdentifier` are optional identifiers which are specified by the user while creating the form element.

- Here `label` is a `Required` parameter which will be rendered as a label.

- `options` describes the options given by the user. This will only be available in specific form types.

- `type` describes the type of the form element.

:::info

All `Condition Supported` form elements must have the `options` parameter.
:::

### Form Types

Form Types are defined in the `/constants` folder

```js title="/src/constants/formTypes.js"
export const FORM_TYPES = {
  SHORT_TEXT: "SHORT_TEXT",
  LONG_TEXT: "LONG_TEXT",
  CHECKBOX_INPUT: "CHECKBOX_INPUT",
  DROPDOWN: "DROPDOWN",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  LINEAR_SCALE: "LINEAR_SCALE",
  EMBED_CONTENT: "EMBED_CONTENT",
};

export const CONDITIONAL_FORM_TYPES = {
  SHORT_TEXT: false,
  LONG_TEXT: false,
  CHECKBOX_INPUT: true,
  DROPDOWN: true,
  MULTIPLE_CHOICE: true,
  LINEAR_SCALE: false,
  EMBED_CONTENT: false,
};

export const USER_SIDE_FORM_TYPES = {
  "Short Text": "SHORT_TEXT",
  "Long Text": "LONG_TEXT",
  "Checkbox Input": "CHECKBOX_INPUT",
  Dropdown: "DROPDOWN",
  "Multiple Choice": "MULTIPLE_CHOICE",
  "Linear Scale": "LINEAR_SCALE",
  "Embed Content": "EMBED_CONTENT",
};

export const getFormType = (type) => {
  return USER_SIDE_FORM_TYPES[type];
};

export const getUserSideFormTypeById = (id) => {
  for (let key in USER_SIDE_FORM_TYPES) {
    if (USER_SIDE_FORM_TYPES[key] === id) return key;
  }
};

export const getUserSideFormTypes = () => {
  const formTypes = [];
  for (let key in USER_SIDE_FORM_TYPES)
    formTypes.push({ value: key, key: USER_SIDE_FORM_TYPES[key] });
  return formTypes;
};
```

- `FORM_TYPES` describes all the different form types

- `CONDITIONAL_FORM_TYPES` describes all the form types which have support for conditions

- `USER_SIDE_FORM_TYPES` describes by what name the `FORM_TYPES` will be shown to the user

All the other functions are helper functions to convert from one form to another or to fetch the form types in different formats

So we store the `formElements` in this way.

```js
// This shows the interface
formElements:Array<FORM_ELEMENT>
```
