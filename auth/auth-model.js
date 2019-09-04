const db = require('../database/dbConfig.js')

module.exports = {
    addUser,
    findUserBy
}

function addUser(user) {
    return db('users').insert(user) 
}

function findUserBy(filter) {
    return db('users').where(filter)
}