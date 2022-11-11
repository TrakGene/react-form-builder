import { FORM_TYPES } from "./formTypes.js";

export const TEMPLATE = {
  PERSONAL_INFO: [
    {
      label: "First Name",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Middle Name",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Last Name",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "DoB",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.DATE_TIME_INPUT,
    },
    {
      label: "Gender",
      isRequired: true,
      isIdentifier: true,
      options: ["Male", "Female", "Others"],
      type: FORM_TYPES.MULTIPLE_CHOICE,
    },
  ],
  DOCTOR_INFO: [
    {
      label: "Name",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Hospital",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
    {
      label: "Doctor Id",
      isRequired: true,
      isIdentifier: false,
      type: FORM_TYPES.SHORT_TEXT,
    },
  ],
};

export const TEMPLATE_TYPES = {
  PERSONAL_INFO: "PERSONAL_INFO",
  DOCTOR_INFO: "DOCTOR_INFO",
};

export const TEMPLATE_TYPES_ICON = {
  PERSONAL_INFO: "personalInfo.png",
  DOCTOR_INFO: "doctor.png",
};
export const USER_SIDE_TEMPLATE_TYPES = {
  "Basic Personal Info": "PERSONAL_INFO",
  "Doctor Info": "DOCTOR_INFO",
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
