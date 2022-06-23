// ContextAPI
import { FormData } from "../../App";

// Libraries
import { Fragment, useContext } from "react";

// Styles
import styles from "./FormBuilderPage.module.css";

// Components
import FormBuilderTool from "../FormBuilderTool";

function FormBuilderPage() {
  // ContextAPI
  const [formData] = useContext(FormData);
  return (
    <Fragment>
      <div className={styles.FormBuilderPage}>
        <h2>{formData.title}</h2>
        <p>{formData.description}</p>
        <div className={styles.FormBuilderContainer}>
          <FormBuilderTool />
        </div>
      </div>
    </Fragment>
  );
}

export default FormBuilderPage;
