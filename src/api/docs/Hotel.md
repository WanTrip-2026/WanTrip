
# Hotel


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`city` | string
`district` | string
`address` | string
`starRating` | number
`minPrice` | number
`phone` | string
`description` | string
`isFeatured` | boolean
`featuredOrder` | number
`latitude` | number
`longitude` | number
`createdAt` | Date
`updatedAt` | Date
`images` | [Array&lt;HotelImage&gt;](HotelImage.md)
`facilities` | Array&lt;string&gt;

## Example

```typescript
import type { Hotel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "city": null,
  "district": null,
  "address": null,
  "starRating": null,
  "minPrice": null,
  "phone": null,
  "description": null,
  "isFeatured": null,
  "featuredOrder": null,
  "latitude": null,
  "longitude": null,
  "createdAt": null,
  "updatedAt": null,
  "images": null,
  "facilities": null,
} satisfies Hotel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Hotel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


