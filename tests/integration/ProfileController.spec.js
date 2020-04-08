const connection = require('../../src/database/connection');
const {createOng} = require('../util/OngRequestUtil');
const {createIncident} = require('../util/IncidentRequestUtil');
const ProfileRequestUtil = require('../util/ProfileRequestUtil');

describe('Profile', () => {

    let ongId = '';

    beforeAll(async () => {
        await connection.migrate.latest();
        ongId = (await createOng()).body.id;
        await createIncident(ongId);
    });
    
    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('should be able to read a Incidents list the profile ',
        async () => {
            const response = await ProfileRequestUtil.getProfile(ongId);
            expect(response.body).toHaveLength(1);
        });
});