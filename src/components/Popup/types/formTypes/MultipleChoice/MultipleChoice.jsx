// ContextAPI
import { FormData, PopupContext } from "../../../../../App";

// Libraries
import React, { Fragment, useContext, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// Components
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

// styles
import styles from "./MultipleChoice.module.css";

// constants
import { FORM_TYPES } from "../../../../../constants/formTypes";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialValidationSchema = yup.object({
  label: yup
    .string("Enter the form label")
    .required("This field must be specified"),
  options: yup
    .array()
    .min(1)
    .required("There must be at least one option mentioned"),
});

function MultipleChoice({ edit }) {
  // ContextAPI
  const [formData] = useContext(FormData);
  const [popupContext, setPopupContext] = useContext(PopupContext);
  const [option, setOption] = useState("");
  const [optionsEdit, setOptionsEdit] = useState({});
  const [optionEditText, setOptionEditText] = useState("");
  const [optionsList, setOptionsList] = useState([]);

  const initialFormValues = () => {
    let value = {};
    value = popupContext.data.formData || {
      label: "",
      options: [],
      isRequired: false,
      isIdentifier: false,
    };
    value.label = value.label || "";
    value.options = value.options || [];
    value.isRequired = value.isRequired || false;
    return value;
  };

  // handleSubmit
  const handleFormSubmit = async (values) => {
    values.type = FORM_TYPES.MULTIPLE_CHOICE;
    const updatedFormData = formData;
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
        }
      }
      updatedFormData.schema[popupContext.data.id].formElements = formElements;
      setPopupContext({ ...popupContext, show: false });
    }
  };

  const handleOptionsEdit = (index) => {
    setOptionsEdit({ ...optionsEdit, [index]: "Edit" });
    setOptionEditText(formik.values.options[index]);
  };

  const handleOptionsEditOperation = (index) => {
    if (optionEditText !== "") formik.values.options[index] = optionEditText;
    setOptionsEdit({ ...optionsEdit, [index]: 0 });
    setOptionsList(formik.values.options);
  };

  const handleDeleteOperation = (index) => {
    // formik.values.options = formik.values.options.filter(
    //   (options, i) => i !== index
    // );
    const updatedOptions = [];
    for (let i = 0; i < formik.values.options.length; i++) {
      console.log(i);
      if (index !== i) updatedOptions.push(formik.values.options[i]);
    }
    console.log(index);
    console.log(updatedOptions);
    formik.values.options = updatedOptions;
    setOptionsList(updatedOptions);
  };

  const handleClose = async () => {
    setPopupContext({ ...popupContext, show: false });
  };

  const handleAddOption = async (event) => {
    if (option === "") return;
    formik.values.options.push(option);
    delete formik.errors.options;
    setOptionsList(formik.values.options);
    setOption("");
    console.log(formik.values);
  };

  // Formik
  const formik = useFormik({
    initialValues: initialFormValues(),
    validationSchema: initialValidationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  useEffect(() => {
    setOptionsList(formik.values.options);
  }, []);

  return (
    <Fragment>
      <div className={styles.InitialFormScreen} onSubmit={handleFormSubmit}>
        <h2>Multiple Choice</h2>
        <p>Add a multiple choice input</p>
        <form className={styles.InitialForm}>
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
          {formik.values.options.length ? (
            <div>
              <h4>Options</h4>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {optionsList.map((optionText, index) => {
                  return (
                    <React.Fragment key={`Options_${index}`}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          padding: "5px",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <>
                          {!optionsEdit[index] ? (
                            <p style={{ margin: "0px" }}>{optionText}</p>
                          ) : (
                            <div>
                              <TextField
                                className={styles.FormField}
                                value={optionEditText}
                                onChange={(e) =>
                                  setOptionEditText(e.target.value)
                                }
                                error={optionEditText === ""}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter")
                                    handleOptionsEditOperation(index);
                                }}
                              />
                              {optionEditText === "" && (
                                <p
                                  style={{
                                    margin: "5px",
                                    color: "red",
                                    fontSize: "12px",
                                  }}
                                >
                                  It cannot be left empty
                                </p>
                              )}
                            </div>
                          )}
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              {!optionsEdit[index] ? (
                                <EditIcon
                                  onClick={() => {
                                    handleOptionsEdit(index);
                                  }}
                                />
                              ) : (
                                <Button
                                  onClick={() => {
                                    handleOptionsEditOperation(index);
                                  }}
                                  variant="contained"
                                >
                                  SAVE
                                </Button>
                              )}
                            </div>
                            <div
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleDeleteOperation(index);
                              }}
                            >
                              <DeleteIcon />
                            </div>
                          </div>
                        </>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>No options added</p>
          )}
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <TextField
              className={styles.FormField}
              id="options"
              name="options"
              label="Add Option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              error={
                formik.touched["options"] && Boolean(formik.errors["options"])
              }
              helperText={formik.touched["options"] && formik.errors["options"]}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleAddOption();
              }}
            />
            <Button
              variant="contained"
              style={{
                margin: "10px",
                height: "30px",
                marginTop: "20px",
                backgroundColor: "pink",
              }}
              onClick={handleAddOption}
            >
              ADD
            </Button>
          </div>
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
          <FormControlLabel
            control={
              <Checkbox
                id="isIdentifier"
                name="isIdentifier"
                checked={formik.values["isIdentifier"]}
                onChange={formik.handleChange}
              />
            }
            label="Is Identifier"
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
              onClick={formik.handleSubmit}
              variant="contained"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              {edit ? "SAVE" : "CREATE"}
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default MultipleChoice;
