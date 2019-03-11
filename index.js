// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handlers = require('./lib/handlers')
const handleSamtykker = require('./lib/handle-samtykker')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
if (process.env.JWT_SECRET) {
  router.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/'] }))
  router.use(handleUnauthorized)
}

// ROUTES
router.get('/', handlers.frontpage)
router.put('/samtykker', handleSamtykker.addSamtykke)
router.get('/samtykker/:id', handleSamtykker.getSamtykke)
router.post('/samtykker/:id', handleSamtykker.updateSamtykke)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
