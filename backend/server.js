const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const EXTERNAL_API_URL = 'https://quackr.free.beeceptor.com/numbers';

app.get('/api/numbers', async (req, res) => {
  try {
    const response = await axios.get(EXTERNAL_API_URL, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AdminDashboard/1.0'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from external API:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch data from external API',
      message: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Health check: http://localhost:3000/api/health');
  console.log('Numbers API: http://localhost:3000/api/numbers');
  console.log('External API: https://quackr.free.beeceptor.com/numbers');
}); 