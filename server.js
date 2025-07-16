const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // 👈 Load variables from .env

const app = express();
app.use(express.json());
app.use(cors());

const apiUrl = process.env.DPWORLD_API_URL;
const username = process.env.DPWORLD_API_USER;
const password = process.env.DPWORLD_API_PASS;
const auth = Buffer.from(`${username}:${password}`).toString('base64');

app.post('/api/proxy', async (req, res) => {
  try {
    const response = await axios.post(apiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.response ? error.response.data : null
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
