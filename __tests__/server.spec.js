require('dotenv').config();
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 8080;

describe('Test Server Connection by inserting and deleting in users collection', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI);
    db = await connection.db('KrazyKatz');
  });

  afterAll(async () => {
    await connection.close(true);
  });

  it('should insert a user into users collection', async () => {
    const users = db.collection('users');

    const mockUser = {
      id: 'some-user-id',
      username: 'John'
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });

  it('should delete a user from the users collection', async () => {
    const users = db.collection('users');
    await users.deleteMany({ id: 'some-user-id' });
    const deletedUser = await users.findOne({ id: 'some-user-id' });
    expect(deletedUser).toEqual(null);
  });
});
