// Constants
import {
  INITIAL_FORM_STRUCTURE,
  INITIAL_GROUP_STRUCTURE,
} from "../constants/initialStructure";

// Libraries
import { v4 as uuidv4 } from "uuid";

export default class GraphStructureService {
  initializeEmptyGroup(renderType, condition) {
    let initialGroupStructure = INITIAL_GROUP_STRUCTURE;
    initialGroupStructure.id = uuidv4();
    initialGroupStructure.renderType = renderType || "default";
    initialGroupStructure.condition = condition || [];
    return initialGroupStructure;
  }

  initializeGraphForm(initialFormValues) {
    let initialStructure = INITIAL_FORM_STRUCTURE;
    const newGroup = this.initializeEmptyGroup();
    initialStructure.title = initialFormValues.FormTitle;
    initialStructure.description = initialFormValues.FormDescription;
    initialStructure.startingGroupId = newGroup.id;
    initialStructure.schema[newGroup.id] = newGroup;
    return initialStructure;
  }
}
