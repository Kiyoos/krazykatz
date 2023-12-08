// We need to complete with what Nina have for the 
// getAllAppointments function

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
    db = await connection.db('appointments');
  });
  afterAll(async () => {
    await connection.close();
  });

  it(
    'should insert a new appointment into the appointment collection',
    async () => {
      const appointments = db.collection('appointments');

      const mockAppointment = {
        id: 'some-appointment-id',
        user: 'some-user',
        veterinarian: 'some-doctor',
        dateAndTime: 'some-day',
        purpose: 'some-purpose',
      };

      await appointments.insertOne(mockAppointment);

      const insertedAppointment = await appointments.findOne({ id: 'some-appointment-id' });

      expect(insertedAppointment).toEqual(mockAppointment);
    },

    it('should delete an appointment from the appointments collection', async () => {
      const appointments = db.collection('appointments');
      await appointments.deleteMany({ id: 'some-appointment-id' });
      const deletedAppointment = await appointments.findOne({ id: 'some-appointment-id' });
      expect(deletedAppointment).toEqual(null);
    })
  );
});
