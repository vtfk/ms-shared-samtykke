// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const whitelist = ['/docs', '/favicon.ico']
const machinelist = ['/samtykker']
const auth = require('./lib/token-auth')(whitelist, machinelist)

// Handlers
const handleSamtykker = require('./lib/handle-samtykker')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// AUTH
router.use(auth)

// ROUTES
router.get('/', handleSamtykker.getSamtykker)
router.put('/', handleSamtykker.addSamtykke)
router.post('/samtykker', handleSamtykker.getSamtykkerForUserIds)
router.get('/:id', handleSamtykker.getSamtykke)
router.post('/:id', handleSamtykker.updateSamtykke)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
