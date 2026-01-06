# DefaultApi

All URIs are relative to *https://supabase.wantrip.local*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**bookingsPost**](DefaultApi.md#bookingspost) | **POST** /bookings | 建立訂房 |
| [**citiesGet**](DefaultApi.md#citiesget) | **GET** /cities | 取得城市列表 |
| [**districtsGet**](DefaultApi.md#districtsget) | **GET** /districts | 依城市取得行政區 |
| [**hotelsGet**](DefaultApi.md#hotelsget) | **GET** /hotels | 搜尋飯店（含圖片） |
| [**hotelsHotelIdRoomsGet**](DefaultApi.md#hotelshotelidroomsget) | **GET** /hotels/{hotel_id}/rooms | 取得飯店房型與庫存 |
| [**paymentsEcpayPost**](DefaultApi.md#paymentsecpaypostoperation) | **POST** /payments/ecpay | 由 booking 建立付款單 |



## bookingsPost

> bookingsPost(booking)

建立訂房

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { BookingsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // Booking (optional)
    booking: ...,
  } satisfies BookingsPostRequest;

  try {
    const data = await api.bookingsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **booking** | [Booking](Booking.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | created |  -  |
| **400** | 請求資料錯誤 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## citiesGet

> Array&lt;City&gt; citiesGet()

取得城市列表

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { CitiesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.citiesGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;City&gt;**](City.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## districtsGet

> Array&lt;District&gt; districtsGet(cityId)

依城市取得行政區

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { DistrictsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // string (optional)
    cityId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DistrictsGetRequest;

  try {
    const data = await api.districtsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cityId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;District&gt;**](District.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | district list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## hotelsGet

> Array&lt;Hotel&gt; hotelsGet(cityId, starRating)

搜尋飯店（含圖片）

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { HotelsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // string (optional)
    cityId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number (optional)
    starRating: 56,
  } satisfies HotelsGetRequest;

  try {
    const data = await api.hotelsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cityId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **starRating** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Hotel&gt;**](Hotel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | hotel list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## hotelsHotelIdRoomsGet

> Array&lt;Room&gt; hotelsHotelIdRoomsGet(hotelId)

取得飯店房型與庫存

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { HotelsHotelIdRoomsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // string
    hotelId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies HotelsHotelIdRoomsGetRequest;

  try {
    const data = await api.hotelsHotelIdRoomsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **hotelId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;Room&gt;**](Room.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | rooms |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## paymentsEcpayPost

> paymentsEcpayPost(paymentsEcpayPostRequest)

由 booking 建立付款單

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { PaymentsEcpayPostOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // PaymentsEcpayPostRequest (optional)
    paymentsEcpayPostRequest: ...,
  } satisfies PaymentsEcpayPostOperationRequest;

  try {
    const data = await api.paymentsEcpayPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **paymentsEcpayPostRequest** | [PaymentsEcpayPostRequest](PaymentsEcpayPostRequest.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | ecpay data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

