
import regeneratorRuntime from 'regenerator-runtime';

const supertest = require('supertest');

const expServer = require('../server');

test('PUT /allIssues/up_vote', () => {
  supertest(expServer.app)
    .put('/allIssues/up_vote')
    .expect(200)
  expServer.server.close();
});

test('PUT /allIssues/down_vote', () => {
  supertest(expServer.app)
    .put('/allIssues/down_vote')
    .expect(204)
  expServer.server.close();
})

// test('GET /products/styles', () => {
//   supertest(expServer.app)
//     .get('/styles')
//     .expect(200)
//     .then((res) => {
//       expect(typeof res.data).toBe('object');
//       expect(typeof res.data.results[0]).toBe('object');
//     });
//   expServer.server.close();
// });