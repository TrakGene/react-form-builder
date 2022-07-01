// Libraries
import { Fragment, useContext, useEffect, useState } from "react";
import Xarrow from "react-xarrows";

// Styles
import styles from "./FormBuilderPage.module.css";

// Components
import FormBuilderTool from "../FormBuilderTool";
import GraphStructureService from "../../services/graph.structurer.service";

// ContextAPI
import { FormData } from "../../App";

function FormBuilderPage() {
  return (
    <Fragment>
      <div className={styles.FormBuilderPage}>
        <div style={{ width: "90vw", margin: "auto" }}>
          <h2>Form Builder</h2>
          <p>Add formElements to the groups to group them together</p>
          <p>
            Conditions can be added to the groups to create personalized forms
          </p>
        </div>
        <div className={styles.FormBuilderContainer}>
          <FormBuilderTool />
        </div>
      </div>
    </Fragment>
  );
}

export default FormBuilderPage;
