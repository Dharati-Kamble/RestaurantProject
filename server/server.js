const express = require('express');
const cors = require('cors'); // Import the cors module
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = 5001;

const URL = 'mongodb://localhost:27017';
const client = new MongoClient(URL);
let collection;

// Enable CORS for all origins or a specific domain
app.use(cors({
  origin: 'http://localhost:4200', // Angular app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB and initialize the collection
(async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('restaurant');
    collection = db.collection('marvellous');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
})();

// Fetch all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Add a restaurant
/*app.post('/restaurants', async (req, res) => {
  try {
    const newRestaurant = req.body;
    const result = await collection.insertOne(newRestaurant);
    res.status(201).json({
      message: 'Restaurant added successfully',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ error: 'Failed to add restaurant' });
  }
});*/

app.post('/addRestaurant', async (req, res) => {
    const { name, email, mobile, address, services } = req.body;
  
    const newRestaurent = new Restaurent({
      name,
      email,
      mobile,
      address,
      services
    });
  
    try {
      const savedRestaurent = await newRestaurent.save(); // MongoDB generates the ObjectId
      res.status(201).json({message: 'Restaurant added successfully',
        insertedId: result.insertedId});
    } catch (error) {
      res.status(500).json({ message: 'Failed to add restaurant', error });
    }
  });

// Update a restaurant
app.put('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid restaurant ID' });
    }
    const updatedData = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant updated successfully' });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
});

// Delete a restaurant
app.delete('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid restaurant ID' });
    }
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
