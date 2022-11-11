// ContextAPI
import { FormData, PopupContext } from "../../../../../App.jsx";

// Libraries
import React, { Fragment, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

// Components
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

// styles
import styles from "./FileUpload.module.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { FORM_TYPES } from "../../../../../constants/formTypes.js";
import GraphStructureService from "../../../../../services/graph.structurer.service.js";

const initialValidationSchema = yup.object({
  label: yup
    .string("Enter the form label")
    .required("This field must be specified"),
});

function FileUpload({ edit }) {
  // ContextAPI
  const [formData, setFormData] = useContext(FormData);
  const [popupContext, setPopupContext] = useContext(PopupContext);
  const gs = new GraphStructureService();

  const initialFormValues = () => {
    let value = {};
    value = popupContext.data.formData || {
      label: "",
      isRequired: false,
      isIdentifier: false,
    };
    return value;
  };

  // handleSubmit
  const handleFormSubmit = async (values) => {
    values.type = FORM_TYPES.FILE_UPLOAD;
    const updatedFormData = { ...formData };
    if (!edit) {
      values.id = uuidv4();
      updatedFormData.schema[popupContext.data.id].formElements.push(values);
      setPopupContext({ ...popupContext, show: false });
    } else {
      const formElements = formData.schema[popupContext.data.id].formElements;
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].id === popupContext.data.formData.id) {
          values.id = formElements[i].id;
          formElements[i] = values;
          gs.editFormElement(
            values.id,
            popupContext.data.id,
            updatedFormData,
            values,
            true
          );
        }
      }
      updatedFormData.schema[popupContext.data.id].formElements = formElements;
      setFormData(updatedFormData);
      setPopupContext({ ...popupContext, show: false });
    }
  };

  const handleClose = async () => {
    setPopupContext({ ...popupContext, show: false });
  };

  // Formik
  const formik = useFormik({
    initialValues: initialFormValues(),
    validationSchema: initialValidationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <Fragment>
      <div className={styles.InitialFormScreen} onSubmit={handleFormSubmit}>
        <h2>Email Input</h2>
        <p>Add a email Input</p>
        <form onSubmit={formik.handleSubmit} className={styles.InitialForm}>
          <TextField
            variant="outlined"
            className={styles.FormField}
            id="label"
            name="label"
            label="Label"
            value={formik.values["label"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched["label"] && Boolean(formik.errors["label"])}
            helperText={formik.touched["label"] && formik.errors["label"]}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="isRequired"
                name="isRequired"
                checked={formik.values["isRequired"]}
                onChange={formik.handleChange}
              />
            }
            label="Is Required"
          />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ cursor: "pointer" }} onClick={handleClose}>
              <p>CANCEL</p>
            </div>
            <Button
              variant="contained"
              type="submit"
              className={styles.SubmitButton}
            >
              {edit ? "SAVE" : "CREATE"}
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default FileUpload;
