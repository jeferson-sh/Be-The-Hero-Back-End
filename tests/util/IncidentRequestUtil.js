const request = require('supertest');
const app = require('../../src/app');

module.exports = {
    async createIncident(ongId) {
        return await request(app)
            .post('/incidents')
            .set({
                authorization: ongId
            })
            .send({
                title: "Case title",
                description: "Case description ",
                value: 130
            });
    },

    async getIncidentList(pageNumber) {
        return await request(app)
            .get('/incidents')
            .query({
                page: pageNumber
            })
            .set('Accept', 'application/json');
    },

    async deleteIncident(IncidentId, ongId) {
        return await request(app)
            .delete(`/incidents/${IncidentId}`)
            .set({
                authorization: ongId
            })
            .set('Accept', 'application/json')
    }
}