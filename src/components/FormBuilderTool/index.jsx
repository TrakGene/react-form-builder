import React from "react";
// Components
import Tool from "../Tool/Tool";
import Canvas from "../Canvas/Canvas";

// Styles
import styles from "./FormBuilderTool.module.css";

// Constants
import { getUserSideFormTypes } from "../../constants/formTypes";

function FormBuilderTool() {
  const formTools = getUserSideFormTypes();
  return (
    <div className={styles.FomBuilderContainer}>
      <div className={styles.FormCanvas}>
        <Canvas />
      </div>
      <div className={styles.FormToolsContainer}>
        {formTools.map((tool, index) => (
          <div key={`Tool_${index}`}>
            <Tool toolName={tool.value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormBuilderTool;
