// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')
const whitelist = ['/docs', '/favicon.ico', '/samtykker']
const auth = require('./lib/token-auth')(whitelist)

// Handlers
const handlers = require('./lib/handlers')
const handleSamtykker = require('./lib/handle-samtykker')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// AUTH
router.use(auth)

// JWT
if (process.env.JWT_SECRET) {
  router.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: '/samtykker$' }))
  router.use(handleUnauthorized)
}

// ROUTES
router.get('/docs', handlers.frontpage)
router.get('/', handleSamtykker.getSamtykker)
router.get('/favicon.ico', handlers.favicon)
router.put('/', handleSamtykker.addSamtykke)
router.post('/samtykker', handleSamtykker.getSamtykkerForUserIds)
router.get('/:id', handleSamtykker.getSamtykke)
router.post('/:id', handleSamtykker.updateSamtykke)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
