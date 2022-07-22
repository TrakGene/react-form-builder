// Styles
import "./App.css";

// Libraries
import { createContext, useState } from "react";

// Components
import InitialPage from "./pages/InitalPage/InitialPage";
import Popup from "./components/Popup/Popup";

// The total `Structure` is named as FormData (ContextAPI)
export const FormData = createContext({});
export const VisitedNodeContext = createContext({});
export const PopupContext = createContext({ show: false });

function App() {
  const formData = useState({});
  const visitedContext = useState({});
  const popupContext = useState({ show: false });
  return (
    // Passing both the initial values and the setter function
    <FormData.Provider value={formData}>
      <VisitedNodeContext.Provider value={visitedContext}>
        <PopupContext.Provider value={popupContext}>
          <InitialPage />
          <Popup />
        </PopupContext.Provider>
      </VisitedNodeContext.Provider>
    </FormData.Provider>
  );
}

export default App;
