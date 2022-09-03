---
sidebar_position: 4
---

# Edit Questions

Here we will talk about how to edit questions

## What can you edit?

You can edit the following things in a question.

- Label of the question
- Options (if any) associated with the question
- Type of the question (eg. Change Question Type from Multiple Choice Question to Dropdown Question)
- `Is Required` parameter
- `Is Identifier` parameter

## How you can edit?

Beside every question you will find a pen icon. Just click on that and a popup will open where you can edit the details.

## Effect on the conditions

We have to now understand what should be the affect on the conditions associated with that question.

- If you change the `type` of question,

  - Change the type from a `Condition Supported` type to a `Condition Supported` type :
    The builder will give the most appropriate condition to the linked sections. **(BE SURE TO CHECK THE WARNING BELOW)**
  - Change the type from a `Condition Supported` type to a `Not Condition Supported` type: The builder will unlink all the sections attached with the question and remove all the conditions associated with the sections
  - Change the type from a `Not Condition Supported` type to a `Condition Supported / Not Condition Supported` type: This will have no effect as a `Not Condition Supported` type will not have any Sections linked with it in the previous state.

- Change the `label` / `is Required` / `is Identifier` field: There will be no change in the conditions linked with the question

- Change the `option(s)` field (if any)
  - Add option(s): The conditions linked with the question will be same as earlier.
  - Edit/Delete option(s): The sections associated with the question will be unlinked and the conditions associated with those sections will be removed.

:::info

`Condition Supported` Question Types are

- Dropdown
- Multiple Choice
- Checkbox

All the rest are `Not Condition Supported` type
:::

:::warning

If you change the type from a `Condition Supported` type to a `Condition Supported` type make sure to check the conditions of the sections associated with the question to check if they are according to your needs.

We recommend this because in this case the form builder makes the choice of choosing the most close options available.
:::
