---
sidebar_position: 3
---

# Sections

This is a developer implementation of `Section`

## Section Structure

This is a sample structure of a `Section`

```js
// | Section 1 -> Section 2 -> Section 3 |

{
    title: "Section 2",
    description: "This is a section which is connected to Section 1 and Section 2.",
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
        {id: '13355d24-e983-4d5d-8fd7-5ea308785a99', renderType: 'default'}
    ],
    id: "13355d24-e983-4d5d-8fd7-5ea308785a99",
    previousConnections: ['e705c2a6-b3b3-41e6-aea0-5140a714f2cb'],
    renderType: "default",
    warning: ""
}
```

This is schema of Section 2 where `Section 1 -> Section 2 -> Section 3`

- `title` is the title of the section

- `description` is the description of the section

- `id` is the id of the section

- `groupsConnectedTo` can be read as the `sections` connected to the section. So here the `id` refers to the `id` of `Section 3`

- `previousConnections` refers to the sections where this section is connected to. So here the `id` refers to the `id` of `Section 1`

- `warning` is key which depicts if any warnings need to be shown to the user on frontend

`condition` and `formElements` we have discussed in the previous sections.

:::info
Use of `renderType` is kept for future use and is undecided now.
:::
