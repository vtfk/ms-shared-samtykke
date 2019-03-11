# ms-shared-samtykke

Microservice for samtykke

## API

All requests requirer valid bearer token

### ```GET /```

Retrieves all samtykker for authenticated user

### ```PUT /```

Adds new samtykke

### ```GET /:id```

Retrieves a given samtykke for authenticated user

### ```POST /:id```

Updates state for a given samtykke for authenticated user

## Deployment

Environment

```
MONGODB_CONNECTION=your-mongodb-connection-string
MONGODB_COLLECTION=samtykker
MOA_TENANT_ID=your-azure-tennant
```

## License

[MIT](LICENSE)