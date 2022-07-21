import React, { useContext } from "react";

// ContextAPI
import { FormData, PopupContext } from "../../App";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Constants
import { FORM_TYPES, getUserSideFormTypeById } from "../../constants/formTypes";
import { POPUP_TYPES } from "../../constants/popupTypes";

// Services
import GraphStructureService from "../../services/graph.structurer.service";

function FormComponent({ element, groupId }) {
  const gs = new GraphStructureService();
  const [, setPopupContext] = useContext(PopupContext);
  const [formDataContext, setFormDataContext] = useContext(FormData);

  const handleEdit = () => {
    setPopupContext({
      data: {
        id: groupId,
        formData: element,
        type: element.type,
      },
      show: true,
      edit: true,
      type: POPUP_TYPES.ADD_FORM_ELEMENT,
    });
  };

  const handleDelete = () => {
    setFormDataContext(
      gs.deleteFormElement(groupId, element.id, formDataContext)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ margin: "0px" }}>
          <strong>Label: </strong>
          {element.label}
        </p>
        <p style={{ margin: "0px" }}>
          <strong>Form Type: </strong>
          {getUserSideFormTypeById(element.type)}
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ cursor: "pointer", marginRight: "10px" }}>
          <EditIcon onClick={handleEdit} />
        </div>
        <div style={{ cursor: "pointer" }}>
          <DeleteIcon onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default FormComponent;
