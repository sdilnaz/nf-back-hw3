import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import { fetchLatestPublications } from './parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://dilnazsembekova:dilnaz13@news.0jzlsks.mongodb.net/';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    // Schedule a job to run every hour
    cron.schedule('0 * * * *', async () => {
      try {
        console.log('Running fetchLatestPublications at', new Date().toISOString());
        const publications = await fetchLatestPublications();
        console.log('Fetched Publications:', publications);
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    });

    console.log('Cron job scheduled to run every hour.');
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
