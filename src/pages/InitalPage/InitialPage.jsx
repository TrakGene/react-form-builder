// Libraries
import React, { useContext } from "react";

// ContextAPI
import { FormData } from "../../App";

// Components
import FormBuilderPage from "../../components/formBuilderPage";
import InitialScreen from "../../components/InitialScreen";

function InitialPage() {
  const [formData] = useContext(FormData);
  return (
    <div>
      {!Object.keys(formData).length ? <InitialScreen /> : <FormBuilderPage />}
    </div>
  );
}

export default InitialPage;
