const connection = require('../../src/database/connection');
const {createOng} = require('../util/OngRequestUtil');
const IncidentRequestUtil = require('../util/IncidentRequestUtil');

describe('Incident', () => {

    let ongId = '';

    beforeAll(async () => {
        await connection.migrate.latest();
        ongId = (await createOng()).body.id;
    });
    
    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('should be able to create a new Incident',
        async () => {
            const response = await IncidentRequestUtil.createIncident(ongId);
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toBe(1);
        }

    );

    it('should be able to read a Incident list ',
        async () => {
            const response = await IncidentRequestUtil.getIncidentList(1)
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
        }
    );

    it('should be able to block an invalid Incident read request',
        async () => {
            const invalidPage = 'invalidPage';
            const response = await IncidentRequestUtil.getIncidentList(invalidPage);
            expect(response.status).toBe(400);
        }
    );

    it('should be able to block delete an invalid character id Incident',
        async () => {
            const invalidId = 'abc';
            const response = await IncidentRequestUtil.deleteIncident(invalidId,ongId);
            expect(response.status).toBe(400);
        }
    );

    it('should be able to delete an absent id Incident',
        async () => {
            const absentId = 2
            const response = await IncidentRequestUtil.deleteIncident(absentId,ongId);
            expect(response.status).toBe(404);
        }
    );

    it('should be able to delete a id Incident',
        async () => {
            const id = 1;
            const response = await IncidentRequestUtil.deleteIncident(id,ongId);

            expect(response.status).toBe(204);
        }
    );
});