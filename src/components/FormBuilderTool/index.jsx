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
import {
  getUserSideTemplateTypes,
  TEMPLATE_TYPES_ICON,
} from "../../constants/templateTypes";
import { Button } from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";

function FormBuilderTool() {
  const formTools = getUserSideFormTypes();
  const templates = getUserSideTemplateTypes();
  console.log(formTools);

  return (
    <div className={styles.FomBuilderContainer}>
      <div className={styles.FormCanvas}>
        <Canvas />
      </div>
      <div className={styles.FormToolsContainer}>
        <p>Tools</p>
        <div className={styles.FormToolsInnerContainer}>
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
                style={{ height: "30px", marginLeft: "5px" }}
              />
              <Tool toolName={tool.value} />
            </div>
          ))}
        </div>
        {/* <Button variant="contained">
          <AddIcon /> CUSTOM COMPONENT
        </Button> */}
        <p>Templates</p>
        <div className={styles.FormToolsInnerContainer}>
          {templates.map((tool, index) => (
            <div
              style={{
                display: "flex",
                width: "100%",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                // margin: "10px",
                alignItems: "center",
              }}
              key={`Tool_${index}`}
            >
              <img
                src={require(`../../assets/icons/${
                  TEMPLATE_TYPES_ICON[tool.key]
                }`)}
                alt="Form_Type_Icon"
                style={{ height: "30px", marginLeft: "5px" }}
              />
              <Tool toolName={tool.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormBuilderTool;
