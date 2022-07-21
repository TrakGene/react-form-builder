import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useContext, useState } from "react";

// ContextAPI
import { FormData, PopupContext } from "../../../../App";

// Constants
import {
  FORM_TYPES,
  getFormType,
  getUserSideFormTypes,
} from "../../../../constants/formTypes";
import CheckboxInput from "../formTypes/CheckboxInput/CheckboxInput";
import ParaInput from "../formTypes/ParaInput/ParaInput";

// Components
import TextInput from "../formTypes/TextInput/TextInput";

// Styles
import styles from "./AddFormElement.module.css";

function AddFormElement() {
  const [popupContext, setPopupContext] = useContext(PopupContext);
  const [formType, setFormType] = useState(popupContext.data.type);
  const [formTypesArray] = useState(getUserSideFormTypes());

  return (
    <div>
      <p>Select the form type</p>
      <Select
        variant="outlined"
        placeholder="Form Type"
        value={formType}
        style={{ width: "100%" }}
        onChange={(e) => {
          setFormType(e.target.value);
        }}
      >
        {formTypesArray.map((ft, index) => (
          <MenuItem key={`FormType_${index}`} value={ft.key}>
            {ft.value}
          </MenuItem>
        ))}
      </Select>
      {formType === FORM_TYPES.TEXT_INPUT && (
        <TextInput edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.PARAGRAPH_INPUT && (
        <ParaInput edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.CHECKBOX_INPUT && (
        <CheckboxInput edit={popupContext.edit} />
      )}
    </div>
  );
}

export default AddFormElement;
