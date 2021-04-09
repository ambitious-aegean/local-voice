import regeneratorRuntime from 'regenerator-runtime';

const supertest = require('supertest');

const expServer = require('./server.js');

test('GET /test', () => {
  supertest(expServer.app)
    .get('/test')
    .expect(200)
    .then((response) => {
      expect(response.text).toBe('test');
    });
  expServer.server.close();
});
