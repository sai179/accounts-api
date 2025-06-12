# Accounts API - Test cURL Requests

## Get all accounts
```bash
curl -X GET http://localhost:3000/accounts
```

## Get a specific account by accountId
```bash
curl -X GET http://localhost:3000/accounts/8053435318
```

## Create a new account (fields auto-generated: accountId, fromDate, toDate)
```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "address": "100 Test Blvd",
    "city": "Testville",
    "state": "NY",
    "zipCode": "10001",
    "accountType": "savings"
  }'
```

### Example response for POST /accounts
```json
{
  "accountId": "1234567890",
  "fromDate": "2024-06-01",
  "toDate": "2024-12-31",
  "firstName": "Test",
  "lastName": "User",
  "address": "100 Test Blvd",
  "city": "Testville",
  "state": "NY",
  "zipCode": "10001",
  "accountType": "savings"
}
```

## Example: Get another account by accountId
```bash
curl -X GET http://localhost:3000/accounts/5816150875
``` 