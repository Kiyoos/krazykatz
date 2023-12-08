const { expect } = require('@jest/globals');
const index = require('../routes/appointments');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

describe('Test Handlers', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db('appointments');
  });
  afterAll(async () => {
    await connection.close();
  });

  it('responds to /', async () => {
    const res = await request(app).get('/'); // Can't get past the requiresAuth() validation
    // console.log(res);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
