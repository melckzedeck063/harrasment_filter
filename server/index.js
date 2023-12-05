const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 4001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Update the OpenAI moderation endpoint
const openaiModerationEndpoint = 'https://api.openai.com/v1/moderations';

app.post('/api/openai-moderation', async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    // Make an API call to OpenAI moderation endpoint
    const options = {
      method: 'POST',
      url: 'https://api.edenai.run/v2/text/moderation',
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjA3ZTQ5YWQtMmYyOS00OGIzLWE1ODktYzdhN2ZhNDBjNGY0IiwidHlwZSI6ImFwaV90b2tlbiJ9.h-WZ4vFLlI0_LFytgUW8HsUrIBayqcV4JLdzw-Mmooo',
      },
      data: {
        providers: 'microsoft, openai',
        language: 'en',
        text: "Let's see if this text contains some hate or violence toward others!.",
        fallback_providers: '',
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        res.json(response.data); // Send the response to the client
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
