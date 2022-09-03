---
sidebar_position: 2
---

# Conditions

This is a developer implementation of condition

## Default Render

This type of structure will be there when a section is intended to be rendered without any condition.

```js
{
  condition: "None";
  type: "NONE";
}
```

The detailed description of the two parameters are given below

## Conditional Structure

We represent condition is such a way

```js
{
  condition: "Section 1 | Sample Question 1",
  formId: "296a393d-5b0a-4a96-9322-67c0e0c7182d",
  options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  value: ["Option 1"],
  sectionId: "e705c2a6-b3b3-41e6-aea0-5140a714f2cb",
  type: "CHECKBOX_INPUT",
}
```

- `condition` here is represented in this nomenclature

```
<SECTION_TITLE> | <FORM_ELEMENT_TITLE>
-----------------
FORM_ELEMENT_TITLE -> The title of formElement which is used to create the condition
SECTION_TITLE -> The title of the section under which the FORM_ELEMENT is defined
-----------------
```

- `formId` is the `id` of the form element on which the condition is linked.

- `sectionId` is the `id` of the section where the formId exists.

- `options` is the options that are there on the form element.

- `value` is the value which the user must enter in order to trigger that condition.

- `type` is the type of the form element on which the condition is implemented

:::info
`value` is not necessarily always an `Array`.
It is an array on form type `CHECKBOX_INPUT` and a `String` on other input types
:::

:::info
If there is no `value` parameter in the condition then this implies that if the user leaves the question blank then the condition will be triggered
:::

:::warning
More than one `Section` s connected to a parent `Section` cannot have same `condition` parameters

Example :

`Section 1` is connected to `Section 2` and `Section 1` is connected to `Section 3`

Then `Section 2` and `Section 3` must have differed condition parameters
:::
