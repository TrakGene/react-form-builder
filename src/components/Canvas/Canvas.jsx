// Styles
import styles from "./Canvas.module.css";

// Libraries
import React, { useContext } from "react";

// ContextAPI
import { FormData } from "../../App";
import Section from "../Section/Section";

function Canvas() {
  const [formData, setFormData] = useContext(FormData);
  return (
    <div className={styles.Canvas}>
      <Section
        data={formData.schema}
        groupIdArray={[{ id: formData.startingGroupId, type: "default" }]}
      />
    </div>
  );
}

export default Canvas;
