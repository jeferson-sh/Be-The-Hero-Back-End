const request = require('supertest');
const app = require('../../src/app');

module.exports = {
    async getProfile(ongId) {
        return await request(app)
            .get('/profile')
            .set({
                authorization: ongId
            })
            .set('Accept', 'application/json');
    }
}