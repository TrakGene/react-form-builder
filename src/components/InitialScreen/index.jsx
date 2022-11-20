// ContextAPI
import { FormData } from "../../App.jsx";

// Libraries
import React, { Fragment, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// Components
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

// styles
import styles from "./InitialScreen.module.css";

// Dependencies
import GraphStructureService from "../../services/graph.structurer.service.js";

const formFields = [
  { id: "FormTitle", label: "Form Title", type: "text" },
  { id: "FormDescription", label: "Form Description", type: "text" },
];
const initialFormValues = {
  FormTitle: "",
  FormDescription: "",
};

// Initial Validation
const initialValidationSchema = yup.object({
  FormTitle: yup
    .string("Enter the form title")
    .required("This field must be specified"),
  FormDescription: yup
    .string("Enter the form title")
    .required("This field must be specified"),
});

function InitialScreen() {
  // Dependencies
  const gs = new GraphStructureService();

  // ContextAPI
  const [, setFormData] = useContext(FormData);

  // handleSubmit
  const handleFormSubmit = async (values) => {
    const reset = true;
    setFormData(await gs.initializeGraphForm(values, reset));
  };

  // Formik
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: initialValidationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Fragment>
      <div className={styles.InitialFormScreen} onSubmit={handleFormSubmit}>
        <h2>Pre-clinic Form Builder</h2>
        <form onSubmit={formik.handleSubmit} className={styles.InitialForm}>
          {formFields.map((formField, index) => (
            <div
              key={`Initial_Form_Field_${index}`}
              className={styles.FormFieldContainer}
            >
              <TextField
                variant="outlined"
                className={styles.FormField}
                id={formField.id}
                name={formField.id}
                label={formField.label}
                value={formik.values[formField.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[formField.id] &&
                  Boolean(formik.errors[formField.id])
                }
                helperText={
                  formik.touched[formField.id] && formik.errors[formField.id]
                }
              />
            </div>
          ))}
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              type="submit"
              className={styles.SubmitButton}
            >
              CREATE
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default InitialScreen;
