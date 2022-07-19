export const FORM_TYPES = {
  TEXT_INPUT: "TEXT_INPUT",
  PARAGRAPH_INPUT: "PARAGRAPH_INPUT",
};

export const USER_SIDE_FORM_TYPES = {
  "Text Input": "TEXT_INPUT",
  "Paragraph Input": "PARAGRAPH_INPUT",
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
