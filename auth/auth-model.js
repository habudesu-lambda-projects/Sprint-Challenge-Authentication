const db = require('../database/dbConfig.js')

module.exports = {
    addUser
}

function addUser(user) {
    return db('users').insert(user) 
}