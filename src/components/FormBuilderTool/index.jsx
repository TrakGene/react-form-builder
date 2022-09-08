import React from "react";
// Components
import Tool from "../Tool/Tool";
import Canvas from "../Canvas/Canvas";

// Styles
import styles from "./FormBuilderTool.module.css";

// Constants
import {
  FORM_TYPE_ICON,
  getUserSideFormTypes,
} from "../../constants/formTypes";

function FormBuilderTool() {
  const formTools = getUserSideFormTypes();

  return (
    <div className={styles.FomBuilderContainer}>
      <div className={styles.FormCanvas}>
        <Canvas />
      </div>
      <div className={styles.FormToolsContainer}>
        {formTools.map((tool, index) => (
          <div
            style={{
              display: "flex",
              width: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              margin: "5px",
              alignItems: "center",
            }}
            key={`Tool_${index}`}
          >
            <img
              src={require(`../../assets/icons/${FORM_TYPE_ICON[tool.key]}`)}
              alt="Form_Type_Icon"
              style={{ height: "30px" }}
            />
            <Tool toolName={tool.value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormBuilderTool;
