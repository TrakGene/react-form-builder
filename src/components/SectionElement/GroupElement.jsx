import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useState } from "react";
import { useDrop } from "react-dnd";

// ContextAPI
import { FormData, PopupContext } from "../../App";
import { getFormType } from "../../constants/formTypes";

// Constants
import { POPUP_TYPES } from "../../constants/popupTypes";
import FormComponent from "../SectionComponent/SectionComponent";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Styles
import styles from "./GroupElement.module.css";

function GroupElement({ groupId }) {
  const [popupContext, setPopupContext] = useContext(PopupContext);
  const [formDataContext] = useContext(FormData);
  const [data] = useState(formDataContext.schema[groupId]);
  const [, drop] = useDrop({
    accept: "tool",
    drop: (item) => {
      handleAddFormElement(item);
    },
    collect: (monitor) => ({
      hover: monitor.isOver({ shallow: true }),
    }),
  });

  // Handle Functions
  const handleAddGroup = () => {
    setPopupContext({
      ...popupContext,
      show: true,
      type: POPUP_TYPES.ADD_GROUP,
      data,
      edit: false,
    });
  };

  const handleEditSection = () => {
    setPopupContext({
      ...popupContext,
      show: true,
      type: POPUP_TYPES.ADD_GROUP,
      data,
      sectionData: data,
      edit: true,
    });
  };

  const handleAddFormElement = (item) => {
    setPopupContext({
      show: true,
      type: POPUP_TYPES.ADD_FORM_ELEMENT,
      data: {
        id: groupId,
        type: getFormType(item.toolName),
      },
    });
  };

  return (
    <div id={groupId} className={styles.GroupElement} ref={drop}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <h2 style={{ margin: "0px" }}>{data.title}</h2>
          <p style={{ margin: "0px" }}>{data.description}</p>
        </div>
        <div style={{ display: "flex" }}>
          <EditIcon
            style={{ marginRight: "5px", cursor: "pointer" }}
            onClick={handleEditSection}
          />
          <DeleteIcon style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        {data.formElements.map((element, index) => {
          return (
            <div key={`FormElement_${index}`}>
              <FormComponent element={element} groupId={groupId} />
            </div>
          );
        })}
      </div>
      <div style={{ margin: "10px", textAlign: "center" }}>
        <Button
          variant="outlined"
          className={styles.AddGroupButton}
          onClick={handleAddGroup}
        >
          ADD GROUP
        </Button>
      </div>
    </div>
  );
}

export default GroupElement;
