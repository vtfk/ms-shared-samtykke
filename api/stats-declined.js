const mongo = require('../lib/mongo')
const logger = require('../lib/logger')

module.exports = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['api', 'stats', 'declined', 'start'])
  const count = await samtykker.countDocuments({ state: false })
  logger('info', ['api', 'stats', 'declined', count, 'success'])
  response.json({ total: count })
}
