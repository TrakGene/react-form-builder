// Styles
import styles from "./Canvas.module.css";

// Libraries
import React, { useContext } from "react";

// ContextAPI
import { FormData } from "../../App";
import Group from "../Section/Section";

function Canvas() {
  const [formData] = useContext(FormData);
  return (
    <div className={styles.Canvas}>
      <Group
        data={formData.schema}
        groupIdArray={[{ id: formData.startingGroupId, type: "default" }]}
      />
    </div>
  );
}

export default Canvas;
