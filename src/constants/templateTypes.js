import { FORM_TYPES } from "./formTypes.js";

export const TEMPLATE = {
  DEMOGRAPHICS: [
    {
      label: "Title",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.DROPDOWN,
      options: ["Mr", "Miss", "Mrs", "Ms", "Dr", "Professor"],
    },
    {
      label: "Firstname",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Surname",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Sex",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.DROPDOWN,
      options: ["Male", "Female"],
    },
    {
      label: "Date of Birth",
      isRequired: true,
      isIdentifier: true,
      type: FORM_TYPES.DATE_TIME_INPUT,
    },
  ],
  ADDRESS: [
    {
      label: "Address Line 1",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Address Line 2",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Town/City",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Suburb/County",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Post Code",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Country",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Home Phone",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Mobile Phone",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Email",
      isRequired: false,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
  ],
};

export const TEMPLATE_TYPES = {
  DEMOGRAPHICS: "DEMOGRAPHICS",
  ADDRESS: "ADDRESS",
};

export const TEMPLATE_TYPES_ICON = {
  DEMOGRAPHICS: "personalInfo.png",
  ADDRESS: "doctor.png",
};
export const USER_SIDE_TEMPLATE_TYPES = {
  Demographics: "DEMOGRAPHICS",
  Address: "ADDRESS",
};

export const getTemplateType = (type) => {
  return USER_SIDE_TEMPLATE_TYPES[type];
};

export const getUserSideTemplateTypeById = (id) => {
  for (let key in USER_SIDE_TEMPLATE_TYPES) {
    if (USER_SIDE_TEMPLATE_TYPES[key] === id) return key;
  }
};

export const getUserSideTemplateTypes = () => {
  const formTypes = [];
  for (let key in USER_SIDE_TEMPLATE_TYPES)
    formTypes.push({ value: key, key: USER_SIDE_TEMPLATE_TYPES[key] });
  return formTypes;
};
