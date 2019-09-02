const Auth = require('../auth/auth-model.js')
const db = require('../database/dbConfig.js')

describe('auth functions', () => {

    describe('addUser', () => {

        beforeEach(async () => {
            await db('users').truncate()
        })

        it('should add a user', async () => {
            await Auth.addUser({username: "Kenichiwa", password: "hashme"})

            const users = await db('users')
            expect(users).toHaveLength(1)
        })

    })

    describe('findUserBy', () => {

        beforeEach(async () => {
            await db('users').truncate()
        })

        it('should return 1 user', async () => {
            await db('users').insert({username: "Kenichiwa", password: "hasmhme"})
            const {username, password} = {username: "Kenichiwa", password: "hasmhme"}
            const user = await Auth.findUserBy({username})
            expect(user).toHaveLength(1)
        })
    })

})