// Constants
import {
  INITIAL_FORM_STRUCTURE,
  INITIAL_GROUP_STRUCTURE,
} from "../constants/initialStructure";

// Libraries
import { v4 as uuidv4 } from "uuid";
import { CONDITIONAL_FORM_TYPES, FORM_TYPES } from "../constants/formTypes";
import _ from "lodash";

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
  if (!data.schema[sectionId] || !data.schema[sectionId].groupsConnectedTo)
    return;
  data.schema[sectionId].groupsConnectedTo.forEach((section) => {
    connectedSections.push(section.id);
    getConnectedSections(section.id, data, connectedSections);
  });
};

const cleanGraphAfterRemoveSection = (sectionId, formData) => {
  for (let key in formData.schema) {
    let connections = [];
    for (let i = 0; i < formData.schema[key].groupsConnectedTo.length; i++) {
      if (formData.schema[key].groupsConnectedTo[i].id !== sectionId)
        connections.push(formData.schema[key].groupsConnectedTo[i]);
    }
    formData.schema[key].groupsConnectedTo = connections;
  }
};

const editSchemaAfterFormEdit = (formId, data) => {
  const sections = [];
  for (let key in data.schema) {
    if (
      data.schema[key].condition.id === formId ||
      data.schema[key].condition.formId === formId
    )
      sections.push(key);
  }
  sections.forEach((section) => {
    data.schema[section].condition = {};
    data.schema[section].warning =
      "This section has no conditions to be rendered";
    // cleanGraphAfterRemoveSection(section, data);
  });
};

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
    initialGroupStructure.warning = "";
    return initialGroupStructure;
  }

  async initializeGraphForm(initialFormValues, reset) {
    let initialStructure = INITIAL_FORM_STRUCTURE;
    const newGroup = await this.initializeEmptyGroup({
      initialFormValues,
      previousConnection: null,
    });
    // Added a reset method to reinitialize to form schema to empty when comming from different component
    if (reset) {
      initialStructure.schema = {};
    }
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
    editSchemaAfterFormEdit(formId, data);
    return { ...data };
  };

  editFormElement = (formId, sectionId, data, value, edit) => {
    if (
      edit ||
      value.type === FORM_TYPES.LONG_TEXT ||
      value.type === FORM_TYPES.SHORT_TEXT ||
      value.type === FORM_TYPES.EMBED_CONTENT
    )
      editSchemaAfterFormEdit(formId, data);
    if (
      value.type !== FORM_TYPES.LONG_TEXT &&
      value.type !== FORM_TYPES.SHORT_TEXT &&
      value.type !== FORM_TYPES.EMBED_CONTENT
    )
      for (let section in data.schema) {
        if (
          data.schema[section].condition &&
          (data.schema[section].condition.formId === formId ||
            data.schema[section].condition.id === formId)
        ) {
          data.schema[section].condition.condition =
            data.schema[sectionId].title + " | " + value.label;
          data.schema[section].condition.type = value.type;
          data.schema[section].condition.options = value.options;
          if (edit) data.schema[sectionId].condition.value = [];
        }
      }
    return { ...data };
  };

  getConditionCheckElements = (sectionId, data) => {
    const connections = [];
    getConditionElements(sectionId, data, connections);
    return [...connections];
  };

  verifyUniqueCondition = (sectionId, data, condition) => {
    let found = false;
    data.schema[sectionId].groupsConnectedTo.forEach((section) => {
      if (section && section.id) {
        if (_.isEqual(data.schema[section.id].condition, condition))
          found = true;
      }
    });
    return !found;
  };

  editSection(sectionId, updatedData, data) {
    const newData = { ...data };
    if (updatedData.title) newData.schema[sectionId].title = updatedData.title;
    if (updatedData.description)
      newData.schema[sectionId].description = updatedData.description;
    if (updatedData.condition)
      newData.schema[sectionId].condition = updatedData.condition;
    newData.schema[sectionId].warning = "";
    return newData;
  }

  removeSection(sectionId, data) {
    const updatedData = { ...data };
    const connectedSections = [];
    getConnectedSections(sectionId, data, connectedSections);
    updatedData.schema[sectionId].previousConnections.forEach((section) => {
      if (section) {
        updatedData.schema[section].groupsConnectedTo = updatedData.schema[
          section
        ].groupsConnectedTo.filter(function (item) {
          return item !== sectionId;
        });
        updatedData.schema[section].groupsConnectedTo = [
          ...updatedData.schema[section].groupsConnectedTo,
          ...updatedData.schema[sectionId].groupsConnectedTo,
        ];
      }
    });
    updatedData.schema[sectionId].groupsConnectedTo.forEach((section) => {
      if (section) {
        updatedData.schema[section.id].previousConnections = updatedData.schema[
          section.id
        ].previousConnections.filter(function (item) {
          return item !== sectionId;
        });
        updatedData.schema[section.id].previousConnections = [
          ...updatedData.schema[section.id].previousConnections,
          ...updatedData.schema[sectionId].previousConnections,
        ];
      }
    });
    delete updatedData.schema[sectionId];
    connectedSections.forEach((section) => {
      updatedData.schema[section].condition = {};
      // updatedData.schema[section].previousConnections = [];
      // updatedData.schema[section].groupsConnectedTo = [];
      updatedData.schema[section].warning =
        "This section has no conditions to be rendered";
    });
    cleanGraphAfterRemoveSection(sectionId, updatedData);
    return updatedData;
  }
}
