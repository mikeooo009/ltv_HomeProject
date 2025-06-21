const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());

const EXTERNAL_API_URL = 'https://quackr.free.beeceptor.com/numbers';

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/login', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  const { username, password } = req.body;

  res.json({
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: 1,
      username: username || 'admin',
      role: 'admin'
    }
  });
});

app.get('/api/numbers', async (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  try {
    const response = await axios.get(EXTERNAL_API_URL, {
      timeout: 10000,
      headers: {
        'User-Agent': 'PhoneManager/1.0'
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

app.put('/api/numbers/:id/status', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['active', 'inactive'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be "active" or "inactive"'
    });
  }

  res.json({
    success: true,
    message: `Number ${id} status updated to ${status}`,
    data: {
      id,
      status,
      updatedAt: new Date().toISOString()
    }
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Phone Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      login: '/api/login',
      numbers: '/api/numbers',
      updateStatus: '/api/numbers/:id/status'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Numbers API: http://localhost:${PORT}/api/numbers`);
  console.log(`External API: ${EXTERNAL_API_URL}`);
});

module.exports = app; 