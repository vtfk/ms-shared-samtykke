const { json, send } = require('micro')
const mongojs = require('mongojs')
const logger = require('./logger')

module.exports.addSamtykke = async (request, response) => {
  const db = mongojs(process.env.MONGODB_CONNECTION)
  const samtykker = db.collection(process.env.MONGODB_CONNECTION)
  const data = await json(request)
  samtykker.save(data, (error, result) => {
    db.close()
    if (error) {
      logger('error', ['handle-samtykker', 'addSamtykke', error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'addSamtykke', 'success'])
      send(response, 200, result)
    }
  })
}

module.exports.getSamtykke = async (request, response) => {
  const db = mongojs(process.env.MONGODB_CONNECTION)
  const samtykker = db.collection(process.env.MONGODB_CONNECTION)
  const { id } = request.params
  const samtykkeId = mongojs.ObjectId(id)
  logger('info', ['handle-samtykker', 'getSamtykke', 'id', id])
  samtykker.find({ _id: samtykkeId }, (error, documents) => {
    db.close()
    if (error) {
      logger('error', ['handle-samtykker', 'getSamtykke', 'id', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'getSamtykke', 'id', id, 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.updateSamtykke = async (request, response) => {
  const db = mongojs(process.env.MONGODB_CONNECTION)
  const samtykker = db.collection(process.env.MONGODB_CONNECTION)
  const { id } = request.params
  const samtykkeId = mongojs.ObjectId(id)
  const data = await json(request)
  const now = new Date().getTime()
  const history = {
    state: data.state,
    timeStamp: now
  }
  const update = {
    state: data.state,
    lastUpdated: now
  }
  logger('info', ['handle-samtykker', 'updateSamtykke', 'id', id])
  samtykker.update({ '_id': samtykkeId }, { '$set': update, '$push': { history: history } }, (error, data) => {
    db.close()
    if (error) {
      logger('error', ['handle-samtykker', 'updateSamtykke', 'id', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'updateSamtykke', 'success', 'id', id])
      send(response, 200, data)
    }
  })
}
