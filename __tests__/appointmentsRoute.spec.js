// Nina is still working on this one.

// const app = require('../server');
// const supertest = require('supertest');
const { expect } = require('@jest/globals');
// const request = supertest(app);

// describe('Test Handlers', () => {
//   it('responds to /', async () => {
//     const res = await request.get('/appointments');
//     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//     expect(res.statusCode).toBe(200);
//   });
// });

const index = require('../routes/appointments');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

describe('Test Handlers', () => {
  it('responds to /appointments', async () => {
    const res = await request(app).get('/appointments');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.header['title']).toBe('text/html; Log in | Krazy Katz');
    expect(res.statusCode).toBe(200);
  });
});
