require('dotenv').config();
const express = require('express');
const algoliasearch = require('algoliasearch');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const algoliaClient = algoliasearch('MXRRPKCZEL', process.env.ALGOLIA_ADMIN_API_KEY);
const index = algoliaClient.initIndex('hs_codes');
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const { hits } = await index.search(query, {
      attributesToRetrieve: ['hs_code', 'commodity', 'indonesia_tariff', 'usa_tariff', 'category'],
      facets: ['category', 'indonesia_tariff', 'usa_tariff']
    });
    res.json(hits);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

app.post('/enrich', async (req, res) => {
  const { commodity, indonesia_tariff, usa_tariff } = req.body;
  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: `Provide a brief analysis of the tariff differences for ${commodity} (Indonesia: ${indonesia_tariff}, USA: ${usa_tariff}).`
          }
        ]
      },
      {
        headers: {
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ analysis: response.data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: 'Claude API error' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));