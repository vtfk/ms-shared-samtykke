[![Build Status](https://travis-ci.com/vtfk/ms-shared-samtykke.svg?branch=master)](https://travis-ci.com/vtfk/ms-shared-samtykke)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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
MONGODB_NAME=minelev
MOA_TENANT_ID=your-azure-tennant
JWT_SECRET=jwt-secret-for-machine-to-machine
PAPERTRAIL_HOST=logs.papertrailapp.com
PAPERTRAIL_PORT=12345
PAPERTRAIL_HOSTNAME=elevpc
```

## Related

- [web-vgo-minelev-portal](https://github.com/vtfk/web-vgo-minelev-portal) Frontend for samtykker

## License

[MIT](LICENSE)