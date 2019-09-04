const db = require('../database/dbConfig.js')
const request = require('supertest')
const server = require('../api/server.js')

describe('jokes endpoints', () => {

    describe('GET /api/jokes', () => {

        it('should return an array with length > 0', async () => {
            const response = await request(server).get('/api/jokes').auth("Kenichiwa", "password")
            expect(response).toBeGreaterThan(0)
        })
    })
})