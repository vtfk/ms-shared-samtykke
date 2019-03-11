// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const whitelist = ['/', '/favicon.ico']
const auth = require('./lib/token-auth')(whitelist)

// Handlers
const handlers = require('./lib/handlers')
const handleSamtykker = require('./lib/handle-samtykker')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// AUTH
router.use(auth)

// ROUTES
router.get('/', handlers.frontpage)
router.put('/samtykker', handleSamtykker.addSamtykke)
router.get('/samtykker/:id', handleSamtykker.getSamtykke)
router.post('/samtykker/:id', handleSamtykker.updateSamtykke)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
