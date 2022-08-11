// Libraries
import { Fragment } from "react";

// Styles
import styles from "./FormBuilderPage.module.css";

// Components
import FormBuilderTool from "../FormBuilderTool";

function FormBuilderPage() {
  return (
    <Fragment>
      <div className={styles.FormBuilderPage}>
        <div style={{ width: "90vw", margin: "auto" }}>
          <h2>Form Builder</h2>
          <p>Add formElements to the section to group them together</p>
          <p>
            Conditions can be added to the sections to create personalized forms
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
