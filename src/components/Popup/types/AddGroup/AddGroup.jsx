// ContextAPI
import { FormData, PopupContext } from "../../../../App";

// Libraries
import React, { Fragment, useContext } from "react";
import { useFormik, Field, Form } from "formik";

// Components
import Button from "@mui/material/Button";
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
import { useEffect } from "react";

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

function AddGroup({ edit }) {
  // Dependencies
  const gs = new GraphStructureService();

  //   ContextAPI
  const [formData, setFormData] = useContext(FormData);
  const [popupContext, setPopupContext] = useContext(PopupContext);

  // State
  const [conditionElements, setConditionElements] = useState([]);
  const [conditionOptions, setConditionOptions] = useState([]);

  useEffect(() => {
    if (popupContext.edit) {
      if (
        popupContext.data.previousConnections &&
        popupContext.data.previousConnections.length
      ) {
        setConditionElements(
          gs.getConditionCheckElements(
            popupContext.data.previousConnections[0],
            formData
          )
        );
        setConditionOptions(popupContext.data.condition.options);
        setFormikState({
          values: {
            GroupHeader: popupContext.data.title,
            GroupDescription: popupContext.data.description,
            Condition: popupContext.data.condition,
          },
        });
      } else
        setFormikState({
          values: {
            GroupHeader: popupContext.data.title,
            GroupDescription: popupContext.data.description,
          },
        });
    } else {
      setConditionElements(
        gs.getConditionCheckElements(popupContext.data.id, formData)
      );
    }
  }, []);

  // handleSubmit
  const handleFormSubmit = async (values) => {
    if (edit) {
      handleEditSection();
      return;
    }
    console.log(values);
    const newGroup = await gs.initializeEmptyGroup({
      initialFormValues: {
        FormTitle: values.GroupHeader,
        FormDescription: values.GroupDescription,
      },
      condition: {
        formId: values.Condition.id,
        sectionId: values.Condition.sectionId,
        value: values.ConditionOptions,
        condition: values.Condition.condition,
        type: values.Condition.type,
        options: conditionOptions,
      },
      previousConnection: popupContext.data.id,
    });
    let updateFormData = { ...formData };
    updateFormData.schema[popupContext.data.id].groupsConnectedTo.push({
      id: newGroup.id,
      renderType: "default",
    });
    updateFormData.schema[newGroup.id] = { ...newGroup };
    console.log(updateFormData);
    setFormData(updateFormData);
    setPopupContext({ ...popupContext, show: false });
  };

  const handleEditSection = () => {
    setFormData(
      gs.editSection(
        popupContext.data.id,
        {
          title: formikState.values.GroupHeader,
          description: formikState.values.GroupDescription,
          condition: formikState.values.Condition,
        },
        formData
      )
    );
    setPopupContext({ ...popupContext, show: false });
  };

  const handleClose = async () => {
    setPopupContext({ ...popupContext, show: false });
  };

  // Formik
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      handleFormSubmit(formikState.values);
    },
  });

  const [formikState, setFormikState] = useState({ values: formik.values });

  console.log(formikState.values);

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
                value={formikState.values[formField.id]}
                onChange={(e) => {
                  formik.handleChange(e);
                  setFormikState({
                    values: {
                      ...formikState.values,
                      [formField.id]: e.target.value,
                    },
                  });
                }}
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
          {(popupContext.data.id != formData.startingGroupId || !edit) && (
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
                value={formikState.values.Condition.condition}
              >
                <MenuItem
                  key={`Condition_${0}`}
                  value={`None`}
                  onClick={() => {
                    formikState.values.Condition = {
                      condition: "None",
                      type: "NONE",
                    };
                    setFormikState({
                      values: {
                        ...formikState.values,
                        Condition: {
                          condition: "None",
                          type: "NONE",
                        },
                      },
                    });
                  }}
                >
                  None
                </MenuItem>
                {conditionElements.map((ft, index) => (
                  <MenuItem
                    key={`Condition_${index + 1}`}
                    value={`${formData.schema[ft.sectionId].title} | ${
                      ft.label
                    }`}
                    onClick={() => {
                      setConditionOptions([...ft.options]);
                      // setFormikState({ values: formik.values });
                      setFormikState({
                        values: {
                          ...formikState.values,
                          Condition: {
                            ...ft,
                            condition: `${
                              formData.schema[ft.sectionId].title
                            } | ${ft.label}`,
                          },
                        },
                      });
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
                    {conditionOptions.map((option) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formikState.values.Condition.options.includes(
                              option
                            )}
                            onClick={() => {
                              const updatedState = { ...formikState };
                              console.log(
                                formikState.values.Condition.options.includes(
                                  option
                                )
                              );
                              if (
                                formikState.values.Condition.options.includes(
                                  option
                                )
                              ) {
                                const index =
                                  formikState.values.Condition.options.indexOf(
                                    option
                                  );
                                console.log(index);
                                console.log(option);
                                updatedState.values.Condition.options.splice(
                                  index,
                                  1
                                );
                              } else {
                                updatedState.values.Condition.options.push(
                                  option
                                );
                              }
                              setFormikState(updatedState);
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
                              formikState.values.Condition.value === option
                            }
                            onClick={() => {
                              const updatedState = { ...formikState };
                              updatedState.values.Condition.value = option;
                              setFormikState(updatedState);
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
          )}
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
