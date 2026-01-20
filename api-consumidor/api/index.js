const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`, req.body);
  next();
});

const TARGET_API_URL = 'https://venta-omega.vercel.app/cartera';

// GET /cartera
app.get('/cartera', async (req, res) => {
  try {
    console.log('Proxying GET request...');
    const response = await axios.get(TARGET_API_URL);
    console.log('GET Success:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    if (error.response) console.error('Upstream data:', error.response.data);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// POST /cartera
app.post('/cartera', async (req, res) => {
  try {
    console.log('Proxying POST request...', req.body);
    // Forward the body exactly as received
    const response = await axios.post(`${TARGET_API_URL}/`, req.body);
    console.log('POST Success:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Error posting data:', error.message);
    if (error.response) console.error('Upstream data:', error.response.data);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// PUT /cartera/:id
app.put('/cartera/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Proxying PUT request for id ${id}...`, req.body);
    const response = await axios.put(`${TARGET_API_URL}/${id}`, req.body);
    console.log('PUT Success:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error(`Error updating data for id ${id}:`, error.message);
    if (error.response) console.error('Upstream data:', error.response.data);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Microservicio Consumidor API Venta Omega - Running');
});

// Listen on port provided by environment or 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
