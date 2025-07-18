const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allow all origins (for demo; restrict in production)

const apiUrl = 'https://fapi.dpworld.com/sco/shipex/proc/VendorExtracts';
const username = 'scoshippex.fapi';
const password = 'Ep8M#LWvKZ9J';
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

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
