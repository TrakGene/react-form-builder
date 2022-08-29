import React, { useContext } from "react";
import { VisitedNodeContext } from "../../App";
import GroupElement from "../SectionElement/GroupElement";

function Group({ groupIdArray, data }) {
  const [visitedContext, setVisitedContext] = useContext(VisitedNodeContext);
  return (
    <div style={{ display: "flex" }} key={`${new Date()}`}>
      {groupIdArray.map((groupId) => {
        let visited = visitedContext;
        setVisitedContext(visited);
        visited[groupId.id] = visited[groupId.id] ? visited[groupId] + 1 : 0;
        if (visited[groupId.id] === 2)
          return <React.Fragment key={new Date()}></React.Fragment>;
        return (
          <React.Fragment key={`${groupId.id}`}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // border: "1px solid black",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              <GroupElement groupId={groupId.id} data={data[`${groupId.id}`]} />
              <Group
                groupIdArray={data[`${groupId.id}`].groupsConnectedTo}
                data={data}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Group;
