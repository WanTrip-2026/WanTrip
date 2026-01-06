
# Room


## Properties

Name | Type
------------ | -------------
`id` | string
`hotelId` | string
`roomTypeId` | string
`name` | string
`price` | number
`capacity` | number
`imageUrl` | string
`inventory` | [Array&lt;RoomInventory&gt;](RoomInventory.md)

## Example

```typescript
import type { Room } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "hotelId": null,
  "roomTypeId": null,
  "name": null,
  "price": null,
  "capacity": null,
  "imageUrl": null,
  "inventory": null,
} satisfies Room

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Room
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


