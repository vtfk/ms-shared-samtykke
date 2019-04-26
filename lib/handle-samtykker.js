const { json, send } = require('micro')
const { ObjectId } = require('mongodb')
const mongo = require('./mongo')
const getUserName = require('./get-user-name')
const buildSamtykke = require('./build-samtykke')
const logger = require('./logger')

module.exports.addSamtykke = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  const { upn } = request.token
  const userId = getUserName(upn)
  const data = buildSamtykke(userId)
  samtykker.insertOne(data, (error, result) => {
    if (error) {
      logger('error', ['handle-samtykker', 'addSamtykke', 'userId', userId, error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'addSamtykke', 'userId', userId, 'success'])
      send(response, 200, result)
    }
  })
}

module.exports.getSamtykke = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  const { id } = request.params
  const samtykkeId = ObjectId(id)
  const { upn } = request.token
  const userId = getUserName(upn)
  logger('info', ['handle-samtykker', 'getSamtykke', 'id', id, 'userId', userId])
  samtykker.find({ _id: samtykkeId, userId: userId }).toArray((error, documents) => {
    if (error) {
      logger('error', ['handle-samtykker', 'getSamtykke', 'id', id, 'userId', userId, error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'getSamtykke', 'id', id, 'userId', userId, 'documents', documents.length, 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.getSamtykker = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  const { upn } = request.token
  const userId = getUserName(upn)
  logger('info', ['handle-samtykker', 'getSamtykker', 'userId', userId])
  samtykker.find({ userId: userId }).toArray((error, documents) => {
    if (error) {
      logger('error', ['handle-samtykker', 'getSamtykker', 'userId', userId, error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'getSamtykker', 'userId', userId, 'documents', documents.length, 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.getSamtykkerForUserIds = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  const data = await json(request)
  logger('info', ['handle-samtykker', 'getSamtykkerForUserIds', 'start'])
  samtykker.find({ 'userId': { '$in': data.userIds } }).toArray((error, documents) => {
    if (error) {
      logger('error', ['handle-samtykker', 'getSamtykkerForUserIds', error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'getSamtykkerForUserIds', 'documents', documents.length, 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.updateSamtykke = async (request, response) => {
  const db = await mongo()
  const samtykker = db.collection(process.env.MONGODB_COLLECTION)
  const { id } = request.params
  const samtykkeId = ObjectId(id)
  const data = await json(request)
  const now = new Date().getTime()
  const { upn } = request.token
  const userId = getUserName(upn)
  const history = {
    state: data.state,
    timeStamp: now
  }
  const update = {
    state: data.state,
    lastUpdated: now
  }
  logger('info', ['handle-samtykker', 'updateSamtykke', 'id', id])
  samtykker.updateOne({ '_id': samtykkeId, userId: userId }, { '$set': update, '$push': { history: history } }, (error, data) => {
    if (error) {
      logger('error', ['handle-samtykker', 'updateSamtykke', 'id', id, 'userId', userId, error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-samtykker', 'updateSamtykke', 'success', 'id', id, 'userId', userId])
      send(response, 200, data)
    }
  })
}
