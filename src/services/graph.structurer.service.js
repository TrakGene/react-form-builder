// Constants
import {
  INITIAL_FORM_STRUCTURE,
  INITIAL_GROUP_STRUCTURE,
} from "../constants/initialStructure";

// Libraries
import { v4 as uuidv4 } from "uuid";
import { CONDITIONAL_FORM_TYPES } from "../constants/formTypes";

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
      connectionsArray.push([groupId, connectedTo[j].id]);
      nextStep.push(connectedTo[j].id);
    }
  }
  getGraphStepConnections(schema, nextStep, connectionsArray);
};

const getConditionElements = (sectionId, data, connections) => {
  if (
    !data.schema[sectionId] ||
    data.schema[sectionId].previousConnections.length === 0
  )
    return;
  for (let i = 0; i < data.schema[sectionId].formElements.length; i++) {
    if (CONDITIONAL_FORM_TYPES[data.schema[sectionId].formElements[i].type])
      connections.push({
        ...data.schema[sectionId].formElements[i],
        sectionId,
      });
  }
  for (let i = 0; i < data.schema[sectionId].previousConnections.length; i++) {
    if (data.schema[sectionId].previousConnections[i])
      getConditionElements(
        data.schema[sectionId].previousConnections[i],
        data,
        connections
      );
  }
};

const getConnectedSections = (sectionId, data, connectedSections) => {
  data.schema[sectionId].groupsConnectedTo.forEach((section) => {
    connectedSections.push(section);
    getConnectedSections(section, data, connectedSections);
  });
};

const removeSection = (sectionId, data) => {};

export default class GraphStructureService {
  async initializeEmptyGroup({
    previousConnection,
    initialFormValues,
    renderType,
    condition,
  }) {
    let initialGroupStructure = { ...INITIAL_GROUP_STRUCTURE };
    initialGroupStructure.id = uuidv4();
    initialGroupStructure.title = initialFormValues.FormTitle;
    initialGroupStructure.description = initialFormValues.FormDescription;
    initialGroupStructure.renderType = renderType || "default";
    initialGroupStructure.condition = condition || {};
    initialGroupStructure.formElements = [];
    initialGroupStructure.groupsConnectedTo = [];
    initialGroupStructure.previousConnections = [previousConnection];
    return initialGroupStructure;
  }

  async initializeGraphForm(initialFormValues) {
    let initialStructure = INITIAL_FORM_STRUCTURE;
    const newGroup = await this.initializeEmptyGroup({
      initialFormValues,
      previousConnection: null,
    });
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

  deleteFormElement = (groupId, formId, data) => {
    const updatedForms = [];
    data.schema[groupId].formElements.forEach((form) => {
      if (form.id !== formId) updatedForms.push(form);
    });
    data.schema[groupId].formElements = updatedForms;
    console.log(data);
    return { ...data };
  };

  getConditionCheckElements = (sectionId, data) => {
    const connections = [];
    // for (
    //   let i = 0;
    //   i < data.schema[sectionId].previousConnections.length;
    //   i++
    // ) {
    //   if (data.schema[sectionId].previousConnections[i])
    //     getConditionElements(
    //       data.schema[sectionId].previousConnections[i],
    //       data,
    //       connections
    //     );
    // }
    getConditionElements(sectionId, data, connections);
    return [...connections];
  };

  editSection(sectionId, updatedData, data) {
    const newData = { ...data };
    console.log(updatedData);
    if (updatedData.title) newData.schema[sectionId].title = updatedData.title;
    if (updatedData.description)
      newData.schema[sectionId].description = updatedData.description;
    if (updatedData.condition)
      newData.schema[sectionId].condition = updatedData.condition;
    return newData;
  }
}
