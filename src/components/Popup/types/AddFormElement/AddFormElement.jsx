import { MenuItem, Select } from "@material-ui/core";
import React, { useContext, useState } from "react";

// ContextAPI
import { PopupContext } from "../../../../App";

// Constants
import {
  FORM_TYPES,
  getUserSideFormTypes,
} from "../../../../constants/formTypes";
import CheckboxInput from "../formTypes/CheckboxInput/CheckboxInput";
import Dropdown from "../formTypes/Dropdown/Dropdown";
import EmbedContent from "../formTypes/EmbedContent/EmbedContent";
import LinearScale from "../formTypes/LinearScale/LinearScale";
import MultipleChoice from "../formTypes/MultipleChoice/MultipleChoice";
import ParaInput from "../formTypes/ParaInput/ParaInput";

// Components
import TextInput from "../formTypes/TextInput/TextInput";

function AddFormElement() {
  const [popupContext] = useContext(PopupContext);
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
      {formType === FORM_TYPES.SHORT_TEXT && (
        <TextInput edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.LONG_TEXT && (
        <ParaInput edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.CHECKBOX_INPUT && (
        <CheckboxInput edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.DROPDOWN && (
        <Dropdown edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.MULTIPLE_CHOICE && (
        <MultipleChoice edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.LINEAR_SCALE && (
        <LinearScale edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.EMBED_CONTENT && (
        <EmbedContent edit={popupContext.edit} />
      )}
    </div>
  );
}

export default AddFormElement;
