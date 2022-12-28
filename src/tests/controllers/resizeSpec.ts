import app from '../../main';
import supertest from 'supertest';
import resize from '../../controllers/resize';

const request = supertest(app);

/**
 * Unit test suit for image resizing endpoint
 * */

describe('Tests for /api/resize with query strings endpoint responses', () => {
  const filename = 'fjord.jpg';
  const width = 300;
  const height = 250;
  it('it should be truthy if /api/resize endpoint exist', (done: DoneFn) => {
    (async function () {
      const response = await request.get(
        `/api/resize?filename=${filename}&width=${width}&height=${height}`
      );
      expect(response.status).toBe(200);
      done();
    })();
  });

  it('it should return a string is query strings exist', async () => {
    const data = await resize.resizeImageWithQuery(filename, width, height);
    expect(data).toEqual({ filename: filename, width: width, height: height });
  });
});
