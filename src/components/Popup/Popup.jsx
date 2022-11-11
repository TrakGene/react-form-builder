import React, { useContext } from "react";
import { PopupContext } from "../../App.jsx";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Popup Types
import AddGroup from "./types/AddGroup/AddGroup.jsx";
import AddFormElement from "./types/AddFormElement/AddFormElement.jsx";

// Constants
import { POPUP_TYPES } from "../../constants/popupTypes.js";

// Popup Styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "1px solid rgb(0, 213, 255)",
  borderRadius: "10px",
  boxShadow: 24,
  maxWidth: "80vw",
  p: 4,
};

function Popup() {
  const [popupContext, setPopupContext] = useContext(PopupContext);

  return (
    <div>
      <Modal
        open={popupContext.show}
        onClose={() => setPopupContext({ ...popupContext, show: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {popupContext.type === POPUP_TYPES.ADD_GROUP && (
            <AddGroup edit={popupContext.edit} />
          )}
          {popupContext.type === POPUP_TYPES.ADD_FORM_ELEMENT && (
            <AddFormElement />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;
