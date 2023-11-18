// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Function that handles a GET request.
const getAllPets = async (req, res) => {
  try {
    // add the database
    const result = await mongodb.getDb().db().collection('pets').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Gets a single pet
const getSinglePet = async (req, res) => {
  try {
    // add the database
    const petId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('pets')
      .find({ _id: petId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Create a POST const
const createPet = async (req, res) => {
  try {
    // Check if user is authenticated (To be used with OAuth)
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule an pet.');
    // }
    // add the database
    const pet = req.body;
    const response = await mongodb
      .getDb()
      .db()
      .collection('pets')
      .insertOne({ pet });

    if (response.acknowledged) {
      const newpetId = response.insertedId;
      res
        .status(201)
        .json({ message: 'Pet created successfully', petId: newpetId });
    } else {
      errorResponse(res, 500, 'Failed to create pet');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a PUT request to update a pet.
const updatePet = async (req, res) => {
  try {
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule a pet.');
    // }
    const petId = new ObjectId(req.params.id);
    const updatedpet = req.body;
    // add the database
    const response = await mongodb
      .getDb()
      .db()
      .collection('pets')
      .updateOne({ _id: petId }, { $set: { pet: updatedpet } });

    if (response.matchedCount === 1 && response.modifiedCount === 1) {
      res.status(204).json({ message: 'Pet updated successfully' });
    } else {
      errorResponse(res, 404, 'Pet not found or not updated');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a DELETE request.
const deletePet = async (req, res) => {
  try {
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to delete an pet.');
    // }
    // add the database
    const petId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('pets')
      .deleteOne({ _id: petId });

    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Pet deleted successfully' });
    } else {
      errorResponse(res, 404, 'Pet not found');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet
};
