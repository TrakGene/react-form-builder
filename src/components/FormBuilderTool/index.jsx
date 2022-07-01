import React from "react";
// Components
import Tool from "../Tool/Tool";
import Canvas from "../Canvas/Canvas";

// Styles
import styles from "./FormBuilderTool.module.css";

function FormBuilderTool() {
  const formTools = ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"];
  return (
    <div className={styles.FomBuilderContainer}>
      <div className={styles.FormCanvas}>
        <Canvas />
      </div>
      <div className={styles.FormToolsContainer}>
        {formTools.map((tool, index) => (
          <div key={`Tool_${index}`}>
            <Tool toolName={tool} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormBuilderTool;
