const Auth = require('../auth/auth-model.js')
const db = require('../database/dbConfig.js')
const request = require('supertest')
const server = require('../api/server.js')

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

describe('auth endpoints', () => {

    describe('POST /api/auth/register', () => {

        beforeEach(async () => {
            await db('users').truncate()
            await request(server).post('/api/auth/register').send({username: "Kenichiwa", password: "hasmhme"})
        })

        it('should add user to db', async () => {
            const users = await db('users')
            expect(users).toHaveLength(1)
        })

        it('should hash password', async () => {
            const user = await db('users').first()
            expect(user.password).not.toBe("hashme")
        })
    })

    describe('POST /api/auth/login', () => {

        beforeEach(async () => {
            await db('users').truncate()
        })

        it('should return a "Invalid Credentials" message if credentials are invalid', async () => {
            const user = {username: "BogusUser", password: "hasmhme"}
            const response = await request(server).post('/api/auth/login').send(user)
            expect(response.text).toBe("{\"message\":\"Invalid Credentials\"}")
        })

        it('should return token on successful login', async () => {
            const user = {username: "Kenichiwa", password: "hasmhme"}
            const {token} = await request(server).post('/api/auth/login').send(user)
            expect(token).not.toBeNull()
        })

    })
})