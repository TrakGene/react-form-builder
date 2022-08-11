export const FORM_TYPES = {
  SHORT_TEXT: "SHORT_TEXT",
  LONG_TEXT: "LONG_TEXT",
  CHECKBOX_INPUT: "CHECKBOX_INPUT",
  DROPDOWN: "DROPDOWN",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  LINEAR_SCALE: "LINEAR_SCALE",
};

export const CONDITIONAL_FORM_TYPES = {
  SHORT_TEXT: false,
  LONG_TEXT: false,
  CHECKBOX_INPUT: true,
  DROPDOWN: true,
  MULTIPLE_CHOICE: true,
  LINEAR_SCALE: false,
};

export const USER_SIDE_FORM_TYPES = {
  "Short Text": "SHORT_TEXT",
  "Long Text": "LONG_TEXT",
  "Checkbox Input": "CHECKBOX_INPUT",
  Dropdown: "DROPDOWN",
  "Multiple Choice": "MULTIPLE_CHOICE",
  "Linear Scale": "LINEAR_SCALE",
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
