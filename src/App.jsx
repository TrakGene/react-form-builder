// Styles
import "./App.css";

// Libraries
import { createContext, useState } from "react";

// Components
import InitialScreen from "./components/InitialScreen";
import FormBuilderPage from "./components/formBuilderPage";

// The total `Structure` is named as FormData (ContextAPI)
export const FormData = createContext({});

function App() {
  const formData = useState({});
  return (
    // Passing both the initial values and the setter function
    <FormData.Provider value={formData}>
      {!Object.keys(formData[0]).length ? (
        <InitialScreen />
      ) : (
        <FormBuilderPage />
      )}
    </FormData.Provider>
  );
}

export default App;
