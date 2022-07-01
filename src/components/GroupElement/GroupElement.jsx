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
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
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

  return (
    <div id={groupId} className={styles.GroupElement} ref={drop}>
      <div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div style={{ margin: "20px" }}>
        <Button className={styles.AddGroupButton} onClick={handleAddGroup}>
          ADD GROUP
        </Button>
      </div>
    </div>
  );
}

export default GroupElement;
