// ContextAPI
import { FormData, PopupContext } from "../../../../App";

// Libraries
import React, { Fragment, useContext } from "react";
import { useFormik } from "formik";

// Components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// styles
import styles from "./AddGroup.module.css";

// Dependencies
import GraphStructureService from "../../../../services/graph.structurer.service";

const formFields = [
  { id: "GroupHeader", label: "Group Header", type: "text" },
  { id: "GroupDescription", label: "Group Description", type: "text" },
];
const initialFormValues = {
  GroupHeader: "",
  GroupDescription: "",
};

function AddGroup() {
  // Dependencies
  const gs = new GraphStructureService();

  //   ContextAPI
  const [formData, setFormData] = useContext(FormData);
  const [popupContext, setPopupContext] = useContext(PopupContext);

  // handleSubmit
  const handleFormSubmit = async (values) => {
    const newGroup = await gs.initializeEmptyGroup({
      initialFormValues: {
        FormTitle: values.GroupHeader,
        FormDescription: values.GroupDescription,
      },
    });
    let updateFormData = { ...formData };
    updateFormData.schema[popupContext.data.id].groupsConnectedTo.push(
      newGroup.id
    );
    updateFormData.schema[newGroup.id] = { ...newGroup };
    setFormData(updateFormData);
    setPopupContext({ ...popupContext, show: false });
  };

  // Formik
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <Fragment>
      <div className={styles.InitialFormScreen} onSubmit={handleFormSubmit}>
        <h2>Add New Group</h2>
        <p>
          Add new group of inputs and add conditions to make the form more
          personalized
        </p>
        <form onSubmit={formik.handleSubmit} className={styles.InitialForm}>
          {formFields.map((formField, index) => (
            <div
              key={`New_Group_Detail_${index}`}
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

export default AddGroup;
