const request = require('supertest');
const app = require('../../src/app');

module.exports = {
    async getSession(ongId) {
        return await request(app)
            .post('/sessions')
            .send({
                id: ongId
            })
            .set('Accept', 'application/json');
    }
}