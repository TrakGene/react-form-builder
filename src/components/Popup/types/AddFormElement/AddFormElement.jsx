import { MenuItem, Select } from "@material-ui/core";
import React, { useContext, useState } from "react";

// ContextAPI
import { PopupContext } from "../../../../App.jsx";

// Constants
import {
  FORM_TYPES,
  getUserSideFormTypes,
} from "../../../../constants/formTypes.js";
import CheckboxInput from "../formTypes/CheckboxInput/CheckboxInput.jsx";
import DateTimeInput from "../formTypes/DateTimeInput/DateTimeInput.jsx";
import Dropdown from "../formTypes/Dropdown/Dropdown.jsx";
import EmailInput from "../formTypes/EmailInput/EmailInput.jsx";
import EmbedContent from "../formTypes/EmbedContent/EmbedContent.jsx";
import FileUpload from "../formTypes/FileUplaod/FileUpload.jsx";
import LinearScale from "../formTypes/LinearScale/LinearScale.jsx";
import MultipleChoice from "../formTypes/MultipleChoice/MultipleChoice.jsx";
import ParaInput from "../formTypes/ParaInput/ParaInput.jsx";
import Signature from "../formTypes/Signature/Signature.jsx";

// Components
import TextInput from "../formTypes/TextInput/TextInput.jsx";

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
      {formType === FORM_TYPES.EMAIL_INPUT && (
        <EmailInput edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.DATE_TIME_INPUT && (
        <DateTimeInput edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.FILE_UPLOAD && (
        <FileUpload edit={popupContext.edit} />
      )}
      {formType === FORM_TYPES.SIGNATURE && (
        <Signature edit={popupContext.edit} />
      )}
    </div>
  );
}

export default AddFormElement;
