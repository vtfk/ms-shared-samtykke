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

### ```POST /samtykker```

Retrieve samtykker for given userIds

```JavaScript
{
  userIds: ['maccyber', 'Sherex', 'zrrrzzt']
}
```

## Deployment

Environment

```
MONGODB_CONNECTION=your-mongodb-connection-string
MONGODB_COLLECTION=samtykker
MOA_TENANT_ID=your-azure-tennant
JWT_SECRET=jwt-secret-for-machine-to-machine
```

## License

[MIT](LICENSE)