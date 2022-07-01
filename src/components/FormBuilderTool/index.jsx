import React, { Fragment, useContext, useEffect, useState } from "react";
import Xarrow from "react-xarrows";

// Components
import Tool from "../Tool/Tool";
import Canvas from "../Canvas/Canvas";

// Styles
import styles from "./FormBuilderTool.module.css";
import GraphStructureService from "../../services/graph.structurer.service";
import { FormData } from "../../App";

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
