import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fetchLatestPublications } from './parser';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://dilnazsembekova:dilnaz13@news.0jzlsks.mongodb.net/';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    // Fetch latest publications and log the results
    fetchLatestPublications()
      .then(publications => {
        console.log('Fetched Publications:', publications);
        mongoose.disconnect(); // Close the connection after fetching
      })
      .catch(err => {
        console.error('Error fetching publications:', err);
        mongoose.disconnect(); // Close the connection in case of error
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
