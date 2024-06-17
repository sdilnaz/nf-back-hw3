import { Router } from 'express';
import { fetchLatestPublications } from './parser';

const router = Router();

router.get('/parse', async (req, res) => {
  try {
    const data = await fetchLatestPublications();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
