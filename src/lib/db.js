// lib/db.js
import mongoose from 'mongoose';

//const MONGO_URI = process.env.MONGODB_URI;

const MONGO_URI = "mongodb+srv://syamsribalaji:z0GY6jyLYfJ4PoqT@temptest.e3fagdt.mongodb.net/crud";
//mongodb+srv://syamsribalaji:z0GY6jyLYfJ4PoqT@temptest.e3fagdt.mongodb.net/crud

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  if (!MONGO_URI) throw new Error('MONGODB_URI not set in environment');

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'crud',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}
