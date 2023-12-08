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
    db = await connection.db('pets');
  });
  afterAll(async () => {
    await connection.close();
  });

  it(
    'should insert a new user into the pets collection',
    async () => {
      const users = db.collection('pets');

      const mockUser = {
        id: 'some-user-id',
        owner: 'someone in the earth',
        name: 'some-user-id',
        species: 'Emily',
        breed: 'emilyButton@gmail.com',
        age: 'something',
        weight: '20',
        medicalHistory: 'something',
        vaccineType: 'some type',
        date: 'a date',
        secondDose: 'someday'
      };

      await users.insertOne(mockUser);

      const insertedUser = await users.findOne({ id: 'some-user-id' });

      expect(insertedUser).toEqual(mockUser);
    },

    it('should delete a user from the users collection', async () => {
      const users = db.collection('pets');
      await users.deleteMany({ id: 'some-user-id' });
      const deletedUser = await users.findOne({ id: 'some-user-id' });
      expect(deletedUser).toEqual(null);
    })
  );
});
