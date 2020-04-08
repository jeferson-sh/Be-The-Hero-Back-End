const connection = require('../../src/database/connection');
const {createOng} = require('../util/OngRequestUtil');
const SessionRequest = require('../util/SessionRequestUtil');

describe('Session', () => {

    let ongId = '';

    beforeAll(async () => {
        await connection.migrate.latest();
        ongId = (await createOng()).body.id;
    });

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('should be able to create a new Session',
        async () => {
            const response = await SessionRequest.getSession(ongId);
            expect(response.body).toHaveProperty('name');            
        }
    );
});