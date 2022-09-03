---
sidebar_position: 4
---

# Schema

Here we will discuss about the total schema of the form.

## Form Structure

This is an example structure

```js
{
  title: "Sample Form Title",
  description: "This is a sample description on how to collect genomics data",
  startingGroupId:"e705c2a6-b3b3-41e6-aea0-5140a714f2cb",
  schema: [
    "e705c2a6-b3b3-41e6-aea0-5140a714f2cb": {
        title: "Section 1",
        description: "This is the first section",
        condition: {
            condition: "None",
            type: "NONE"
        },
        formElements: [],
        groupsConnectedTo: [
            {id: '13355d24-e983-4d5d-8fd7-5ea308785a99', renderType: 'default'}
        ],
        id: "e705c2a6-b3b3-41e6-aea0-5140a714f2cb",
        previousConnections: [null],
        renderType: "default",
        warning: ""
    },
    "13355d24-e983-4d5d-8fd7-5ea308785a99": {
        title: "Section 2",
        description: "This is a section which is connected to Section 1 and Section 3.",
        condition: {
            condition: "None",
            type: "NONE"
        },
        formElements: [
            {
                id: "296a393d-5b0a-4a96-9322-67c0e0c7182d",
                isRequired: false,
                isIdentifier: true,
                label: "Sample Question 1",
                options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
                type: "CHECKBOX_INPUT"
            }
        ],
        groupsConnectedTo: [
            {id: '14555d24-e900-4d5d-8fd7-5ea308785a91', renderType: 'default'}
        ],
        id: "13355d24-e983-4d5d-8fd7-5ea308785a99",
        previousConnections: ['e705c2a6-b3b3-41e6-aea0-5140a714f2cb'],
        renderType: "default",
        warning: ""
    },
    "14555d24-e900-4d5d-8fd7-5ea308785a91": {
        title: "Section 3",
        description: "This is a section which is connected to Section 2.",
        condition: {
            condition: "None",
            type: "NONE"
        },
        formElements: [
            {
                id: "296a393d-5b0a-4a96-9322-67c0e0c7182d",
                isRequired: false,
                isIdentifier: true,
                label: "Sample Question 1",
                options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
                type: "CHECKBOX_INPUT"
            }
        ],
        groupsConnectedTo: [],
        id: "14555d24-e900-4d5d-8fd7-5ea308785a91",
        previousConnections: ['13355d24-e983-4d5d-8fd7-5ea308785a99'],
        renderType: "default",
        warning: ""
    }
  ]
}
```

- `title` and `description` are to indicate for the whole form

- `startingGroupId` is the `id` of the first section which needs to be rendered.

- `schema` contains all the `Sections` and `Section` contains all the `formElements`

So first the `startingGroupId` gets rendered then after the first section is filled the `groupsConnectedTo` is used to render the next section.

:::info
If `groupsConnectedTo` is an empty array that means the form should get submitted at that state.

Also if none of the condition satisfy for the `groupsConnectedTo` sections then also it means that the form is in a state to submitted.
:::

:::info
All the `CRUD` operations on this structure is done by `GraphStructureService` present in **`/src/services/graph.structurer.service.js`**
