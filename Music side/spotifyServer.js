import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// Serve static files (HTML, JS, CSS)
app.use(express.static('public'));

const clientId = "2a764665c7764807a9ac469897b66383";
const clientSecret =  "c7cbaecc635a4b7aa24dd3b5b8ea51ac";

let accessToken = '';

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  accessToken = data.access_token;
}

// Refresh token every hour
getAccessToken();
setInterval(getAccessToken, 3600 * 1000);

// Endpoint for artist search
app.get('/artist/:name', async (req, res) => {
  const name = req.params.name;
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  const data = await response.json();
  res.json(data.artists.items[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});