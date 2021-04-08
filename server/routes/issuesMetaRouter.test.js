import regeneratorRuntime from 'regenerator-runtime';

const supertest = require('supertest');

const expServer = require('../server');

test('PUT /allIssues/up_vote', () => {
  supertest(expServer.app)
    .put('/allIssues/up_vote')
    .expect(200);
  expServer.server.close();
});

test('PUT /allIssues/down_vote', () => {
  supertest(expServer.app)
    .put('/allIssues/down_vote')
    .expect(204);
  expServer.server.close();
});

test('PUT /allIssues/flag', () => {
  supertest(expServer.app)
    .put('/allIssues/flag')
    .expect(200);
  expServer.server.close();
});
