
# RoomInventory


## Properties

Name | Type
------------ | -------------
`id` | string
`roomId` | string
`date` | Date
`totalQuantity` | number
`availableQuantity` | number
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { RoomInventory } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "roomId": null,
  "date": null,
  "totalQuantity": null,
  "availableQuantity": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies RoomInventory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoomInventory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


