# API Reference

## Authentication

All API requests must include a valid authentication token in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Get User Profile

```
GET /api/user/profile
```

Returns the current user's profile information.

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "tier": "PRO",
  "subscriptionStatus": "active"
}
```

### Get Usage Statistics

```
GET /api/user/usage
```

Returns usage statistics for the current user.

**Response:**
```json
{
  "requests": 1234,
  "limit": 10000,
  "period": "monthly"
}
```

## Rate Limits

Rate limits vary by subscription tier:

- **Free**: 100 requests/day
- **Lite**: 1,000 requests/day
- **Pro**: 10,000 requests/day
- **Advanced**: Unlimited

## Error Codes

- `401`: Unauthorized - Invalid or missing authentication
- `403`: Forbidden - Insufficient permissions or subscription tier
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Something went wrong on our end
