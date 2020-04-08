const connection = require('../../src/database/connection');
const OngRequestUtil = require('../util/OngRequestUtil');

describe('ONG', () => {

    beforeAll(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('should be able to create a new ONG',
        async () => {
            const response = await OngRequestUtil.createOng();
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
        }
    );

    it('should be able to read a ONG list ',
        async () => {
            const response = await OngRequestUtil.getOngList();
            expect(response.body).toHaveLength(1);
        }
    );
});