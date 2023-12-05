// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4001; // You can choose any available port

app.use(cors()); // Enable CORS for all routes

app.post('/api/openai-moderation', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/content/moderation',
      req.body, // Forward the request body to OpenAI
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        },
      }
    );

    res.json(response.data); // Forward OpenAI response to the client
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
