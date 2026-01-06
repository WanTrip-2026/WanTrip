
# Review


## Properties

Name | Type
------------ | -------------
`id` | string
`hotelId` | string
`roomType` | string
`memberName` | string
`memberType` | string
`rating` | number
`title` | string
`comment` | string
`stayDate` | Date

## Example

```typescript
import type { Review } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "hotelId": null,
  "roomType": null,
  "memberName": null,
  "memberType": null,
  "rating": null,
  "title": null,
  "comment": null,
  "stayDate": null,
} satisfies Review

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Review
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


