import Button from "@material-ui/core/Button";
import React, { useContext } from "react";

// ContextAPI
import { FormData, PopupContext } from "../../../../App";

// Styles
import styles from "./AddFormElement.module.css";

function AddFormElement() {
  const [popupContext, setPopupContext] = useContext(PopupContext);
  const [formData, setFormData] = useContext(FormData);

  const handleAddFormElement = async () => {
    const updatedFormData = { ...formData };
    updatedFormData.schema[popupContext.data.id].formElements.push(
      popupContext.data.element
    );
    setFormData(updatedFormData);
    setPopupContext({ ...popupContext, show: false });
  };
  return (
    <div>
      AddFormElement {popupContext.data.element}
      <Button
        variant="outlined"
        className={styles.SubmitButton}
        onClick={handleAddFormElement}
      >
        ADD
      </Button>
    </div>
  );
}

export default AddFormElement;
