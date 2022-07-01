// Styles
import styles from "./Tool.module.css";

// Libraries
import React from "react";
import { useDrag } from "react-dnd";

function Tool({ toolName }) {
  const [, drag] = useDrag(() => ({
    type: "tool",
    item: { toolName: `${toolName}` },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div className={styles.ToolContainer} ref={drag}>
      {toolName}
    </div>
  );
}

export default Tool;
