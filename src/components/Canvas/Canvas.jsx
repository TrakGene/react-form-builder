// Styles
import styles from "./Canvas.module.css";

// Libraries
import React, { Fragment, useContext, useEffect, useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";

// ContextAPI
import { FormData } from "../../App";
import Group from "../Group/Group";

import GraphStructureService from "../../services/graph.structurer.service";

function Canvas() {
  const [formData] = useContext(FormData);
  const gs = new GraphStructureService();
  const [connections, setConnections] = useState(
    gs.getGraphConnections(formData)
  );

  useEffect(() => {
    setConnections(gs.getGraphConnections(formData));
  }, [formData]);

  return (
    <div className={styles.Canvas}>
      <Group
        data={formData.schema}
        groupIdArray={[{ id: formData.startingGroupId, type: "default" }]}
      />
      <Xwrapper>
        {connections.map((connection, index) => {
          return (
            <Fragment key={`Connection_${index}`}>
              {/* <Xarrow start={connection[0]} end={connection[1]} /> */}
            </Fragment>
          );
        })}
      </Xwrapper>
    </div>
  );
}

export default Canvas;
