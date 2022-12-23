import routes from "../routes";
import supertest from "supertest";

const request = supertest(routes);

describe('Tests for api endpoint responses', () => {
    it('it gets the api endpoint', async () => {
        const response = await request.get('/api');
        console.log(response)
        await expect(response.status).toBe(200);
    });
});