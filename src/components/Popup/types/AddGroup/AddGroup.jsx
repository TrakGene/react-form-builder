// ContextAPI
import { FormData, PopupContext } from "../../../../App";

// Libraries
import React, { Fragment, useContext } from "react";
import { useFormik, Field, Form } from "formik";

// Components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// styles
import styles from "./AddGroup.module.css";

// Dependencies
import GraphStructureService from "../../../../services/graph.structurer.service";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";
import { FORM_TYPES } from "../../../../constants/formTypes";

const formFields = [
  { id: "GroupHeader", label: "Group Header", type: "text" },
  { id: "GroupDescription", label: "Group Description", type: "text" },
];
const initialFormValues = {
  GroupHeader: "",
  GroupDescription: "",
  Condition: {
    condition: "None",
    type: "NONE",
  },
  ConditionOptions: [],
};

function AddGroup() {
  // Dependencies
  const gs = new GraphStructureService();

  //   ContextAPI
  const [formData, setFormData] = useContext(FormData);
  const [popupContext, setPopupContext] = useContext(PopupContext);

  // State
  const [conditionElements] = useState(
    gs.getConditionCheckElements(popupContext.data.id, formData)
  );
  const [conditionOptions, setConditionOptions] = useState();
  const [formikState, setFormikState] = useState({ values: initialFormValues });

  // handleSubmit
  const handleFormSubmit = async (values) => {
    const newGroup = await gs.initializeEmptyGroup({
      initialFormValues: {
        FormTitle: values.GroupHeader,
        FormDescription: values.GroupDescription,
      },
      condition: {
        formId: values.Condition.id,
        value: values.ConditionOptions,
      },
      previousConnection: popupContext.data.id,
    });
    let updateFormData = { ...formData };
    updateFormData.schema[popupContext.data.id].groupsConnectedTo.push({
      id: newGroup.id,
      renderType: "default",
    });
    updateFormData.schema[newGroup.id] = { ...newGroup };
    setFormData(updateFormData);
    setPopupContext({ ...popupContext, show: false });
  };

  const handleClose = async () => {
    setPopupContext({ ...popupContext, show: false });
  };

  // Formik
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  console.log(formik.values);
  console.log(formData);

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
          <div>
            <h4>Add Conditions</h4>
            <p>
              Add conditions to render this section depending upon the options
              selected on the previous sections
            </p>
            <Select
              variant="outlined"
              placeholder="Form Type"
              style={{ width: "100%" }}
              value={formik.values.Condition.condition}
            >
              <MenuItem
                key={`Condition_${0}`}
                value={`None`}
                onClick={() => {
                  formik.values.Condition = { condition: "None", type: "NONE" };
                  setFormikState(formik);
                }}
              >
                None
              </MenuItem>
              {conditionElements.map((ft, index) => (
                <MenuItem
                  key={`Condition_${index + 1}`}
                  value={`${formData.schema[ft.sectionId].title} | ${ft.label}`}
                  onClick={() => {
                    formik.values.Condition = {
                      ...ft,
                      condition: `${formData.schema[ft.sectionId].title} | ${
                        ft.label
                      }`,
                    };
                    setConditionOptions(ft.options);
                    setFormikState(formik);
                  }}
                >
                  {formData.schema[ft.sectionId].title} | {ft.label}
                </MenuItem>
              ))}
            </Select>
            {formikState.values.Condition.type ===
              FORM_TYPES.CHECKBOX_INPUT && (
              <div>
                <FormGroup>
                  {conditionOptions.map((option, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formikState.values.ConditionOptions.includes(
                            option
                          )}
                          onClick={() => {
                            if (
                              formik.values.ConditionOptions.includes(option)
                            ) {
                              const index =
                                formik.values.ConditionOptions.indexOf(option);
                              formik.values.ConditionOptions.splice(index, 1);
                            } else {
                              formik.values.ConditionOptions.push(option);
                            }
                            setFormikState(formik);
                          }}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </div>
            )}
            {(formikState.values.Condition.type ===
              FORM_TYPES.MULTIPLE_CHOICE ||
              formikState.values.Condition.type === FORM_TYPES.DROPDOWN) && (
              <FormControl>
                <RadioGroup>
                  {conditionOptions.map((option, index) => (
                    <FormControlLabel
                      control={
                        <Radio
                          checked={
                            formikState.values.ConditionOptions === option
                          }
                          onClick={() => {
                            formik.values.ConditionOptions = option;
                            setFormikState(formik);
                          }}
                        />
                      }
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </div>
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
              CREATE
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default AddGroup;
