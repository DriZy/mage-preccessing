import app from "../main";
import supertest from "supertest";

const request = supertest(app);

describe('Tests for api endpoint responses', () => {
    it('it should be truthy if endpoint exist', (done: DoneFn) => {
        (async function() {
            const response = await request.get('/api');
            await expect(response.status).toBe(200);
            done();
        }());
    });

});