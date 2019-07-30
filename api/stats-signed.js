const mongo = require('../lib/mongo')
const logger = require('../lib/logger')

module.exports = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['api', 'stats', 'signed', 'start'])
  const count = await samtykker.countDocuments({ state: true })
  logger('info', ['api', 'stats', 'signed', count, 'success'])
  response.json({ total: count })
}
