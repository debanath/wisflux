const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const client = redis.createClient({
  url: 'redis://redis:6379'
});
client.connect();

// Get visitor count
app.get('/api/visitors', async (req, res) => {
  try {
    const count = await client.get('visitor_count') || 0;
    res.json({ count: parseInt(count) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment visitor count
app.post('/api/visitors', async (req, res) => {
  try {
    const newCount = await client.incr('visitor_count');
    res.json({ count: newCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});