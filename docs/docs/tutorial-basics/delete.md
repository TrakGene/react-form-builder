---
sidebar_position: 6
---

# Delete Question / Section

Here will discuss about deleting a question/section

## Deleting a Question

There will be a delete button beside every question. Just click it to delete the question

### Effect on Condition

All the sections which are linked to that question will be unlinked and the conditions associated with those section(s) will be removed.

## Deleting a Section

There will be a delete button beside every section title. Just click it to delete the section

### Effect on Condition

All the sections which are linked to that sections will be linked to the parent section(s) of the deleted section and the condition associated with those section(s) will be removed.

:::info

Suppose `SECTION A` -> `SECTION B` -> `SECTION C and SECTION D`

Now we delete `SECTION B`

Now the structure becomes `SECTION A` -> `SECTION C and SECTION D`

But all the conditions associated with `SECTION C and SECTION D` are removed. So you have to add the condition to these sections and the link gets recreated. You can do so by clicking on the `Edit` Button (Pen Icon) beside the section title.
:::
