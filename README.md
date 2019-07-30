[![Build Status](https://travis-ci.com/vtfk/ms-shared-samtykke.svg?branch=master)](https://travis-ci.com/vtfk/ms-shared-samtykke)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# ms-shared-samtykke

Microservice for samtykker.

## API

All requests requirer valid bearer token from Azure.

### ```GET /```

Retrieves all samtykker for authenticated user.

```
$ curl http://localhost:3000
```

Returns

```JavaScript
[
  {
    "_id": "5c878e06699e811170a22c90",
    "userId": "gasg",
    "agreement": {
      "id": "images",
      "name": "Samtykke for bruk av bilder",
      "description": "samtykke for bruk av bilde og video",
      "url": ""
    },
    "state": true,
    "lastUpdated": 1556300534997,
    "history": [
      {
        "state": true,
        "timeStamp": 1552387589708
      },
      {
        "state": false,
        "timeStamp": 1552387597825
      }
    ]
  }
]
```

### ```PUT /```

Adds new samtykke for authenticated user

```
$ curl -X PUT http://localhost:3000 -d '{ "state": true }'
```

Returns

```JavaScript
{
  "_t": "InsertResponse",
  "ok": 1,
  "n": 1
}
```

### ```GET /:id```

Retrieves a given samtykke for authenticated user.

```
$ curl http://localhost:3000/5c878e06699e811170a22c90
```

```JavaScript
[
  {
    "_id": "5c878e06699e811170a22c90",
    "userId": "gasg",
    "agreement": {
      "id": "images",
      "name": "Samtykke for bruk av bilder",
      "description": "samtykke for bruk av bilde og video",
      "url": ""
    },
    "state": true,
    "lastUpdated": 1556300534997,
    "history": [
      {
        "state": true,
        "timeStamp": 1552387589708
      },
      {
        "state": false,
        "timeStamp": 1552387597825
      }
    ]
  }
]
```

### ```POST /:id```

Updates state for a given samtykke for authenticated user

```
$ curl http://localhost:3000/5c878e06699e811170a22c90 -d '{ "state": false }'
```

Returns

```JavaScript
{ 
  "_t": "UpdateResponse",
  "ok": 1,
  "n": 1,
  "nModified": 1
}
```

### ```POST /samtykker```

Retrieve samtykker for given userIds

```JavaScript
{
  userIds: ['maccyber', 'Sherex', 'zrrrzzt']
}
```

### ```GET /stats/total```

Returns the total amount of samtykker

```
$ curl http://localhost:3000/stats/total
```

```JavaScript
{
  total: 5494
}
```

### ```GET /stats/signed```

Returns the total amount of signed samtykker

```
$ curl http://localhost:3000/stats/signed
```

```JavaScript
{
  total: 2008
}
```

### ```GET /stats/declined```

Returns the total amount of declined samtykker

```
$ curl http://localhost:3000/stats/declined
```

```JavaScript
{
  total: 3486
}
```

## Development

Add a local `.env` file

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

Start the development environment

```
$ now dev
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