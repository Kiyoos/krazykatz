const index = require('../routes/index');
const request = require('supertest');
const express = require('express');
const app = express();

describe('Test routes in index', () => {
  app.use(express.urlencoded({ extended: false }));
  app.use('/', index);

  test('index route works', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect((res) => {
        // Check the response body
        const body = res.body;
        expect(body).toHaveProperty('name', 'frodo');
      })
      .expect(200, done);
  });


});
