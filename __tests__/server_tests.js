const request = require('supertest')
const server = require('../api/server.js')

describe("server endpoint GET /", () => {
    it('should return an h1 with "Authentication Sprint Challenge"', async () => {
        const response = await request(server).get('/')
        expect(response.text).toBe("<h1>Authentication Sprint Challenge</h1>")
    })
})