const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db('veterinarians');
  });
  afterAll(async () => {
    await connection.close();
  });

  it(
    'should insert a new user into the users collection',
    async () => {
      const users = db.collection('veterinarians');

      const mockUser = {
        id: 'some-user-id',
        name: 'some-user-id',
        specialization: 'doctor',
        contactInformation: 'emilyButton@gmail.com',
        availability: 'someday'
      };

      await users.insertOne(mockUser);

      const insertedUser = await users.findOne({ id: 'some-user-id' });

      expect(insertedUser).toEqual(mockUser);
    },

    it('should delete a user from the users collection', async () => {
      const users = db.collection('veterinarians');
      await users.deleteMany({ id: 'some-user-id' });
      const deletedUser = await users.findOne({ id: 'some-user-id' });
      expect(deletedUser).toEqual(null);
    })
  );
});
