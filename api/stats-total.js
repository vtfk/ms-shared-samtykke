const mongo = require('../lib/mongo')
const logger = require('../lib/logger')

module.exports = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['api', 'stats', 'total', 'start'])
  const count = await samtykker.countDocuments({})
  logger('info', ['api', 'stats', 'total', count, 'success'])
  response.json({ total: count })
}
