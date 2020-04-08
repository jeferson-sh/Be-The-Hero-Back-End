const request = require('supertest');
const app = require('../../src/app');

module.exports = {
    async createOng() {
        return await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@apad.com.br",
                whatsapp: "5583123456789",
                city: "Porto Velho",
                uf: "RS"
            })
            .set('Accept', 'application/json');
    },
    async getOngList() {
        return await request(app)
            .get('/ongs')
            .set('Accept', 'application/json');

    }
}