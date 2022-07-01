// Constants
import {
  INITIAL_FORM_STRUCTURE,
  INITIAL_GROUP_STRUCTURE,
} from "../constants/initialStructure";

// Libraries
import { v4 as uuidv4 } from "uuid";

// Dependencies
const graphStepConverter = (schema, currentStep, steppedArray) => {
  if (currentStep.length === 0) return;
  let step = [];
  let nextStep = [];
  for (let i = 0; i < currentStep.length; i++) {
    const groupId = currentStep[i];
    const connectedTo = schema[groupId]["groupsConnectedTo"];
    for (let j = 0; j < connectedTo.length; j++) {
      step.push(schema[connectedTo[j]]);
      nextStep.push(connectedTo[i]);
    }
  }
  if (step.length) steppedArray.push(step);
  graphStepConverter(schema, nextStep, steppedArray);
};

const getGraphStepConnections = (schema, currentStep, connectionsArray) => {
  if (currentStep.length === 0) return;
  let nextStep = [];
  for (let i = 0; i < currentStep.length; i++) {
    const groupId = currentStep[i];
    const connectedTo = schema[groupId]["groupsConnectedTo"];
    for (let j = 0; j < connectedTo.length; j++) {
      connectionsArray.push([groupId, connectedTo[j]]);
      nextStep.push(connectedTo[j]);
    }
  }
  getGraphStepConnections(schema, nextStep, connectionsArray);
};

export default class GraphStructureService {
  async initializeEmptyGroup({ initialFormValues, renderType, condition }) {
    let initialGroupStructure = { ...INITIAL_GROUP_STRUCTURE };
    initialGroupStructure.id = uuidv4();
    initialGroupStructure.title = initialFormValues.FormTitle;
    initialGroupStructure.description = initialFormValues.FormDescription;
    initialGroupStructure.renderType = renderType || "default";
    initialGroupStructure.condition = condition || [];
    initialGroupStructure.groupsConnectedTo = [];
    return initialGroupStructure;
  }

  async initializeGraphForm(initialFormValues) {
    let initialStructure = INITIAL_FORM_STRUCTURE;
    const newGroup = await this.initializeEmptyGroup({ initialFormValues });
    initialStructure.title = initialFormValues.FormTitle;
    initialStructure.description = initialFormValues.FormDescription;
    initialStructure.startingGroupId = newGroup.id;
    initialStructure.schema[newGroup.id] = newGroup;
    return initialStructure;
  }

  convertFormDataToRenderStructure = (data) => {
    let steppedArray = [[data.schema[data.startingGroupId]]];
    let currentStep = [data.startingGroupId];
    graphStepConverter(data.schema, currentStep, steppedArray);
    return steppedArray;
  };

  getGraphConnections = (data) => {
    let connectionsArray = [];
    let currentStep = [data.startingGroupId];
    getGraphStepConnections(data.schema, currentStep, connectionsArray);
    return connectionsArray;
  };
}
