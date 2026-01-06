
# Booking


## Properties

Name | Type
------------ | -------------
`id` | string
`profileId` | string
`hotelId` | string
`roomId` | string
`checkInDate` | Date
`checkOutDate` | Date
`nights` | number
`guestCount` | number
`totalPrice` | number
`status` | string
`createdAt` | Date
`hotel` | [Hotel](Hotel.md)
`room` | [Room](Room.md)
`reviews` | [Array&lt;Review&gt;](Review.md)

## Example

```typescript
import type { Booking } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "profileId": null,
  "hotelId": null,
  "roomId": null,
  "checkInDate": null,
  "checkOutDate": null,
  "nights": null,
  "guestCount": null,
  "totalPrice": null,
  "status": null,
  "createdAt": null,
  "hotel": null,
  "room": null,
  "reviews": null,
} satisfies Booking

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Booking
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


