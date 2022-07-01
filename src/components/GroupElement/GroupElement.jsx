import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";

// ContextAPI
import { PopupContext } from "../../App";

// Constants
import { POPUP_TYPES } from "../../constants/popupTypes";

// Styles
import styles from "./GroupElement.module.css";

function GroupElement({ groupId, data }) {
  const [popupContext, setPopupContext] = useContext(PopupContext);
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
    });
  };

  const handleAddFormElement = (item) => {
    setPopupContext({
      show: true,
      type: POPUP_TYPES.ADD_FORM_ELEMENT,
      data: { element: item.toolName, id: groupId },
    });
  };

  return (
    <div id={groupId} className={styles.GroupElement} ref={drop}>
      <div>
        <h2 style={{ margin: "0px" }}>{data.title}</h2>
        <p style={{ margin: "0px" }}>{data.description}</p>
      </div>
      <div style={{ marginTop: "10px" }}>
        {data.formElements.map((element, index) => {
          return <div key={`FormElement_${index}`}>{element}</div>;
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
