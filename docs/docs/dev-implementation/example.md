---
sidebar_position: 5
---

# Example

Here we will talk about an example

## What we are trying to make?

Here we will discuss a simple implementation where the user is told to specify the gender and gender specific questions are to be asked

It will look like this:

![s1](/img/example/ex1.png)

The schema of this will be looking like this:

```json
{
  "formId": "",
  "title": "Pre-clinic  form Builder Example",
  "description": "Sample Description",
  "startingGroupId": "5282c544-8189-4c80-900b-8cb2962d83a0",
  "schema": {
    "5282c544-8189-4c80-900b-8cb2962d83a0": {
      "title": "Pre-clinic  form Builder Example",
      "description": "Sample Description",
      "renderType": "default",
      "condition": {},
      "groupsConnectedTo": [
        {
          "id": "f6a1b589-4271-450a-aacf-b9edc17310d3",
          "renderType": "default"
        }
      ],
      "formElements": [
        {
          "label": "Name",
          "isRequired": true,
          "isIdentifier": false,
          "type": "SHORT_TEXT",
          "id": "142139a4-ec1e-4ba6-a17f-d0c7cd9d853c"
        },
        {
          "label": "Age",
          "isRequired": true,
          "isIdentifier": false,
          "type": "SHORT_TEXT",
          "id": "a347c3ee-fef0-4e5e-a59c-304cd0bf19cc"
        },
        {
          "label": "Gender",
          "options": ["Male", "Female", "Prefer Not to Say"],
          "isRequired": true,
          "isIdentifier": false,
          "type": "MULTIPLE_CHOICE",
          "id": "e220ce0a-5961-42a3-a0a6-4ea777684c6e"
        }
      ],
      "previousConnections": [null],
      "id": "5282c544-8189-4c80-900b-8cb2962d83a0",
      "warning": ""
    },
    "f6a1b589-4271-450a-aacf-b9edc17310d3": {
      "title": "Male Centric Questions",
      "description": "",
      "renderType": "default",
      "condition": {
        "formId": "e220ce0a-5961-42a3-a0a6-4ea777684c6e",
        "sectionId": "5282c544-8189-4c80-900b-8cb2962d83a0",
        "value": "Male",
        "condition": "Pre-clinic  form Builder Example | Gender",
        "type": "MULTIPLE_CHOICE",
        "options": ["Male", "Female", "Prefer Not to Say"]
      },
      "groupsConnectedTo": [],
      "formElements": [
        {
          "label": "Question 1 for Male",
          "isRequired": true,
          "isIdentifier": false,
          "type": "SHORT_TEXT",
          "id": "da51246e-a2a3-496c-8fe4-ac00b34f9b63"
        }
      ],
      "previousConnections": ["5282c544-8189-4c80-900b-8cb2962d83a0"],
      "id": "f6a1b589-4271-450a-aacf-b9edc17310d3",
      "warning": ""
    }
  }
}
```
